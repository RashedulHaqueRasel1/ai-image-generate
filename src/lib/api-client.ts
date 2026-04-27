import axios from "axios";

export const generateAvatar = async (prompt: string): Promise<string> => {
  try {
    // Obfuscate the prompt by encoding it to base64
    const encodedData = btoa(unescape(encodeURIComponent(prompt)));

    const response = await axios.post(
      "/api/generate",
      {
        ref: encodedData, // Send as a generic 'ref' key instead of 'prompt'
      },
      {
        responseType: "blob",
      },
    );

    if (response.data) {
      // Create a local URL for the image blob
      return URL.createObjectURL(response.data);
    }

    throw new Error("Invalid response from server");
  } catch (error) {
    console.error("Error generating avatar:", error);
    throw error;
  }
};
