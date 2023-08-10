const { JWT_SECRET = 'secret-key-mesto', NODE_ENV = 'production' } = process.env;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
};
