import { GoogleGenAI } from '@google/genai';

// Initialize Gemini with the API Key from environment variables
const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Use current best models for text and image
const textModelId = process.env.GEMINI_TEXT_MODEL || 'gemini-1.5-flash';
const imageModelId = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';

/**
 * Generates a response using Gemini AI
 * @param {string} prompt - The user's input/question
 * @returns {Promise<string>} - The AI generated response
 */
export async function askGemini(prompt) {
    try {
        const response = await genAI.models.generateContent({
            model: textModelId,
            contents: prompt,
        });

        if (!response.text) {
            throw new Error('Empty response from Gemini');
        }

        return response.text;
    } catch (error) {
        console.error('Error in askGemini:', error);
        throw error;
    }
}

/**
 * Generates an image using Gemini AI
 * @param {string} prompt - The user's image creation prompt
 * @returns {Promise<Buffer>} - The generated image buffer
 */
export async function generateImage(prompt) {
    try {
        const response = await genAI.models.generateContent({
            model: imageModelId,
            contents: prompt,
        });

        // Search for inlineData which contains the image data
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return Buffer.from(part.inlineData.data, "base64");
            }
        }
        
        throw new Error('No image data returned from model');
    } catch (error) {
        console.error('Error in generateImage:', error);
        throw error;
    }
}
