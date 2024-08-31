//Failed Authentication is 401
//Failed Authorization is 403

import { hashSync, genSaltSync, compareSync } from "bcrypt";

export const createHash = password => hashSync(password, genSaltSync(10))

export const verifyHash = (reqBodyPass, userPass) => {
    const verify = compareSync(reqBodyPass, userPass);
    return verify;
  };

export const hashTesting = (string) => {
  return {
    original: string,
    hashed: createHash(string)
  }
}