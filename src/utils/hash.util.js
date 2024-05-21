//Failed Authentication is 401
//Failed Authorization is 403

import { hashSync, genSaltSync, compareSync } from "bcrypt";

export const createHash = password => hashSync(password, genSaltSync(10))

export const verifyHash = (reqBodyPass, mongoPass) => {
    const verify = compareSync(reqBodyPass, mongoPass);
    return verify;
  };