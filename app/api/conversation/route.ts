import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!openai) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 })
        }

        if(!messages)
        {
            return new NextResponse("Message is required", {status: 400})
        }

        const chatCompletion = await openai.chat.completions.create({
            model:`${process.env.OPENAI_MODEL}`,
            messages
        });

        return NextResponse.json(chatCompletion.choices[0].message)
    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}