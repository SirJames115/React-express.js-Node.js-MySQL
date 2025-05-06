const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 7000;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "students",
});

db.connect();

// ✅ Create table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS std (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(10) NOT NULL
  );
`;

db.query(createTableQuery, (err, result) => {
  if (err) {
    console.error("Error creating std table:", err);
  } else {
    console.log("std table is ready.");
  }
});

app.post("/add-user", (req, res) => {
  const sql = "INSERT INTO std(name, email, age, gender) VALUES (?, ?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.age, req.body.gender];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occurred: " + err });
    return res.json({ success: "Student added successfully" });
  });
});

app.listen(port, () => {
  console.log("App listening on port:", port);
});
