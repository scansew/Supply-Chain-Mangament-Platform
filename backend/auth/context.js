const { verifyToken } = require('./jwt');

const getAuthUser = async (req) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return { user: null };

  try {
    const decoded = verifyToken(token);
    // Here you would typically fetch the user from your database
    // For now, we'll just return the decoded token
    return { user: decoded };
  } catch (error) {
    return { user: null };
  }
};

module.exports = {
  getAuthUser,
};
