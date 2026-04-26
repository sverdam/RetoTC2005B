
import path from "path";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { User } from '../models/user';

import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const SECRET_KEY = process.env.SECRET_KEY ?? "unknown";

export interface UserPayload extends JwtPayload {
  id: string;
  email: string;
  companyId: number
  role: string;
}

export const unverifiedUser: UserPayload = {
    id: "-1",
    email: 'unknown',
    companyId: -1,
    role: 'unverified'
}

export function createToken(user: User)
{
    const token = jwt.sign(
        { id: user.id, email: user.email, comapnyId: user.companyId, role: user.role }, 
        SECRET_KEY, 
        { expiresIn: '2 hours' });
    return token;
}

export function decodeToken(token: string)
{
    // Verifying a token
    try {
        const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;
        console.log('User ID:', decoded.id);
        console.log('User Email:', decoded.email);
        console.log('User Role: ', decoded.role)
        return decoded;
    } catch (error) {
        console.error('Invalid or expired token');
        throw error;
    } 
}
