const validateProductId = (req, res, next) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).send("Product ID is required");
  }
  next();
};

module.exports = { validateProductId };
