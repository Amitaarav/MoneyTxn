"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client"

export async function createOnRampTransaction( amount:number, provider:string) {
    
    const session = await getServerSession(authOptions);

    if(!session?.user || !session.user?.id){
        return {
            message: "User not authenticated",
        }
    }
    //instead of token coming from the bank server
    // dummy token since we are simulating bank webhook. Do not have banking api
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const userId = session.user.id

    // puts entry in the database
    await prisma.onRampTransaction.create({
        data: {
            userId:Number(userId),
            amount:amount * 100,
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