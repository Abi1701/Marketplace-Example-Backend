const express = require("express");
const router = express.Router();
const { create, findAll, findOne } = require("../controller/productController");

router.post("/", create);
router.get("/", findAll);
router.get("/:id", findOne);

module.exports = router;
