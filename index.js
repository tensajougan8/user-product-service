const express = require("express");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1", userRoutes);
app.use("/api/v1", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
