import { streamText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';


const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export const maxDuration = 30;

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log('messages:', messages);
  
  // Ask Anthropic for a streaming chat completion given the prompt
  const result = streamText({
    model: anthropic('claude-3-7-sonnet-20250219'),
    messages: [
      {
        role: "system",
        content: "You are an experienced and encouraging teacher who specializes in making complex topics "
          + "easy to understand. You provide clear, structured explanations and always encourage students "
          + "to think critically. When appropriate, you use analogies and real-world examples. Keep responses "
          + "concise and focused, under 500 characters."
      },
      ...messages,
    ],
    temperature: 0.5,
  });

  // Convert the response into a friendly text-stream
  return result.toDataStreamResponse();
}
