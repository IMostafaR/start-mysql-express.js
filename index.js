// imports and configs
const express = require("express");
const db = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;
const host = "127.0.0.1";
const connection = db.createConnection({
  host,
  user: "root",
  password: "",
  database: "assignment_3",
});

app.use(express.json());
app.use(cors());

// ****************************************

// USERS APIs

// ****************************************

// check email middleware
let isEmailExist = (req, res, next) => {
  const { email } = req.body;
  const query = `SELECT * FROM users WHERE email='${email}'`;
  connection.execute(query, (err, data) => {
    if (err) {
      return res.json({ message: "error", err });
    }
    if (data.length) {
      return res.json({ message: "Email already exists", email });
    }
    next();
  });
};

// check id middleware
let isIdExist = (req, res, next) => {
  const { id } = req.body;
  const query = `SELECT * FROM users WHERE id=${id}`;

  connection.execute(query, (err, data) => {
    if (err) {
      return res.json({ message: "error", err });
    }
    if (!data.length) {
      return res.json({ message: "user isn't exist" });
    }
    next();
  });
};

// ------------------------------------------

// Get all users
app.get("/users", (_, res) => {
  const query = `SELECT * FROM users`;
  connection.execute(query, (err, data) => {
    if (err) {
      return res.json({ message: "error", err });
    }
    data.length
      ? res.json({ message: "success", data })
      : res.json("users DB is empty");
  });
});

// ------------------------------------------

// add user
app.post("/users", isEmailExist, (req, res) => {
  const { name, email, password, age } = req.body;
  const query = `INSERT INTO users (name, email, password, age) VALUES ('${name}','${email}','${password}', ${age})`;

  connection.execute(query, (err, data) => {
    if (err) {
      return res.json({ message: "error", err });
    }
    data.affectedRows
      ? res.json({ message: "success", data: req.body })
      : res.json({ message: "failed" });
  });
});

// ------------------------------------------

// update user
app.put("/users", isIdExist, (req, res) => {
  const { id, name, email, password } = req.body;
  let query = `UPDATE users SET `;
  let updateFields = [];

  if (name) {
    updateFields.push(`name='${name}'`);
  }
  if (email) {
    updateFields.push(`email='${email}'`);
  }
  if (password) {
    updateFields.push(`password='${password}'`);
  }

  query += `${updateFields.join(", ")} WHERE id=${id}`;

  connection.execute(query, (err, data) => {
    if (err) {
      return res.json({ message: "error", err });
    }
    data.affectedRows
      ? res.json({ message: "success", data: req.body })
      : res.json({ message: "failed" });
  });
});

// ------------------------------------------

// delete user

app.delete("/users", isIdExist, (req, res) => {
  const { id } = req.body;
  const query = `DELETE FROM users WHERE id=${id}`;

  connection.execute(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    data.affectedRows
      ? res.json({ message: "success" })
      : res.json({ message: "failed" });
  });
});

// search for user where his name start with "a" and age less than 30

app.get("/users/a30", (_, res) => {
  const query = `SELECT * FROM users WHERE name LIKE 'a%' AND age < 30`;

  connection.execute(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    data.length
      ? res.json({ message: "success", data })
      : res.json("no matched users");
  });
});

// search for users by list of ids

app.get("/users/ids", (req, res) => {
  const ids = req.body;
  const query = `SELECT * FROM users WHERE id IN (${ids.join(", ")})`;

  connection.execute(query, (err, data) => {
    if (err) {
      return res.json(err);
    }

    data.length
      ? res.json({ message: "success", data })
      : res.json("no matched users");
  });
});

// ****************************************

// PRODUCTS APIs

// ****************************************

// check product name and userId middleware
let isProductExist = (req, res, next) => {
  const { name, userId } = req.body;
  const query = `SELECT * FROM products WHERE name='${name}' AND user_id=${userId}`;

  connection.execute(query, (err, data) => {
    if (err) {
      return res.json({ message: "error", err });
    }
    if (data.length) {
      return res.json({ message: "product already exists", name, userId });
    }
    next();
  });
};

// check id and userId middleware
let isProductIdExist = (req, res, next) => {
  const { id, userId } = req.body;
  const query = `SELECT * FROM products WHERE id=${id} AND user_id=${userId}`;

  connection.execute(query, (err, data) => {
    if (err) {
      return res.json({ message: "error", err });
    }
    if (!data.length) {
      return res.json({
        message: "you cannot access this product or product isn't exist",
      });
    }
    next();
  });
};

// ------------------------------------------

// Get all products
app.get("/products", (_, res) => {
  const query = `SELECT * FROM products`;
  connection.execute(query, (err, data) => {
    if (err) {
      return res.json({ message: "error", err });
    }
    data.length
      ? res.json({ message: "success", data })
      : res.json("products DB is empty");
  });
});

// ------------------------------------------

// add product
app.post("/products", isProductExist, (req, res) => {
  const { name, price, desc, createdBy, userId } = req.body;
  const query = `INSERT INTO products (name, price, description, created_by, user_id) VALUES ('${name}','${price}','${desc}', '${createdBy}', '${userId}')`;

  connection.execute(query, (err, data) => {
    if (err) {
      return res.json({ message: "error", err });
    }
    data.affectedRows
      ? res.json({ message: "success", data: req.body })
      : res.json({ message: "failed" });
  });
});

// ------------------------------------------

// update product
app.put("/products", isProductIdExist, (req, res) => {
  const { id, name, price, desc } = req.body;
  let query = `UPDATE products SET `;
  let updateFields = [];

  if (name) {
    updateFields.push(`name='${name}'`);
  }
  if (price) {
    updateFields.push(`price='${price}'`);
  }
  if (desc) {
    updateFields.push(`description='${desc}'`);
  }

  query += `${updateFields.join(", ")} WHERE id=${id}`;

  connection.execute(query, (err, data) => {
    if (err) {
      return res.json({ message: "error", err });
    }
    data.affectedRows
      ? res.json({ message: "success", data: req.body })
      : res.json({ message: "failed" });
  });
});

// delete product

app.delete("/products", isProductIdExist, (req, res) => {
  const { id } = req.body;
  const query = `DELETE FROM products WHERE id=${id}`;

  connection.execute(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    data.affectedRows
      ? res.json({ message: "success" })
      : res.json({ message: "failed" });
  });
});

// search for products where price greater than 3000

app.get("/products/p3000", (_, res) => {
  const query = `SELECT * FROM products WHERE price > 3000`;

  connection.execute(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    data.length
      ? res.json({ message: "success", data })
      : res.json("no matched users");
  });
});

app.listen(port, host, () => console.log("Server is running....."));
