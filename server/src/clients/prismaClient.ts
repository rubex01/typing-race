import {PrismaClient} from "@prisma/client";
import {DefaultArgs} from "@prisma/client/runtime/library";

export type prismaType = PrismaClient<{ omit: { user: { password: true } } }, never, DefaultArgs>

export const prisma: prismaType = new PrismaClient({
    omit: {
        user: {
            password: true,
        },
    },
});
