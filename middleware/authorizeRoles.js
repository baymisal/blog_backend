const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role.toLowerCase())) {
          return res.status(403).json({ message: "Access Denied: Unauthorized Role" });
      }
      next();
  };
};

module.exports = authorizeRoles;
