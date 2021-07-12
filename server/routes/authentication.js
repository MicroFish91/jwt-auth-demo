const express = require("express");
const router = express.Router();
const bycrypt = require("bcryptjs");
const db = require("../models");
const jwt = require("jwt-simple");
const passport = require("passport");

// body parser
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/", (req, res) => {
  res.send("yo");
});

router.post("/login", (req, res) => {
  //
});

router.post("/register", (req, res) => {
  //
});

module.exports = router;
