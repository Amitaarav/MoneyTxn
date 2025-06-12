import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// Store OTPs in memory (in production, use Redis or similar)
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

export async function POST(req: Request) {
    try {
        const { number } = await req.json();

        if (!number) {
            return NextResponse.json(
                { message: "Phone number is required" },
                { status: 400 }
            );
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        // Store OTP
        otpStore.set(number, { otp, expiresAt });

        // Send OTP via Twilio
        await client.messages.create({
            body: `Your MoneyTxn verification code is: ${otp}. Valid for 10 minutes.`,
            to: number,
            from: twilioNumber,
        });

        return NextResponse.json(
            { message: "OTP sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending OTP:", error);
        return NextResponse.json(
            { message: "Failed to send OTP" },
            { status: 500 }
        );
    }
}

// Verify OTP
export async function PUT(req: Request) {
    try {
        const { number, otp } = await req.json();

        if (!number || !otp) {
            return NextResponse.json(
                { message: "Phone number and OTP are required" },
                { status: 400 }
            );
        }

        const storedData = otpStore.get(number);

        if (!storedData) {
            return NextResponse.json(
                { message: "OTP not found or expired" },
                { status: 400 }
            );
        }

        if (Date.now() > storedData.expiresAt) {
            otpStore.delete(number);
            return NextResponse.json(
                { message: "OTP expired" },
                { status: 400 }
            );
        }

        if (storedData.otp !== otp) {
            return NextResponse.json(
                { message: "Invalid OTP" },
                { status: 400 }
            );
        }

        // Clear OTP after successful verification
        otpStore.delete(number);

        return NextResponse.json(
            { message: "OTP verified successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return NextResponse.json(
            { message: "Failed to verify OTP" },
            { status: 500 }
        );
    }
} 