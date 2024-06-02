import { roles } from "../../middleware/auth.js"

const userEndPoints={
    update:[roles.User,roles.Company_HR],
    delete:[roles.User,roles.Company_HR],
    get:[roles.User,roles.Company_HR],
    all:[roles.User,roles.Company_HR]
}

export default userEndPoints