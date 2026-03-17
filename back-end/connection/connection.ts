
const { loadEnvFile } = require('node:process');
loadEnvFile('.env');

const userID = process.env.USERNAME_SQL ?? "unknown";
const userPassword = process.env.PASSWORD_SQL ?? "unknown";

console.log(`username: ${userID}, password: ${userPassword}`);