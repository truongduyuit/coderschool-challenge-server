import bcrypt from "bcrypt";

/**
 *
 * @param password want to convert to hash
 * @returns hash for the password
 */
const hash = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

/**
 *
 * @param password
 * @param hash
 * @returns boolean
 */
const verify = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

export const PasswordUtils = {
  hash,
  verify,
};
