import express, { Router } from "express";
import { z } from "zod";
import { prismaClient } from "../db/client"
import  StatusCodes  from "http-status-codes";
import jwt from "jsonwebtoken";
import jwtSecret from "../config/jwtUserConfig";
import bcrypt from "bcrypt";
import { merchantAuthMiddleware } from "../middlewares";

export const merchantRouter = Router();

const signupSchema = z.object({
    name: z.string(),
    username: z.string(),
    password: z.string().min(8),
})

const signinSchema = z.object({
    username: z.string(),
    password: z.string()
})

merchantRouter.post("/signup", async(req, res): Promise<void> => {
    try {
        const {name, username, password} = signupSchema.parse(req.body);

        const existingMerchant = await prismaClient.merchant.findUnique({
            where: {
                username: username,
            }
        });

        if(existingMerchant) {
            res.status(StatusCodes.CONFLICT).json({
                message: "Merchant already exists"
            });
            
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        prismaClient.$transaction(async(tx)=>{
            const user = await tx.merchant.create({
                data:{
                    name,
                    username,
                    password:hashedPassword,
                }
            })
            await tx.merchantAccount.create({
                data:{
                    merchantId: user.id
                }
            })
        })
        res.status(StatusCodes.OK).json({
            message:"Merchant created successfully"
        })

    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Unable to create merchant"
        });
    }
});

merchantRouter.post("/signin", merchantAuthMiddleware, async (req, res) => {
    try {
        const {username,password}= signinSchema.parse(req.body);

        const user = await prismaClient.merchant.findUnique({
            where: {
                username: username
            }
        });

        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Merchant does not exist"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user?.password || "");
        if(!isPasswordValid){
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign({id:user?.id},jwtSecret,{expiresIn:"1h"});
        res.json({
            message:"Signed in successfully",
            token
        })
    } catch (error) {
        res.json({
            message:"Something gone wrong"
        })
    }
});
