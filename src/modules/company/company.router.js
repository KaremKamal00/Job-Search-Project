import { Router } from "express";
import * as companyController from './controller/company.controller.js'
import * as companyValidation from './company.validation.js'
import auth from "../../middleware/auth.js";
import companyEndPoints from "./company.endPoints.js";
import validation from "../../middleware/validation.js";

const router=Router()

router
    .post(
        '/',
        auth(companyEndPoints.create),
        validation(companyValidation.createCompanySchema),
        companyController.addCompany
    )
    .put(
        '/:companyId',
        auth(companyEndPoints.update),
        validation(companyValidation.updateCompanySchema),
        companyController.updateCompany
    )
    .get(
        "/:companyId",
        validation(companyValidation.getCompanySchema),
        companyController.getCompany
    )
    .patch(
        "/:companyId",
        companyController.softDeleteCompany
    )
    .delete(
        '/:companyId',
        auth(companyEndPoints.delete),
        companyController.deleteCompany
    )
    .get(
        '/',
        auth(companyEndPoints.get),
        validation(companyValidation.searchByNameSchema),
        companyController.searchByName
    )
    .get(
        '/allApplications/:companyId',
        auth(companyEndPoints.getApp),
        validation(companyValidation.allApplicationSchema),
        companyController.allApplication
    )








export default router