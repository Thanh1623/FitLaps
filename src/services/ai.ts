import OpenAI from 'openai';

function getOpenAIClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('Missing GROQ_API_KEY environment variable');
  }
  return new OpenAI({ 
    apiKey,
    baseURL: 'https://api.groq.com/openai/v1'
  });
}

/**
 * Base AI interaction helper
 */
export async function askAI(prompt: string, systemPrompt: string) {
  const openai = getOpenAIClient();
  const response = await openai.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: `${systemPrompt} Return only raw JSON, no markdown formatting.` },
      { role: 'user', content: prompt },
    ],
    response_format: { type: 'json_object' },
  });

  return response.choices[0]?.message?.content ?? 'No response generated.';
}
