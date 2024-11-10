import { Anon } from '@anyone-protocol/anyone-client';

export async function startAnyoneClient() {
  const anon = new Anon();
  try {
    await anon.start();
    console.log('Anyone client started successfully.');
  } catch (error) {
    console.error('Error starting Anyone client:', error);
  }
  return anon;
}
