# Start mySQL with express.js

This is my work assigned by [Route-Academy](https://www.linkedin.com/company/routeacademy/mycompany/) during learning backend web development.

The provided code is a Node.js and Express.js server implementation that exposes APIs for managing users and products stored in a MySQL database. The APIs allow operations such as retrieving users and products, adding new entries, updating existing entries, and deleting entries (CRUD).

---

## Usage

The code in this module runs with the main server file `index.js` in the root directory.

## Scripts

Install dependencies:

```shell
npm install
```

To run the server:

```shell
node index.js
```

The server will start running on `http://localhost:3000`.

---

## API Documentation

## Users

#### Get all users

Retrieves information about all users.

- URL: `/users`
- Method: `GET`

---

#### Add a user

Adds a new user to the database.

- URL: `/users`
- Method: `POST`

Request Body:

```json
{
  "name": "Ahmed",
  "email": "hi@ahmed.com",
  "password": "908jkha2",
  "age": 25
}
```

---

#### Update a user

Updates an existing user in the database.

- URL: `/users`
- Method: `PUT`

Request Body:

```json
{
  "id": 2,
  "name": "Mostafa",
  "email": "hi@mostafa.com",
  "password": "jkji982"
}
```

---

#### Delete a user

Deletes a user from the database.

- URL: `/users`
- Method: `DELETE`

Request Body:

```json
{
  "id": 20
}
```

---

#### Search for users by name and age

Retrieves users whose name starts with "a" and age is less than 30.

- URL: `/users/a30`
- Method: `GET`

---

#### Search for users by IDs

Retrieves users whose IDs match the provided list.

- URL: `/users/ids`
- Method: `GET`

Request Body:

```json
[1, 2, 6, 7, 8]
```

---

## Products

#### Get all products

Retrieves information about all products.

- URL: `/products`
- Method: `GET`

---

#### Add a product

Adds a new product to the database.

- URL: `/products`
- Method: `POST`

Request Body:

```json
{
  "name": "Samsung",
  "price": 1400,
  "desc": "Not Bad",
  "createdBy": "Mostafa",
  "userId": 21
}
```

---

#### Update a product

Updates an existing product in the database.

- URL: `/products`
- Method: `PUT`

Request Body:

```json
{
  "id": 10,
  "name": "iPhone",
  "price": "1400",
  "desc": "Not Bad",
  "createdBy": "Mostafa",
  "userId": 20
}
```

---

#### Delete a product

Deletes a product from the database.

- URL: `/products`
- Method: `DELETE`

Request Body:

```json
{
  "id": 1,
  "userId": 20
}
```

---

#### Search for products by price

Retrieves products with prices greater than 3000.

- URL: `/products/p3000`
- Method: `GET`

---

## Function Descriptions

#### isEmailExist Middleware

Checks if an email already exists in the database before adding a new user. It ensures that no duplicate emails are registered.

#### isIdExist Middleware

Checks if a user with a given ID exists in the database before updating or deleting a user. It prevents updating or deleting non-existent users.

#### isProductExist Middleware

Checks if a product with a given name and user ID already exists in the database before adding a new product. It ensures that no duplicate products are added for the same user.

#### isProductIdExist Middleware

Checks if a product with a given ID and user ID exists in the database before updating or deleting a product. It prevents updating or deleting non-existent products or unauthorized access to products.

---

## Author

- GitHub - [IMostafaR](https://github.com/IMostafaR)
- Linkedin - [@imostafarh](https://www.linkedin.com/in/imostafarh/)
