# Nepali Tadka (Backend Application)

This project is a Node.js application that provides an API for managing recipes, users, reviews and ratings. It uses Express for the server framework, Mongoose for MongoDB object modeling, and dotenv for environment variable management.

## Features

- User Authentication and Authorization
- Role-based Access Control
- Recipe Management
- Review and Rating System
- Category Management
- MongoDB as the database
- Mongoose as the ORM

## Project Structure

```
nepali-tadka-backend
├── src
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── auth.controller.js
│   │   ├── category.controller.js
│   │   ├── recipe.controller.js
│   │   └── review.controller.js
│   ├── middleware
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   └── signup.middleware.js
│   ├── models
│   │   ├── category.model.js
│   │   ├── recipe.model.js
│   │   ├── review.model.js
│   │   ├── role.model.js
│   │   └── user.model.js
│   ├── routes
│   │   ├── auth.routes.js
│   │   ├── category.routes.js
│   │   ├── recipe.routes.js
│   │   └── review.routes.js
│   └── app.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```sh
   cd nepali-tadka-backend
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

4. Create a `.env` file in the root directory and add your MongoDB connection string and JWT secret:

   ```sh
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

## Usage

1. Start the server:

   ```sh
   npm start
   ```

2. The API will be available at `http://localhost:3000`.

## Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Login a user
- `POST /api/auth/signout` - Logout a user

### Recipes

- `GET /api/recipes` - Retrieve all approved recipes
- `GET /api/recipes/:id` - Retrieve a specific recipe by ID
- `POST /api/recipes` - Create a new recipe (authenticated users)
- `PUT /api/recipes/:id` - Update a recipe (authenticated users)
- `DELETE /api/recipes/:id` - Delete a recipe (authenticated users)
- `GET /api/recipes/user` - Retrieve recipes created by the authenticated user
- `GET /api/recipes/pending` - Retrieve all pending recipes (admin only)
- `POST /api/recipes/:id/approve` - Approve a recipe (admin only)
- `POST /api/recipes/:id/reject` - Reject a recipe (admin only)

### Reviews

- `POST /api/reviews/:recipeId` - Add a review to a recipe (authenticated users)
- `GET /api/reviews/:recipeId` - Retrieve reviews for a specific recipe

### Categories

- `GET /api/categories` - Retrieve all categories

## Running Database

1. Install MongoDB Community Edition
2. After installation, run the command:

   ```sh
   mongod --dbpath ./nepali-tadka/nepali-tadka-database/ --logpath ./nepali-tadka/nepali-tadka-database/logs.log
   ```