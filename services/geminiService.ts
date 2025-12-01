import { GoogleGenAI } from "@google/genai";
import { StateConfig } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIExplanation = async (
  question: string,
  answer: string,
  state: StateConfig
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are an expert driving instructor for the state of ${state.name}.
      A student is confused about the following traffic rule question.
      
      Question: "${question}"
      Correct Answer: "${answer}"
      
      Please provide a concise, encouraging, and clear explanation of WHY this is the answer based on general traffic safety principles and specific ${state.name} ${state.agency} regulations. Keep it under 50 words.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Unable to generate explanation at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our AI tutor is currently taking a break. Please check the official manual.";
  }
};