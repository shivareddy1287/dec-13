const requiredRoles = ["Employee", "Manager"];
const totalRequiredRoles = ["Admin", "Hr"];
const adminHrRoles = ["Admin", "Hr"];
const proAdminAccess = ["Admin", "Hr"];
exports.backRestrictedAccessFun = (userRole) => {
  return requiredRoles.includes(userRole);
};

exports.backNormalAdminAccessGivenFun = (userRole) => {
  // console.log(userRole, "userRole restricted access");
  return totalRequiredRoles.includes(userRole);
};

exports.backProAdminAccessGivenFun = (userRole) => {
  return proAdminAccess.includes(userRole);
};

exports.backAdminHrRolesAccessGivenFun = (userRole) => {
  return adminHrRoles.includes(userRole);
};
