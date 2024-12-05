import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;  

export const generateJWT = (payload: object): string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyJWT = (token: string): object | null => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
};
