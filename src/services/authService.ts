import * as userService from "../services/userService";
import bcrypt from "bcrypt";

export async function signUp(email: string, password: string) {
    const passwordCrypt = bcrypt.hashSync(password, 10);
    const user = { email, password: passwordCrypt };
  
    await userService.userIsAlreadyRegistered(email);
    await userService.insertNewUser(user);
  
    return;
}