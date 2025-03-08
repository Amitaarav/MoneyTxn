"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client"

export async function createOnRampTransaction( amount:number,provider:string) {
    const session = await getServerSession(authOptions);

    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const userId = session?.user.id;


    if(!userId){
        return {
            message: "User not authenticated",
        }
    }

    await prisma.onRampTransaction.create({
        data: {
            userId:Number(userId),
            amount:amount,
            provider:provider,
            status:"Processing",
            startTime:new Date(),
            token:token
        },
    })

    return {
        message: "On ramp transaction added",
    }
}