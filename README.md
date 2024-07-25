<h1 align="center">API: NewsParrot :parrot:</h1>

NewsParrot is an online news portal service, the api is actually hosted on Render ( links Bellow )

### 📄 [Read the API Docs on Swagger](https://newsparrotapi.onrender.com/doc)
### 🌐 [Access and consume the API](https://newsparrotapi.onrender.com/)
### 💻 [Test the complete service hosted, including the Front-End](https://newsparrotspa.onrender.com/doc)
### 🖥️ [Front-End: SPA (Single page Application) Github Repo](https://github.com/davidfndss/NewsParrotSPA)
<hr>

## Setup Guide

### Prerequisites
- **Node.js**: Make sure you have Node.js installed. You can download it from [Node.js official website](https://nodejs.org/).
- **npm**: npm comes with Node.js. To check if you have it installed, run `npm -v` in your terminal.
- **MongoDB Atlas**: MongoDB Atlas is an integrated suite of data services centered around a cloud database designed to accelerate and simplify how you build with data. You can acess it on [MongoDB official website](https://www.mongodb.com/products/platform/atlas-database)

### Step 1: Clone the Repository
First, clone the NewsParrot API repository from GitHub.

```bash 
git clone https://github.com/davidfndss/NewsParrotAPI
```

### Step 2: Install Dependencies
Navigate to the project directory and install the required dependencies using npm.

```bash
npm install
```

### Step 3: Set Up Environment Variables
Create a .env file in the root directory of the project and add the necessary environment variables. Here's an example of what it might look like:

```bash
PORT=port_of_your_prefrence
DB_URI=your_mongo_db_atlas_uri
SECRET_JWT=generate_with_hash_SHA256
```
there is a file named ```.env.example``` with this info.

### Step 4: Start the Server
Start the development server using npm.

```bash
npm start
```

Your API should now be running on http://localhost:3000 (or the port specified in your .env file).

Accessing the API
Once the server is running, you can access the API endpoints using a tool like Postman or your browser. For example, to get the list of news, you might send a GET request to: 

```http://localhost:3000/news```

Accessing the Swagger Documentation
The API includes Swagger documentation, you can view it by navigating to:

```http://localhost:3000/doc```

This setup should get you started with running the NewsParrot API locally. Be sure to replace the enviroment variables with actual values specific to your project.

### Stack used on the project:
![Node js](https://img.shields.io/badge/node.js-%234ea94b.svg?style=for-the-badge&logo=node.js&logoColor=white)&nbsp;
![Express](https://img.shields.io/badge/express-gray?style=for-the-badge&logo=express&logoColor=white)&nbsp;
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)&nbsp;
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)&nbsp;
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
