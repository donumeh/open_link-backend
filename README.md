# OpenLinks API Documentation

## Overview

OpenLinks is a Node.js and Express-based REST API designed to manage e-commerce functionalities. It includes models and routes for handling products, orders, users, and brands. The application uses MongoDB as the database and integrates JSON Web Tokens (JWT) for authentication.

## Installation

```
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd open_links-backend

# Install dependencies
npm install

# Set up environment variables
# Create a .env file and add the following:
# CONNECTION_STRING=<MongoDB Connection String>
# API_URL=<API Base URL>
# SECRET=<JWT Secret Key>

# Start the server
npm start
```

[Link to FrontEnd]([google.com](https://github.com/Gahbriehel/openlinks))

## Models


## Brand

Schema for managing product brands.
```
{
  name: { type: String, required: true },
  image: { type: String }
}
```

## Product


Schema for managing products.

```
{
  name: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String, default: '' },
  image: { type: String, default: '' },
  images: [{ type: String }],
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  price: { type: Number, default: 0 },
  stock: { type: Number, required: true, min: 0 },
  dateCreated: { type: Date, default: Date.now }
}
```

## Order

Schema for managing customer orders.

```
{
  orderItems: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' },
  shippingAddress1: String,
  shippingAddress2: String,
  city: String,
  zip: String,
  country: String,
  phone: String,
  status: String,
  totalPrice: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dateOrdered: { type: Date, default: Date.now }
}
```

## User

Schema for managing users.

```
{
  name: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  phone: { type: String, required: true },
  street: { type: String, default: '' },
  apartment: { type: String, default: '' },
  city: { type: String, default: '' },
  zip: { type: String, default: '' },
  country: { type: String, default: '' }
}
```

## Routes

## Brand Routes

- `GET /brands`: Fetch all brands.

  - Response: List of brands.

- `GET /brands/:id`: Fetch a specific brand by ID.

  - Params: id (string) - Brand ID.

  - Response: Brand details.

- `POST /brands`: Create a new brand.

  - Body: { name: string, image: string }

  - Response: Created brand.

- `PUT /brands/:id`: Update a brand by ID.

  - Params: id (string) - Brand ID.

  - Body: { name: string, image: string }

  - Response: Updated brand.

- `DELETE /brands/:id`: Delete a brand by ID.

  - Params: id (string) - Brand ID.

  - Response: Success message.

## Product Routes

- `GET /products`: Fetch all products.

  - Query: Optional brand filter.

  -Response: List of products.

- `GET /products/:id`: Fetch a specific product by ID.

  - Params: id (string) - Product ID.

  - Response: Product details.

- `GET /products/get/count`: Fetch the total count of products.

  - Response: Product count.

- `POST /products`: Create a new product.

  - Body: { name: string, description: string, price: number, brand: string, stock: number, ... }

  - Response: Created product.

- `PUT /products/:id`: Update a product by ID.

  - Params: id (string) - Product ID.

  - Body: { name: string, description: string, price: number, brand: string, stock: number, ... }

  - Response: Updated product.

- `DELETE /products/:id`: Delete a product by ID.

  - Params: id (string) - Product ID.

  - Response: Success message.

## Order Routes

- `GET /orders`: Fetch all orders.

  - Response: List of orders.

- `POST /orders`: Create a new order.

  - Body: { user: string, orderItems: array, totalPrice: number, ... }

  - Response: Created order.

## User Routes

- `GET /users`: Fetch all users (excluding passwords).

  -  Response: List of users.

- `GET /users/:id`: Fetch a specific user by ID.

  - Params: id (string) - User ID.

  - Response: User details.

-  `POST /users`: Create a new user.

  - Body: { name: string, email: string, password: string, ... }

  - Response: Created user.

- `POST /users/login`: Authenticate a user and return a JWT.

  - Body: { email: string, password: string }

  - Response: JWT token.

-  `POST /users/register`: Register a new user.

  - Body: { name: string, email: string, password: string, ... }

  - Response: Registered user.

-  `GET /users/get/count`: Fetch the total count of users.

  - Response: User count.

- `DELETE /users/:id`: Delete a user by ID.

  - Params: id (string) - User ID.

  - Response: Success message.

## Middleware

  - JWT Authentication: Protects routes requiring user authentication.

  - Error Handler: Captures and formats API errors.

# Database

The application uses MongoDB with Mongoose as the ODM. Ensure your MongoDB connection string is configured in the `.env` file.


## Environment Variables


| Variable          	| Description                   	
|-------------------	|-------------------------------	
| CONNECTION_STRING 	| MongoDB connection string     	
| API_URL           	| Base URL for the API          	
| SECRET            	| Secret key for JWT generation 	


## License

This project is licensed under the [MIT License](https://mit-license.org/).




