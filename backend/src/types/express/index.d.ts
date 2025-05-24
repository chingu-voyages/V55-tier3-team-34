import { User as UserType} from "./src/db/schema/user";

export {}

declare global {
    namespace Express {
        interface User extends UserType{}
        interface Request {
            user?:  User
        }
    }
}
