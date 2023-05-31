
const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === 'admin') return;
  if (requestUser.userId === resourceUserId.toString()) return;
  return res.send(403).json({ msg: 'you are not allowed to do this' });
};

module.exports = checkPermissions;