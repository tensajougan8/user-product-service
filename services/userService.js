const {
  getUserRecentlyViewedProducts,
  saveProductView,
} = require("../dao/userDAO");
const { auth, db } = require("../config/firebase");
const redisClient = require("../config/redis");
const { loginUserFirebase1 } = require("../config/firebaseFrontend");

const getRecentlyViewedProducts = async (userId) => {
  const cacheKey = `topViewed:${userId}`;
  const cachedData = await redisClient.get(cacheKey);
  console.log("Cache", cachedData);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  const products = await getUserRecentlyViewedProducts(userId);
  console.log("prodcts", products);
  await redisClient.set(
    `topViewed:${userId}`,
    JSON.stringify({ products, timestamp: Date.now() }),
    {
      EX: 3600,
    }
  );
  return products;
};

const addProductView = async (userId, productId) => {
  await saveProductView(userId, productId);
  await redisClient.set(
    `topViewed:${userId}`,
    JSON.stringify({ productId, timestamp: Date.now() }),
    {
      EX: 3600,
    }
  );
};

const registerUserFirebase = async (userData) => {
  const { email, password, displayName } = userData;
  const userRecord = await auth.createUser({
    email,
    password,
    displayName,
  });
  await db.collection("users").doc(userRecord.uid).set({
    displayName,
    email,
    createdAt: new Date().toISOString(),
  });

  return { uid: userRecord.uid, email, displayName };
};

const loginUserFirebase = async (email, password) => {
  try {
    const userCredential = await loginUserFirebase1(email, password);
    return userCredential;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw new Error(error.message);
  }
};

module.exports = {
  getRecentlyViewedProducts,
  addProductView,
  registerUserFirebase,
  loginUserFirebase,
};
