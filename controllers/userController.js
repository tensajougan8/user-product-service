const {
  getRecentlyViewedProducts,
  addProductView,
  registerUserFirebase,
  loginUserFirebase,
} = require("../services/userService");
const { sendResponse } = require("../utils/responseHandler");

const getUserRecentlyViewed = async (req, res) => {
  try {
    const products = await getRecentlyViewedProducts(req.userId);
    sendResponse(res, 200, "Successfully fetched products", products);
  } catch (error) {
    sendResponse(
      res,
      500,
      "Error fetching recently viewed products",
      error.message
    );
  }
};

const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await registerUserFirebase(userData);
    sendResponse(res, newUser);
  } catch (error) {
    sendResponse(res, error.message);
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUserFirebase(email, password);
    sendResponse(res, 200, "User Authenticated", {
      access_token: token.idToken,
    });
  } catch (error) {
    sendResponse(res, error.message);
  }
};

const addProductToViewed = async (req, res) => {
  try {
    await addProductView(req.userId, req.body.productId);
    sendResponse(res, 200, "Product view logged successfully");
  } catch (error) {
    sendResponse(res, 500, "Error logging product view", error.message);
  }
};

module.exports = {
  getUserRecentlyViewed,
  addProductToViewed,
  registerUser,
  loginUser,
};
