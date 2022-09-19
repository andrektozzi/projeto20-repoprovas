import joi from "joi";
import { INewUser, INewUserData } from "../types/userTypes";

export const signUpSchema = joi.object<INewUser>({
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
    confirmPassword: joi.string().required().valid(joi.ref("password"))
});