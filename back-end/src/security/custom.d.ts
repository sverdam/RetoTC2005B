import {Express} from "express-serve-static-core";
import { UserPayload } from "./jwt";

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload
  }
}