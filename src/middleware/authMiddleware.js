const verifyAuthToken = (req, res, next) => {
  const token = "xVjmpt22rwToaenVm";
  const authToken = req.header("token");
  if (authToken) {
    if (authToken === token) {
      next();
    } else {
      return res.status(501).json({ error: "Invalid token" });
    }
  } else {
    return res.status(501).json({ error: "Unauthorized token" });
  }
};

module.exports = { verifyAuthToken };
