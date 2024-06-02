import { Router } from "express";
import * as jobController from './controller/job.controller.js'
import * as jobValidation from './job.validation.js'
import auth from "../../middleware/auth.js";
import jobEndPoints from "./job.endPoints.js";
import validation from "../../middleware/validation.js";
import uploadFileCloud, { filevalidtion } from "../../utils/multer.js";

const router=Router()

router
    .post(
        '/',
        auth(jobEndPoints.create),
        validation(jobValidation.createJobSchema),
        jobController.addjob
    )
    .put(
        '/:jobId',
        auth(jobEndPoints.update),
        validation(jobValidation.updateJobSchema),
        jobController.updatejob
    )
    .get(
        "/",
        auth(jobEndPoints.get),
        jobController.jobsWithCompanies
    )
    .patch(
        "/:jobId",
        jobController.softDeletejob
    )
    .get(
        "/one",
        auth(jobEndPoints.get),
        validation(jobValidation.getCompanyJobsSchema),
        jobController.getCompanyJobs
    )
    .delete(
        '/:jobId',
        auth(jobEndPoints.delete),
        jobController.deletejob
    )
    .get(
        "/filter",
        auth(jobEndPoints.get),
        jobController.allJobsWithFilter
    )
    .post(
        "/makeAppliction",
        validation(jobValidation.tokenSchema,true),
        auth(jobEndPoints.get),
        uploadFileCloud({customValidtion:filevalidtion.pdf}).single('cv'),
        validation(jobValidation.makeApplictionSchema),
        jobController.makeAppliction
    )








export default router