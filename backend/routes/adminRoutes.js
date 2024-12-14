const express = require("express");
const {
  createPackage,
  updatePackage,
  deletePackage,
} = require("../controllers/packageController");

const router = express.Router();

router.post("/packages", createPackage); 
router.put("/packages/:id", updatePackage); 
router.delete("/packages/:id", deletePackage); 

module.exports = router;
