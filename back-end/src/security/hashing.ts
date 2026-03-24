import * as bcrypt from 'bcrypt';

export async function hashPassword (password: string)  
{
    const saltRounds = 10;
    const result = await bcrypt.hash(password, saltRounds);
    return result;
}

export async function verifyPassword(password: string, hash: string)
{
    const match = await bcrypt.compare(password, hash);
    return match;
}
