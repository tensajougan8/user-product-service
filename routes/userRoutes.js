const express = require("express");
const {
  getUserRecentlyViewed,
  addProductToViewed,
  registerUser,
  loginUser,
} = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");
const { validateProductId } = require("../middlewares/validateParams");

const router = express.Router();

router.get(
  "/users/recentlyViewed",
  authenticate,
  getUserRecentlyViewed
);
router.post(
  "/users/:userId/recentlyViewed",
  authenticate,
  validateProductId,
  addProductToViewed
);

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

module.exports = router;
