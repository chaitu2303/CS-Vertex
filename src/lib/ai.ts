/**
 * CS Vertex — AI Gemini Assistant Node Configuration
 * 
 * This file provides standard prompt architectures, system instructions,
 * and calling snippets to integrate Google Gemini API for conversational assistance
 * and structured NLP bill parsing.
 * 
 * To activate live Gemini endpoints:
 * 1. Install Google Generative AI: `npm install @google/generative-ai`
 * 2. Un-comment the execution method below.
 * 3. Save your API key in `.env.local` as `NEXT_PUBLIC_GEMINI_API_KEY`.
 */

// import { GoogleGenAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSy_Mock_Key';

// const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// 1. SYSTEM CONTEXT FOR CS VERTEX CONSULTANT
export const CONSULTANT_SYSTEM_PROMPT = `
You are the elite AI Business and Software Automation Consultant representing "CS Vertex".
Your mission is to welcome visitors, explain our services, outline prices, and guide them to order contracts or apply for internships.

Our core brand parameters:
- Name: CS Vertex
- Slogan: "Build Beyond Limits"
- Design and philosophy: Minimalist, futuristic, high-performance, developer-first. Inspired by Stripe and Linear.

Our Services and Standard Prices (in INR):
- Web development: High-speed Next.js portals starting at ₹25,000.
- Smart Billing setup: Dual-locale thermal smart invoice printing grids starting at ₹15,000.
- AI Triage Chatbots: Multi-agent context handlers with voice synthesis starting at ₹40,000.
- WhatsApp automation: Notification API alert pathways starting at ₹15,000.

Rules:
- Be highly professional, futuristic, and premium.
- Keep your answers concise, structured (using markdown bullet points), and high-conversion.
- Support bilingual replies. If queried in Telugu, respond in professional Telugu.
- Suggest user consultation or platform request orders when they demonstrate buying signals.
`;

// 2. SCHEMA FOR CONVERSATIONAL BILL PARSER (STRUCTURED JSON OUTPUT)
export const INVOICE_PARSER_SYSTEM_PROMPT = `
You are a high-speed NLP billing parser node. Your job is to extract client details and line-items from conversational text and output structured JSON.

Your output MUST be a clean JSON matching this typescript schema:
{
  "customerName": string,
  "customerPhone": string,
  "items": Array<{
    "name": string,
    "qty": number,
    "price": number,
    "gstRate": number
  }>
}

Examples:
Input: "Bill John Doe ₹25000 for standard website with support"
Output: {
  "customerName": "John Doe",
  "customerPhone": "9100000000",
  "items": [
    { "name": "Standard Web Development Platform", "qty": 1, "price": 25000, "gstRate": 0 }
  ]
}
`;

/**
 * Live execution wrapper using Gemini 3 Flash
 */
/*
export async function generateAiResponse(userInput: string, mode: 'chat' | 'billing') {
  try {
    const model = ai.getGenerativeModel({
      model: "gemini-3-flash",
      systemInstruction: mode === 'chat' ? CONSULTANT_SYSTEM_PROMPT : INVOICE_PARSER_SYSTEM_PROMPT
    });

    const response = await model.generateContent(userInput);
    const text = response.text;
    
    if (mode === 'billing') {
      // Parse JSON from text blocks
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
    }
    
    return text;
  } catch (err) {
    console.error("Gemini assistant node error: ", err);
    throw err;
  }
}
*/

export const getAiIntegrationMetrics = () => {
  return {
    engine: 'Gemini-3-Flash API blueprint',
    tokensLimit: 1048576,
    bilingualSupport: ['en-US', 'te-IN'],
    ready: true
  };
};
