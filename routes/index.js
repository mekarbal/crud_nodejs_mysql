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

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("./category/selectCategories", { title: "Express" });
});

router.get("/test", function (req, res) {
  conn != null ? res.send("connected") : res.send("connection fialed");
});

//Get All Categories
router.get("/select", (req, res) => {
  conn.query("SELECT * FROM category", (err, rs) => {
    res.render("./category/selectCategories", { categories: rs });
  });
});

router.get("/insertCat", (req, res) => {
  res.render("./category/selectCategories");
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
  conn.query("SELECT * FROM category WHERE id = ?", req.query.id, (err, rs) => {
    res.render("./category/editCategort", { category: rs[0] });
  });
});

router.post("/edit", (req, res) => {
  let param = [req.body, req.query.id];

  // let sqlQuery = `UPDATE category SET name=${name} WHERE id=${id}`;
  conn.query(`UPDATE category SET ? WHERE id=?`, param, (err, rs) => {
    console.log(req.query.id);
    err ? res.send(err) : res.redirect("/select");
  });
});

module.exports = router;
