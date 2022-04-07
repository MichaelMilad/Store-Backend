# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index `localhost:3000/products` [GET]
- Show (args: product id) `localhost:3000/products/:id` [GET]
- Create (args: Product)[token required] `localhost:3000/products` [POST]
- [OPTIONAL] Top 5 most popular products `Not Implied`
- [OPTIONAL] Products by category (args: product category) `localhost:3000/products?category=VALUE` [GET]
- [EXTRA] Delete (args: id)[token required] => `localhost:3000/PRODUCTS/:id` [DELETE]

#### Users
- Index [token required] => `localhost:3000/users` [GET]
- Show (args: id)[token required] => `localhost:3000/users/:id` [GET]
- Create (args: User) => `localhost:3000/users/` [POST](FIRST_NAME,LAST_NAME,PASSWORD => IN REQUEST BODY AS JSON)  
        ..Will Send Back A JWT Token in HEADER

- [EXTRA] Delete (args: id)[token required] => `localhost:3000/users/:id` [DELETE]
- [EXTRA] Login(args: User) => `localhost:3000/login`[POST](FIRST_NAME,LAST_NAME,PASSWORD=> IN REQUEST BODY AS JSON)  
        ..Will Send Back A JWT Token in HEADER

#### Orders
- Current Order by user (args: user id)[token required] => `localhost:3000/orders/:UserId` [GET]
- [EXTRA] Create Order => `localhost:3000/orders/:UserId` [POST](PRODUCT_ID,QUANTITY => IN REQUEST BODY AS JSON)  
        ..Will Send Back A JWT Token in HEADER ** AND Will Create Orders Table & Order-Products Table

- [OPTIONAL] Completed Orders by user (args: user id)[token required] `Not Implied`

## Data Shapes
#### Product
-  id : number (SERIAL)
- name : string (VARCHAR(50))
- price : number (NUMERIC)
- [OPTIONAL] category `Implied` : string (VARCHAR(50))

#### User
- id : number (SERIAL)
- firstname : string (VARCHAR(50))
- lastname : string (VARCHAR(50))
- password : string (VARCHAR(255))

#### Orders
- id : number (SERIAL)
- user_id (references user(id)) : number (INTEGER)

### Orders_Products
- order_id (references order(id)): number (INTEGER)
- product_id (references product(id)) : number (INTEGER)
- quantity : number (INTEGER)

## Database Schemas
### Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

### Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(100,2) NOT NULL,
    category VARCHAR(50)
);

### Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

### Order_Products Table
CREATE TABLE order_products (
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,

    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
)
