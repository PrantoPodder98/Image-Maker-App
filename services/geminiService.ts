import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateEditedImage = async (
  base64Image: string,
  prompt: string,
  mimeType: string = "image/png"
): Promise<{ imageUrl: string | null; text: string | null }> => {
  try {
    const ai = getClient();
    
    // Remove header from base64 string if present for the API call data
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      // Note: responseMimeType and responseSchema are NOT supported for nano banana models
    });

    let generatedImageUrl: string | null = null;
    let generatedText: string | null = null;

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          // Assume PNG for generated output unless specifically requested otherwise, 
          // though typically the model returns what it decides or based on config.
          // The API usually returns consistent types, often image/png or image/jpeg.
          generatedImageUrl = `data:image/png;base64,${base64EncodeString}`;
        } else if (part.text) {
          generatedText = part.text;
        }
      }
    }

    return { imageUrl: generatedImageUrl, text: generatedText };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
