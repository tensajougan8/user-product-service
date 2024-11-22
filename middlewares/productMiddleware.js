const { db } = require("../config/firebase");
const {sendEmailNotification} = require("../utils/sendEmail")

const logProductView = async (req, res, next) => {
  const userId = req.userId;
  const productId = req.params.productId;
  const userEmail = req.userEmail;
  try {
    const recentlyViewedRef = db
      .collection("users")
      .doc(userId)
      .collection("recentlyViewed");

    const snapshot = await recentlyViewedRef
      .where("productId", "==", productId)
      .get();
    if (snapshot.empty) {
      console.log("Product not found in recentlyViewed for user:", userId);
      return;
    }

    const now = new Date();
    const twentyHoursAgo = new Date(now.getTime() - 20 * 60 * 60 * 1000);

    snapshot.forEach(async (doc) => {
      const data = doc.data();
      if (new Date(data.viewedAt) > twentyHoursAgo) {
        if (data.viewCount >= 2) {
          await sendEmailNotification(userEmail, productId, data.viewCount);
          await recentlyViewedRef.doc(doc.id).update({
            viewCount: 1,
          });
        } else {
          await recentlyViewedRef.doc(doc.id).update({
            viewCount: data.viewCount + 1,
          });
        }
      } else {
       
        await recentlyViewedRef.doc(doc.id).update({
          viewCount: 1,
        });
      }
    });
    next();
  } catch (error) {
    console.error("Error handling product view and notification:", error);
  }
};

module.exports = { logProductView };
