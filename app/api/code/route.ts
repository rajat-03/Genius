import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: ChatCompletionMessageParam ={
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Explain the code at the end"
}


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
            model: 'gpt-3.5-turbo',
            messages : [instructionMessage, ...messages]
        });

        return NextResponse.json(chatCompletion.choices[0].message)
    } catch (error) {
        console.log("[CODE_ERROR]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}