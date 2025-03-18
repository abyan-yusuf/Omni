const bcrypt = require("bcrypt");

exports.hash = async (value) => {
  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(value, salt);
    return hashedPassword;
  } catch (error) {
    console.error(error);
    // You may want to remove or adjust the 'res' part as it's not within a controller context
    // res.status(500).send(error);
  }
};

exports.comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
