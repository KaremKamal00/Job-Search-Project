import { Router } from "express";
import * as userController from './controller/user.controller.js'
import * as userValidation from './user.validation.js'
import auth from "../../middleware/auth.js";
import userEndPoints from "./user.enPoints.js";
import validation from "../../middleware/validation.js";

const router=Router()

router
    .put(
        '/',
        auth(userEndPoints.update),
        validation(userValidation.updateUser),
        userController.updateAccount
    )
    .patch(
        "/",
        auth(userEndPoints.delete),
        userController.softDeleteUser
    )
    .get(
        '/',
        auth(userEndPoints.get),
        userController.getAccountData
    )
    .get(
        '/yourAccount/:email',
        validation(userValidation.getProfileDataSchema),
        userController.getProfileData
    )
    .get(
        '/recovery',
        validation(userValidation.accountsWithRecoveryEmailSchema),
        userController.accountsWithRecoveryEmail
    )
    .delete(
        '/',
        auth(userEndPoints.all),
        userController.deleteUser
    )







export default router