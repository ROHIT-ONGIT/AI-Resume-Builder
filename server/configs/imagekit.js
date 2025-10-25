import dotenv from 'dotenv';
dotenv.config();

if (typeof window !== 'undefined') {
  // guard: prevent bundlers from pulling this into client bundle
  throw new Error('Do not import server/configs/imagekit.js from client-side code');
}

import ImageKit from '@imagekit/nodejs';

const privateKey = (process.env.IMAGEKIT_PRIVATE_KEY || '').trim();

if (!privateKey) {
  throw new Error(
    'IMAGEKIT_PRIVATE_KEY is missing or empty. Verify .env and ensure server process loads it before importing imagekit.js'
  );
}

const imageKit = new ImageKit({
privateKey,
});

export default imageKit;




