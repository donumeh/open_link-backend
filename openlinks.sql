-- OPEN LINK DATABASE Creation

-- Create the database
CREATE DATABASE IF NOT EXISTS open_link;


-- create the tables

-- Admin Table
CREATE TABLE IF NOT EXISTS admins (
	id SERIAL PRIMARY_KEY,
	name VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(70) NOT NULL
);

-- User Table
CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY_KEY,
	name VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	password TEXT NOT NULL UNIQUE,
	address TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Brand Table

CREATE TABLE IF NOT EXISTS brands (
	id SERIAL PRIMARY_KEY,
	brand_name VARCHAR(20) NOT NULL UNIQUE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table

CREATE TYPE status_enum AS ENUM ("pending", "shipped", "delivered");

CREATE TABLE IF NOT EXISTS orders (
	id SERIAL PRIMARY_KEY,
	status NOT NULL status_enum,
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
	total_price NUMERIC(10, 2) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product Table

CREATE TABLE IF NOT EXISTS products (
	id SERIAL PRIMARY_KEY,
	name VARCHAR(50) NOT NULL,
	description TEXT NOT NULL,
	brand_id INT REFERENCES brands(id) ON DELETE CASCADE,
	price NUMERIC(10, 2) NOT NULL,
	stock INT DEFAULT 0,
	inserted_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ordered_items 
CREATE TABLE IF NOT EXISTS ordered_items (
	id SERIAL PRIMARY_KEY,
	order_id INT REFERENCES orders(id) ON DELETE CASCADE,
	product_id INT REFERENCES products(id) ON DELETE CASCADE,
	quantity INT DEFAULT 1,
	price NUMERIC(10, 2) NOT NULL
);


-- Cart Table

CREATE TABLE IF NOT EXISTS carts (
	id SERIAL PRIMARY_KEY,
	product_id INT REFERENCES products(id) ON DELETE CASCADE,
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
	quantity 
);



