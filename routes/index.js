var express = require("express");
var router = express.Router();
var mysql = require("mysql");

var conn = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_nodejs_mysql",
  debug: false,
});

router.get("/test", function (req, res) {
  conn != null ? res.send("connected") : res.send("connection fialed");
});

//Get All Categories
router.get("/select", (req, res) => {
  conn.query("SELECT * FROM category", (err, rs) => {
    err ? res.send(err) : res.render("./selectCategories", { categories: rs });
  });
});

router.get("/insertCat", (req, res) => {
  res.render("./selectCategories");
});

router.post("/insertCat", (req, res) => {
  let name = req.body.category_name;
  let sqlQuery = `INSERT INTO category(name) VALUES('${name}')`;
  conn.query(sqlQuery, (err, rs) => {
    err ? res.send("you have an error " + err) : res.redirect("/select");
  });
});

router.get("/delete", (req, res) => {
  // let sqlQuery = `DELETE FROM category WHERE id = ${}`;
  conn.query("DELETE FROM category WHERE id =?", req.query.id, (err, rs) => {
    res.redirect("/select");
  });
});

router.get("/edit", (req, res) => {
  let id = req.query.id;
  conn.query(`SELECT * FROM category WHERE id = ${id}`, (err, rs) => {
    res.render("./editCategort", { category: rs[0] });
  });
});

router.post("/edit", (req, res) => {
  let name = req.body.name;
  let idp = req.query.id;
  conn.query(
    `UPDATE category SET name='${name}' WHERE id='${idp}'`,
    (err, rs) => {
      console.log(req.query.id);
      err ? res.send(err) : res.redirect("/select");
    }
  );
});
// ----------------------------------------------Products Sections

router.get("/", (req, res) => {
  conn.query("SELECT * FROM product", (err, rs) => {
    err ? res.send(err) : res.render("index", { products: rs });
  });
});
router.post("/insertProduct", (req, res) => {
  let name = req.body.product_name;
  let price = req.body.product_price;
  let category_id = req.body.category_id;
  let sqlQuery = `INSERT INTO product(name,price,category_id) VALUES ('${name}','${price}','${category_id}')`;
  conn.query(sqlQuery, (err, rs) => {
    err ? res.send(err) : res.redirect("/");
  });
});

router.get("/editProduct", (req, res) => {
  conn.query(`SELECT * FROM product WHERE id = ?`, req.query.id, (err, rs) => {
    res.render("./editProduct", { product: rs[0] });
  });
});
router.post("/editProduct", (req, res) => {
  let idpp = req.body.product_id;
  let name = req.body.product_name;
  let price = req.body.product_price;
  let category_id = req.body.category_id;
  conn.query(
    `UPDATE product SET name='${name}',price='${price}',category_id='${category_id}' WHERE id=${idpp}`,
    (err, rs) => {
      console.log(req.query.id);
      err ? res.send(err) : res.redirect("/");
    }
  );
});
router.get("/deletePr", (req, res) => {
  conn.query("DELETE FROM product WHERE id =?", req.query.id, (err, rs) => {
    res.redirect("/");
  });
});
module.exports = router;
