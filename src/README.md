# I. Run the Program
When you clone the repository into your local drive, you are in the branch `main`.You must use `git checkout` to switch to the branch `dev` and we start here.
```
git checkout dev
``` 
For the future developing, you must clone your branch, which can be named as `YourName_Feature` (e.g: `Minh_Authentication`) or other easy-understandable names, from the branch `dev`, not branch `main`. The `main` branch is only merged from the `dev` branch when everything is done and the team deploys the web as production.

When you are in branch `dev`, you first are located at the root folder, `AmeThyst-Library` and to **run the program**, you must turn on 2 terminals and you can simply use **split terminal** for this purpose. In one terminal, you use `cd src/server` (or use `cd src` --> cd `cd server`) to go to folder `server` considered as backend and in the other terminal, you use `cd src/client` to go to folder `client` considerd as frontend.
```
cd src/server
cd src/client
```
If you are in the folder `server` and want to move to the folder `client`, you first use `cd ..` to back to parent folder, `src` folder, of `server` folder, and use `cd client` after that.
```
cd ..
cd client
```
Here, in the terminal with `server` folder, you use `npm run dev` to start **server side**, and in the terminal with `client` folder, you also use `npm run dev` to start **client side**.
```
npm run dev
```
The server runs on **PORT 5000**, and the client (GUI) runs on **PORT 3000** by default from **React js**. Therefore, we interact mainly with the web GUI at the endpoint (or you can consider it as URL) http://localhost:3000.

# II. Introduct to Server Structure
## 1. Server.mjs
This is the entry point of all system. It combines all components andstarts the server instance by calling `app.listen()`
## 2. config/
This directory holds configuration files for third-party services and system settings.
```javascript
//In the file db.config.mjs belonging to config folder
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    //...
};
export default connectDB;
```
## 3. controllers/
This folder acts as the bridge between requests and responses. It contains file that receives the request from the routes, extracts data (params, body), calls the relevant service, and returns the final response (JSON) to the client.
```javascript
//In the library.controller.mjs belonging to controllers folder
var borrowBook = (req, res) {
    //... Using the service functions
}
export {borrowBook};
```
## 4. middlewares/
These are interceptor functions that run during the request-response cycle. To perform security checks, data validation, or logging before a request reaches the controller.
```javascript
//In auth.middleware.mjs belonging to middlewares folder
const loginCheck = (req, res) => {
    //... Check Algorithm
}
//In role.middleware.mjs belonging to middlewares folder
const isCustomer = (req, res) => {
    //... Check Algorithm
}
```
Thanks to middleware function from `middlewares` folder, the request handler can become abstract as shown below:
```javascript
route.post('/library', loginCheck, isCustomer, borrowBook);
```
## 5. models/
This directory defines the "blueprint" of your data. It contains files that defines the schema for your database (e.g., fields, data types, and relationships). It ensures that data stored in your database is consistent and valid.
```javascript
// Consider book.model.mjs contains the schema to configure the book database
    const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    stock: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }}, 
    { timestamps: true });
```
## 6. routes/
This acts as the navigation system for your API. It contains files that defines which URL path maps to which controller function and which middlewares to execute first. It keeps your endpoints organized by resource.
```javascript
//In user.mjs belonging to routes folder
const route = Router()
route.get('/user', loginCheck, renderProfile);
route.post('/user', loginCheck, isCustomer, editProfile);
//... other activities in the user page
export default route;
```
## 7. services/
This is the "engine room" of your application. It contains the core business logic (e.g., calculating fines, complex database transactions, or coordinating multiple models). It allows you to keep your controllers lean and reusable.
```javascript
//In book.service.mjs belonging to services folder
const inStock = (parameters) => {
    //...Check Algorithm
}
const borrowLimit = (parameters) => {
    //...Check Algorithm
}
// Functions that can be called by middlewares and controller to make them become more abstract.
export {inStock, borrowLimit,...};
```
## 8.utils/
The utils folder is a place containing the reusable, support functions and they do not depend on the logic of system.
```javascript
//Consider matrix.util.mjs for processing QR code 
function rowEchelonForm(matrix){
    //... Convert Algorithm
}
function multiplyMatrix(matrixA, matrixB){
    //... Multiply Algorithm
}
function determinant(matrix){
    //... Calculate Algorithm
}
//... Relevant functions
export {rowEchelonForm, multiplyMatrix, determinant};
```
# III. Introduct to Client Structure
- React apps are made out of **components**
- A **components** can be as small as a button, or as large as entire page
- React components are Java Script functions that return markup
- **React components names** must always start with **capital letter**, while **HTML tags** must be **lowercase**
-  The markup syntax, returned in those functions, is called JSX - most React projects use JSX for its convenience.
## 1. app/
Folder `app` contains markup code of the web GUI.
## 2. components/
Folder `components` contains the components of the certain page.
```
//Example of structure of components folder
components
 |____NavBar
 |____PointerPage
 |____...
```
## 3. Creating new endpoints
You can consider ` http://localhost:3000` as `/` - the root or starting page.
By creating new folder in the `app` folder, the new endpoint is also created. For example, you create a folder named `library`, the new endpoint `/library` is created leading to the page `/library` if there is the `page.js` file in `library` folder.
You can create more deep endpoint, by creating folder named `book` in `library` folder --> `/librart/book`.
## 4. Naming file rule
The file must be followed the naming rule required by React NextJs. If not following these, the render mechanism can not perform.
- page.js: containing the markup code of the corresponding page
- layout.js: containing the markup code for the layout of corresponding page.
- not-found.js: containing markup code of the page rendered when the error 404 - Not Found appears
- others: you can find more naming convention in [NextJs File Conventions](https://nextjs.org/docs/app/api-reference/file-conventions)

# IV. Hybrid Search Engine & AI Microservice
The project now includes a hybrid search engine that combines traditional keyword matching with AI-powered semantic search.

## 1. AI Microservice (Python)
Located in `src/services/ai/`, this is a FastAPI application that handles vector embeddings and semantic similarity searches using ChromaDB.

To run the AI service:
```bash
# In a new terminal
cd src/services/ai
# Activate your python environment (e.g., SE_env)
python app.py
```
The service runs on **PORT 8000** and provides the following endpoint:
- `GET /api/search/semantic?q={query}&limit=20`: Returns Book IDs ranked by semantic relevance.

## 2. Hybrid Search API (Node.js)
The Node.js server coordinates between Memgraph (for OPAC search) and the Python AI service (for Semantic search).
- `GET /api/books/search?q={query}&mode={opac|semantic}`: The main search entry point.

## 3. Scaling Considerations
- **Memgraph**: As the catalog grows, ensure Full-Text Search (FTS) indexes are enabled for optimized OPAC searching.
- **ChromaDB**: For massive datasets, consider moving from the current persistent client to a standalone ChromaDB server.
- **Microservices**: The Python AI service is stateless and can be scaled horizontally behind a load balancer.
