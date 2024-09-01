import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: ChatCompletionMessageParam = {
    role: "system",
    content: "You will act as an expert developer to assist me with challenges across the entire spectrum of coding and development, with a focus on problem-solving. I work with various technologies and languages, but you should prioritize providing solutions related to the MERN stack, Java fullstack development, and the latest version of Next.js 14 using the app directory instead of pages.When responding, provide detailed explanations, concise code examples, and step-by-step guidance. Include background information when necessary, but keep it brief and to the point. Ensure your advice aligns with current industry standards and best practices. When providing code examples, format them in Markdown with proper indentation for readability."
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

        if (!messages) {
            return new NextResponse("Message is required", { status: 400 })
        }

        const chatCompletion = await openai.chat.completions.create({
            model:`${process.env.OPENAI_MODEL}`,
            messages: [instructionMessage, ...messages]
        });

        return NextResponse.json(chatCompletion.choices[0].message)
    } catch (error) {
        console.log("[CODE_ERROR]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}