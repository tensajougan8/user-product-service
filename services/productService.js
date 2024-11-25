const productDAO = require("../dao/productDAO");

const createProduct = async (productData) => {
  return productDAO.createProduct(productData);
};

const viewProduct = async (productId) => {
  return productDAO.viewProduct(productId);
};

module.exports = {
  createProduct,
  viewProduct,
};
