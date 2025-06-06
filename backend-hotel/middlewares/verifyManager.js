module.exports = (req, res, next) => {
  if (req.user.emp_role !== "manager" && req.user.emp_role !== "superadmin") {
    return res
      .status(403)
      .json({ error: "Access denied. Manager or Superadmin role required." });
  }
  next();
};
