import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET ?? 'secret';

export interface JWTPayload {
    id: number;
    iat?: number;
    exp?: number;
}

export const generateJWT = (payload: object): string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyJWT = <T extends object = JWTPayload>(token: string): T | null => {
    try {
        return jwt.verify(token, SECRET_KEY) as T;
    } catch {
        return null;
    }
};
