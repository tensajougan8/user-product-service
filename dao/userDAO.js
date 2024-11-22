const { db } = require("../config/firebase");

const getUserRecentlyViewedProducts = async (userId) => {
  const productViewRef = await db
    .collection("users")
    .doc(userId)
    .collection("recentlyViewed");
   console.log("Firestore reference created:", productViewRef);
  const snapshot = await productViewRef
    .orderBy("viewedAt", "desc")
    .limit(10)
    .get();

  return snapshot.docs.map((doc) => doc.data());
};

const saveProductView = async (userId, productId) => {
  const productViewRef = await db
    .collection("users")
    .doc(userId)
    .collection("recentlyViewed");
  await productViewRef.add({
    productId,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Optionally limit views to 10 items
  const snapshot = await productViewRef
    .orderBy("timestamp", "desc")
    .limit(11)
    .get();
  if (snapshot.size > 10) {
    const oldestDoc = snapshot.docs[snapshot.size - 1];
    await oldestDoc.ref.delete();
  }
};

module.exports = {
  getUserRecentlyViewedProducts,
  saveProductView,
};
