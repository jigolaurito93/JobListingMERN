import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  //   The default value is 10
  //  The bigger the value, the more secured but the longer its going to take to hash it
  const salt = await bcrypt.genSalt(10);
  //   Hash the password that was inputed by user
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
