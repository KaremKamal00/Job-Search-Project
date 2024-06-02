import { roles } from "../../middleware/auth.js"

const jobEndPoints={
    create:[roles.Company_HR],
    update:[roles.Company_HR],
    get:[roles.Company_HR,roles.User],
    delete:[roles.Company_HR]
}

export default jobEndPoints