
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { loadEnvFile } from 'node:process';
import { User } from '../models/user';

loadEnvFile('back-end/.env');
const SECRET_KEY = process.env.SECRET_KEY ?? "unknown";

// Optional: Define a custom payload structure
interface UserPayload extends JwtPayload {
  id: string;
  email: string;
  companyId: number
  role: string;
}


export function createToken(user: User)
{
    const token = jwt.sign(
        { id: user.id, email: user.email, comapnyId: user.companyId, role: user.role }, 
        SECRET_KEY, 
        { expiresIn: '2 hours' });
    return token;
}
