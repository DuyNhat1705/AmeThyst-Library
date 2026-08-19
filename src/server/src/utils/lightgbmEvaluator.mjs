import fs from 'fs';
import path from 'path';

/**
 * Pure JavaScript LightGBM GBDT Evaluator for Vercel Serverless Functions.
 * Evaluates trained GBDT tree structures with 0ms cold-start and zero native dependencies.
 */
export class LightGBMEvaluator {
  constructor(modelPath) {
    this.model = null;
    this.loadModel(modelPath);
  }

  loadModel(modelPath) {
    try {
      if (fs.existsSync(modelPath)) {
        const raw = fs.readFileSync(modelPath, 'utf-8');
        this.model = JSON.parse(raw);
        console.log('[LightGBMEvaluator] Successfully loaded LightGBM JSON tree model.');
      }
    } catch (err) {
      console.warn('[LightGBMEvaluator] LightGBM model load failed, falling back to graph weight ranking:', err.message);
    }
  }

  evaluateNode(node, features) {
    if (!node) return 0;
    if ('leaf_value' in node) {
      return node.leaf_value;
    }
    const featureKey = node.split_feature;
    const featureVal = features[featureKey] ?? 0;

    if (featureVal <= node.threshold) {
      return this.evaluateNode(node.left_child, features);
    } else {
      return this.evaluateNode(node.right_child, features);
    }
  }

  predict(features) {
    if (!this.model || !this.model.tree_info) return 0.5;
    let score = 0;
    for (const tree of this.model.tree_info) {
      score += this.evaluateNode(tree.tree_structure, features);
    }
    // Sigmoid transformation for binary objective log loss
    return 1 / (1 + Math.exp(-score));
  }
}
