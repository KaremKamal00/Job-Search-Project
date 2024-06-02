import { connection } from "../DB/connection.js";
import authRouter from './modules/auth/auth.router.js'
import companyRouter from './modules/company/company.router.js'
import jobRouter from './modules/job/job.router.js'
import userRouter from './modules/user/user.router.js'

import { globalError } from "./utils/errorHandling.js";

function bootstrap(app, express) {
  //Convert Buffer Data
  app.use(express.json());
  app.use("/auth",authRouter)
  app.use("/company",companyRouter)
  app.use("/job",jobRouter)
  app.use("/user",userRouter)

  connection();

  app.use(globalError);
}

export default bootstrap;
