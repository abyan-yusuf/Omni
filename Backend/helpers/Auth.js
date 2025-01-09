import bcrypt from "bcrypt"

export const hash = async (value) => {
  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(value, salt);
    return hashedPassword;
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};
