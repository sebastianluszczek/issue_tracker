const router = require("express").Router();

// Issues model import
const Issue = require("../../models/Issue");

// GET all issues
router.get("/", (req, res) => {
    res.json({
      msg: "GET all issues"
    });
  });
  
  // GET single issue
  router.get("/:id", (req, res) => {
    res.json({
      msg: "GET single issue"
    });
  });
  
  // POST issue
  router.post("/", (req, res) => {
    res.json({
      msg: "POST issue"
    });
  });
  
  // PUT (update) issue
  router.get("/:id", (req, res) => {
    res.json({
      msg: "PUT (update) issue"
    });
  });
  
  // DELETE issue
  router.get("/:id", (req, res) => {
    res.json({
      msg: "DELETE issue"
    });
  });
  
  module.exports = router;