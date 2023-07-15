# Insta Feed Backend

This repository contains the backend code for the Insta Feed web application. Insta Feed is a basic web app that allows anyone to upload and view posts in a single place. The backend is built using Node.js, Express.js, MongoDB, and Firebase.

## Features

- Post creation: All users can create and upload posts.
- Post retrieval: All users can view all posts in a single place.

## Technologies Used

- Node.js: JavaScript runtime environment used to run server-side code.
- Express.js: Web application framework used to build the API endpoints.
- MongoDB: NoSQL database used to store post information.
- Firebase: Authentication service used for user management and authentication.

## Prerequisites

- Node.js and npm: Make sure you have Node.js and npm installed on your system. You can download them from the official Node.js website.
- MongoDB: Install MongoDB and make sure it is running locally or set up a remote MongoDB instance. You can find installation instructions on the MongoDB website.
- Firebase: Set up a Firebase project and obtain the necessary configuration details (Firebase API key, etc.) for authentication. Refer to the Firebase documentation for more information.

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/your-username/insta-feed-backend.git
   ```

2. Install dependencies:

   ```
   cd insta-feed-backend
   npm install
   ```

3. Configuration:

   - Create a `.env` file in the root directory of the project.
   - Add the following environment variables to the `.env` file:

     ```
      PORT = 8080
      USER_NAME = 
      USER_PASSWORD = 
      DATABSE = 
      ACCESS_TOKEN_KEY = 
      REFRESH_TOKEN_KEY = 
      API_KEY = 
      AUTH_DOMAIN = 
      PROJECT_ID = 
      STORAGE_BUCKET = 
      MESSAGING_SENDER_ID = 
      APP_ID = 
      MEASUREMENT_ID = 
     ```

     Replace `your-mongodb-uri` with your MongoDB connection URI and the Firebase configuration variables with your own Firebase project details.

4. Run the server:

   ```
   npm run dev
   ```

5. The server should now be running on `http://localhost:8080`. You can test the API endpoints using a tool like Postman or by integrating them into the frontend of the Insta Feed web app.

## API Endpoints

The following API endpoints are available:

- `POST /posts/createPost`: Create a new post.
- `GET /posts`: Get all posts.

Please refer to the code in the repository for more details on the request and response structures of each endpoint.

## Acknowledgments

This project was developed as a basic web app using the mentioned technologies for educational purposes. It can be extended and customized as per your requirements.
