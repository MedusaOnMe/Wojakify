import { NextRequest, NextResponse } from 'next/server';
import { transformToWojak } from '@/lib/openai';
import { uploadImage } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Transform to wojak style
    const wojakBuffer = await transformToWojak(buffer);

    // Generate unique filename
    const filename = `wojak_${Date.now()}.png`;

    // Upload to Firebase
    const url = await uploadImage(wojakBuffer, filename);

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Transform error:', error);
    return NextResponse.json(
      { error: 'Failed to transform image' },
      { status: 500 }
    );
  }
}
