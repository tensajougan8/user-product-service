const { auth } = require("../config/firebase");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization.split(' ');
  if (!token) return res.status(403).send("Authorization token required");

  try {
    console.log(token[1]);
    const decodedToken = await auth.verifyIdToken(token[1]);
    console.log(decodedToken);
    req.userId = decodedToken.uid;
    req.userEmail = decodedToken.email;
    next();
  } catch (error) {
    return res.status(403).send("Unauthorized1");
  }
};

module.exports = { authenticate };
