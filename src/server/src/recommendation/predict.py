import sys
import os
import json
import psycopg2
import lightgbm as lgb
import pandas as pd
from datetime import datetime
from dotenv import load_dotenv

# Path setup
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, "../../.."))
load_dotenv(os.path.join(ROOT_DIR, "database/.env"))
load_dotenv(os.path.join(ROOT_DIR, "server/.env"))

MODEL_PATH = os.path.join(ROOT_DIR, "database/Init_data/lightgbm_ranker.txt")

def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        port=os.getenv("DB_PORT", "5432")
    )

def main():
    try:
        # 1. Read input JSON from stdin
        input_data = json.loads(sys.stdin.read())
        user_id = input_data.get("user_id")
        candidates = input_data.get("candidates", []) # List of {"id": "...", "gcn_score": 0.9}
        
        if not user_id or not candidates:
            print(json.dumps({"success": False, "error": "Missing user_id or candidates"}))
            return
            
        candidate_ids = [c["id"] for c in candidates]
        gcn_scores = {c["id"]: c["gcn_score"] for c in candidates}
        
        # 2. Connect to PostgreSQL to compile live features
        conn = get_db_connection()
        cursor = conn.cursor()
        
        current_month = datetime.now().month
        
        # Fetch features in bulk for all candidates to optimize performance
        features_list = []
        for book_id in candidate_ids:
            # Query past unclicked impressions (penalty)
            cursor.execute("""
                SELECT COUNT(*) FROM public.recommends 
                WHERE user_id = %s AND book_id = %s AND is_clicked = FALSE AND renewed_at IS NULL
            """, (user_id, book_id))
            past_impressions = cursor.fetchone()[0]
            
            # Query wishlist status
            cursor.execute("""
                SELECT EXISTS(SELECT 1 FROM public.user_wishlist WHERE user_id = %s AND book_id = %s)
            """, (user_id, book_id))
            is_wishlisted = 1 if cursor.fetchone()[0] else 0
            
            # Query global available copies
            cursor.execute("""
                SELECT COALESCE(SUM(available_quantity), 0) FROM public.library WHERE book_id = %s
            """, (book_id,))
            global_copies = cursor.fetchone()[0]
            
            features_list.append({
                "book_id": book_id,
                "session_month": current_month,
                "past_impressions_count": past_impressions,
                "is_in_wishlist": is_wishlisted,
                "global_available_copies": global_copies,
                "gcn_score": gcn_scores[book_id]
            })
            
        cursor.close()
        conn.close()
        
        # 3. Predict using LightGBM model
        if os.path.exists(MODEL_PATH):
            bst = lgb.Booster(model_file=MODEL_PATH)
            
            # Create feature matrix matching model expectations
            # Make sure feature order matches training feature set
            df_features = pd.DataFrame(features_list)
            X = df_features[['session_month', 'past_impressions_count', 'is_in_wishlist', 'global_available_copies']]
            
            # Predict probabilities
            preds = bst.predict(X)
            
            # Combine scores
            for idx, pred in enumerate(preds):
                features_list[idx]["final_score"] = float(pred)
        else:
            # Fallback: model weights not compiled yet, use GCN score directly
            for item in features_list:
                item["final_score"] = float(item["gcn_score"])
                
        # 4. Rank candidates descending by score
        ranked_list = sorted(features_list, key=lambda x: x["final_score"], reverse=True)
        
        # Output final result JSON
        result = {
            "success": True,
            "ranked": [{"id": item["book_id"], "score": item["final_score"]} for item in ranked_list]
        }
        print(json.dumps(result))
        
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
