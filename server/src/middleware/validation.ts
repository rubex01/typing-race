import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line
export const validation = (schema: z.ZodSchema<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = await schema.parseAsync(req.body);
            next();
        // eslint-disable-next-line
        } catch (error: any) {
            res.status(400).json({ errors: error?.errors });
        }
    };
};
