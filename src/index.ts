import app from "./app"
import createUser from './endpoints/createUser'
import { getAddressInfo } from "./services/getAddressInfo"

app.post('/users/signup', createUser)

getAddressInfo("06280120")
.then(console.log)