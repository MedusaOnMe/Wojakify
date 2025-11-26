import OpenAI, { toFile } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function transformToWojak(imageBuffer: Buffer): Promise<Buffer> {
  // Convert buffer to a File object for OpenAI SDK
  const imageFile = await toFile(imageBuffer, 'image.png', { type: 'image/png' });

  const response = await openai.images.edit({
    model: 'gpt-image-1',
    image: imageFile,
    prompt: `Transform this image into a Wojak meme style. Make it look like the classic Wojak/Feels Guy meme:
    - Simple BLACK AND WHITE line art only - remove all color from the subject
    - The subject should be monochrome with black outlines on white/light gray
    - KEEP the original background color intact
    - Rough, hand-drawn MS Paint aesthetic
    - Exaggerated facial features like classic wojak
    - Crude and expressive like the original wojak memes
    - No shading, just simple black line work on the subject`,
    size: '1024x1024',
  });

  // Get the image data
  const imageData = response.data?.[0];

  if (!imageData) {
    throw new Error('No image data returned from OpenAI');
  }

  if (imageData.b64_json) {
    return Buffer.from(imageData.b64_json, 'base64');
  } else if (imageData.url) {
    // Fetch the image from URL
    const imageResponse = await fetch(imageData.url);
    const arrayBuffer = await imageResponse.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  throw new Error('No image URL or base64 data returned');
}
