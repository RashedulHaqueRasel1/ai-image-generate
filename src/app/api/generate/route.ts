import axios from "axios";

export async function POST(request: Request) {
  try {
    const { ref } = await request.json();

    if (!ref) {
      return new Response(JSON.stringify({ error: "Data is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Decode the base64 obfuscated prompt
    const prompt = Buffer.from(ref, "base64").toString("utf-8");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error(
        "NEXT_PUBLIC_API_URL is not defined in environment variables",
      );
    }

    // 1. Call the external Hugging Face API to get the image URL
    const hfResponse = await axios.post(apiUrl, {
      prompt,
    });

    let externalImageUrl = "";
    if (typeof hfResponse.data === "string") {
      externalImageUrl = hfResponse.data;
    } else {
      externalImageUrl =
        hfResponse.data.url ||
        hfResponse.data.link ||
        hfResponse.data.image_url ||
        hfResponse.data;
    }

    if (!externalImageUrl) {
      throw new Error("No image URL returned from Hugging Face");
    }

    // 2. Fetch the actual image data on the server
    const imageResponse = await axios.get(externalImageUrl, {
      responseType: "arraybuffer",
    });

    // 3. Return the image data directly to the client
    // This way the external URL never reaches the browser's network tab
    return new Response(imageResponse.data, {
      headers: {
        "Content-Type": imageResponse.headers["content-type"] || "image/png",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error in API route:", errorMessage);

    return new Response(
      JSON.stringify({ error: "Failed to generate avatar" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
