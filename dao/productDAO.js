const {db} = require("../config/firebase");

const createProduct = async (productData) => {
  const productRef = db.collection("products").doc();
  const newProduct = { ...productData, createdAt: new Date().toISOString() };
  await productRef.set(newProduct);

  return { id: productRef.id, ...newProduct };
};
const viewProduct = async (productId) => {
  const productRef = db.collection("products").doc(productId);
  const doc = await productRef.get();

  if (!doc.exists) {
    throw new Error("Product not found");
  }

  return { id: doc.id, ...doc.data() };
};

module.exports = {
  createProduct,
  viewProduct,
};
