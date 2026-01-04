
import { GoogleGenAI, Type } from "@google/genai";

// The API key must be obtained exclusively from the environment variable process.env.API_KEY
// as per the system requirements for this environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async predictDisease(symptoms: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Analyze the following symptoms and provide a potential diagnosis, suggested tests, and risk level. Symptoms: ${symptoms}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            possibleDiagnosis: { type: Type.STRING },
            confidence: { type: Type.STRING },
            recommendedTests: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
            },
            riskLevel: { type: Type.STRING },
            explanation: { type: Type.STRING }
          },
          required: ["possibleDiagnosis", "recommendedTests", "riskLevel"]
        }
      }
    });
    return JSON.parse(response.text);
  },

  async checkDrugInteractions(drugs: string[]) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze these drugs for potential interactions: ${drugs.join(', ')}. Provide a severity rating (High, Moderate, None) and explanation.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            severity: { type: Type.STRING },
            interactions: { type: Type.ARRAY, items: { type: Type.STRING } },
            advice: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text);
  },

  async getClinicalAdvice(patientData: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `You are a Clinical Decision Support System. Based on this patient data, suggest next steps and potential drug interactions: ${patientData}`,
    });
    return response.text;
  },

  async chatWithMedicalAI(message: string, history: { role: string, parts: { text: string }[] }[]) {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: 'You are an empathetic, professional medical assistant. Provide helpful health information but always remind users to consult a doctor. Keep answers concise.',
      },
    });
    const response = await chat.sendMessage({ message });
    return response.text;
  }
};
