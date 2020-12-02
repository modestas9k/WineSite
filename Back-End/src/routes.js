const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const middleware = require("./middleware/users");
const con = require("./db");

router.get("/", (req, res) => {
  res.send("The API service works!");
});

router.post("/register", middleware.validateUserData, (req, res) => {
  const email = req.body.email.toLowerCase();
  con.query(
    `SELECT * FROM users WHERE email = ${mysql.escape(email)}`,
    (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ msg: "Internal server error checking email validity" });
      } else if (result.length !== 0) {
        return res.status(400).json({ msg: "This email already exists" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log(err);
            return res.status(400).json({
              msg: "Internal server error hashing user details",
            });
          } else {
            con.query(
              `INSERT INTO users (email, password) VALUES (${mysql.escape(
                email
              )}, ${mysql.escape(hash)})`,
              (err, result) => {
                if (err) {
                  console.log(err);
                  return res.status(400).json({
                    msg: "Internal server error saving user details",
                  });
                } else {
                  return res.status(201).json({
                    msg: "User has been successfully registered",
                  });
                }
              }
            );
          }
        });
      }
    }
  );
});

router.post("/login", middleware.validateUserData, (req, res) => {
  const email = req.body.email.toLowerCase();
  con.query(
    `SELECT * FROM users WHERE email = ${mysql.escape(email)}`,
    (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ msg: "Internal server error gathering user details" });
      } else if (result.length !== 1) {
        return res.status(400).json({
          msg: "The provided details are incorrect or the user does not exist",
        });
      } else {
        bcrypt.compare(
          req.body.password,
          result[0].password,
          (bErr, bResult) => {
            if (bErr || !bResult) {
              return res.status(400).json({
                msg:
                  "The provided details are incorrect or the user does not exist",
              });
            } else if (bResult) {
              const token = jwt.sign(
                {
                  userId: result[0].id,
                  email: result[0].email,
                },
                process.env.SECRET_KEY,
                {
                  expiresIn: "7d",
                }
              );

              return res.status(200).json({
                msg: "Logged In",
                token,
                userData: {
                  userId: result[0].id,
                  email: result[0].email,
                },
              });
            }
          }
        );
      }
    }
  );
});

router.post("/addWineType", middleware.isLoggedIn, (req, res) => {
  if (req.body.wineName && req.body.type && req.body.year && req.body.region) {
    con.query(
      `INSERT INTO wine_types (name, region, type, year) VALUES ('${
        req.body.wineName
      }', ${mysql.escape(req.body.region)}, ${mysql.escape(
        req.body.type
      )}, ${mysql.escape(req.body.year)})`,
      (err) => {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .json({ msg: "Internal server error gathering wine details" });
        } else {
          return res
            .status(200)
            .json({ msg: "Wine type has been added successfully" });
        }
      }
    );
  } else {
    return res
      .status(400)
      .json({ msg: "Wine data has been passed incorrectly" });
  }
});

router.get("/allWineTypes", middleware.isLoggedIn, (req, res) => {
  con.query(`SELECT * FROM wine_types`, (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ msg: "Internal server error gathering wine details" });
    } else {
      return res.status(200).json(result);
    }
  });
});

module.exports = router;
