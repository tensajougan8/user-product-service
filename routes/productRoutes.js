const express = require("express");
const {
  viewProduct,
  createProduct,
} = require("../controllers/productsController");
const { authenticate } = require("../middlewares/authMiddleware");
const { logProductView } = require("../middlewares/productMiddleware");

const router = express.Router();

router.post("/products", createProduct);
router.get("/products/:productId", authenticate, logProductView, viewProduct);

module.exports = router;











