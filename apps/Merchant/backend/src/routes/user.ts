import { Router, Request } from "express";   
import { z } from "zod";
import { prismaClient } from "../db/client";
import StatusCodes  from "http-status-codes";
import jwtSecret from "../config/jwtUserConfig";
import  jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import { userAuthMiddleware } from "../middlewares";

interface CustomRequest extends Request {
    id?: string;
}

export const userRouter = Router();

const signupSchema = z.object({
    name: z.string(),
    password:z.string(),
    username:z.string()
})

const signinSchema = z.object({
    username: z.string(),
    password:z.string()
})

userRouter.post("/signup", async(req, res) => {
    const {username, password, name} = signupSchema.parse(req.body);

    try {
        const existingUser = await prismaClient.user.findUnique({
            where:{
                username:username
            }
        })

        if(existingUser){
            res.status(StatusCodes.CONFLICT).json({
                message:"User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prismaClient.$transaction(async(tx)=>{
            const user = await tx.user.create({
                data:{
                    name,
                    username,
                    password: hashedPassword,
                }
            })
            await tx.userAccount.create({
                data:{
                    userId: user.id
                }
            })
        })

        res.json({
            message:"Signed up successfully",
            data:{
                username,
                name
            }

        })
    } catch (error) {
        res.json({
            message:"Something gone wrong"
        })
    }

});

userRouter.post("/signin", async (req, res) => {
    try {
        const {username, password} = signinSchema.parse(req.body);
        const user = await prismaClient.user.findUnique({
            where:{
                username:username
            }
        });

        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "User does not exist"
            });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Invalid password"
            });
            return;
        }

        const token = jwt.sign({id: user.id}, jwtSecret, {expiresIn: "1h"});

        res.status(StatusCodes.OK).json({
            message: "Signed in successfully",
            token
        });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong"
        });
    }
});

userRouter.post("/onramp", async (req , res)=>{
    try {
        const {userId, amount} = req.body;
        console.log(userId, amount);
        await prismaClient.userAccount.update({
            where:{
                userId: userId
            },
            data:{
                balance: {
                    increment: amount
                }
            }
        })
        res.json({
            message:"Onramp successful",
            data:{
                userId,
                amount
            }
        })
    } catch (error) {
        res.json({
            message:"Something gone wrong"
        })
    }
})

userRouter.post("/transfer", userAuthMiddleware, async (req, res):Promise<void> => {
    try {
        const { merchantId, amount } = req.body;
        const userId = req.id;

        if (!merchantId) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Merchant ID is required"
            });
            return;
        }

        // avoid double spending
        // inside the transacation to avoid roll back condition and implementing the atomic condition
        const paymentDone =await prismaClient.$transaction(async(tx) => {
            // locking to direct to DB without implementing through prisma so that the same user can not update or balance twice at the same time
            tx.$queryRaw `SELECT * FROM "UserAccount" WHERE "userId" = ${userId} FOR UPDATE`
            const userAccount = await tx.userAccount.findFirst({
                where: {
                    userId
                }
            });
            // user account check
            if (!userAccount) {
                throw new Error("User account not found");
            }

            // balance check
            if ((userAccount?.balance || 0) < amount) {
                throw new Error("Insufficient balance");
            }

            console.log("user balance check passed")
            await tx.userAccount.update({
                where: {
                    userId: userId
                },
                data: {
                    balance: {
                        decrement: amount
                    }
                }
            });

            await tx.merchantAccount.update({
                where: {
                    merchantId: merchantId
                },
                data: {
                    balance: {
                        increment: amount
                    }
                }
            });
            console.log("Transaction Done!")
            return true;
        },{
            maxWait: 50000,
            timeout: 100000
        });
        if(paymentDone){
            res.json({
                message:"Payment Done!"
            })
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({
                message:"Payment is not done"
            })
        }
        res.status(StatusCodes.OK).json({
            message: "Payment successful",
            data: {
                userId,
                amount
            }
        });

    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "User account not found") {
                res.status(StatusCodes.NOT_FOUND).json({
                    message: error.message
                });
            } else if (error.message === "Insufficient balance") {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: error.message
                });
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: "Something went wrong"
                });
            }
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Something went wrong"
            });
        }
    }
});
