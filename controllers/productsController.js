const productService = require("../services/productService");
const { sendResponse } = require("../utils/responseHandler");

const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await productService.createProduct(productData);
    sendResponse(res, 200, "Successfully fetched products",newProduct);
  } catch (error) {
    sendResponse(res, error.message);
  }
};

const viewProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productService.viewProduct(productId);
    sendResponse(res, 200, "Successfully fetched products", product);
  } catch (error) {
    sendResponse(res, error.message);
  }
};

module.exports = {
  viewProduct,
  createProduct
};