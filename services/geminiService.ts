
import { GoogleGenAI, Type } from "@google/genai";
import { DesignMode, PosterData, BusinessCardData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateDesign = async (mode: DesignMode, data: PosterData | BusinessCardData) => {
  const model = "gemini-3-flash-preview";

  let prompt = "";
  let responseSchema: any = {};

  if (mode === DesignMode.POSTER) {
    const poster = data as PosterData;
    prompt = `Act as a world-class graphic designer. Generate a professional poster design concept for:
    Event Type: ${poster.eventType}
    Title: ${poster.title}
    Date: ${poster.date}
    Requested Colors: ${poster.colors}
    Target Audience: ${poster.audience}
    Tone: ${poster.tone}
    
    Provide a cohesive design strategy including copy, font pairings, and layout.`;

    responseSchema = {
      type: Type.OBJECT,
      properties: {
        headline: { type: Type.STRING },
        subtext: { type: Type.STRING },
        cta: { type: Type.STRING },
        fontPairing: {
          type: Type.OBJECT,
          properties: {
            heading: { type: Type.STRING },
            body: { type: Type.STRING }
          },
          required: ["heading", "body"]
        },
        colors: {
          type: Type.OBJECT,
          properties: {
            primary: { type: Type.STRING, description: "HEX code" },
            secondary: { type: Type.STRING, description: "HEX code" },
            accent: { type: Type.STRING, description: "HEX code" },
            background: { type: Type.STRING, description: "HEX code" },
            text: { type: Type.STRING, description: "HEX code" }
          },
          required: ["primary", "secondary", "accent", "background", "text"]
        },
        layoutDescription: { type: Type.STRING },
        visualMetaphor: { type: Type.STRING }
      },
      required: ["headline", "subtext", "cta", "fontPairing", "colors", "layoutDescription", "visualMetaphor"]
    };
  } else {
    const card = data as BusinessCardData;
    prompt = `Act as a world-class graphic designer. Generate a modern minimalist business card design concept for:
    Name: ${card.name}
    Title: ${card.title}
    Company: ${card.company}
    Phone: ${card.phone}
    Email: ${card.email}
    Preferred Brand Colors: ${card.brandColors}
    
    Ensure the design is clean, professional, and balanced. Return details for front and back.`;

    responseSchema = {
      type: Type.OBJECT,
      properties: {
        front: {
          type: Type.OBJECT,
          properties: {
            layout: { type: Type.STRING },
            elements: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["layout", "elements"]
        },
        back: {
          type: Type.OBJECT,
          properties: {
            layout: { type: Type.STRING },
            elements: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["layout", "elements"]
        },
        typography: {
          type: Type.OBJECT,
          properties: {
            primary: { type: Type.STRING },
            secondary: { type: Type.STRING }
          },
          required: ["primary", "secondary"]
        },
        colors: {
          type: Type.OBJECT,
          properties: {
            primary: { type: Type.STRING },
            secondary: { type: Type.STRING },
            accent: { type: Type.STRING },
            background: { type: Type.STRING },
            text: { type: Type.STRING }
          },
          required: ["primary", "secondary", "accent", "background", "text"]
        },
        qrPlacement: { type: Type.STRING },
        spacingNotes: { type: Type.STRING }
      },
      required: ["front", "back", "typography", "colors", "qrPlacement", "spacingNotes"]
    };
  }

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema,
      temperature: 0.7,
    },
  });

  return JSON.parse(response.text);
};
