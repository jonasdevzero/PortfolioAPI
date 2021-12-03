import { createConnection } from "typeorm"

createConnection()
    .then(() => console.log("Database connected!"))
    .catch(error => console.error("Error connecting database: ", error))
    