import crypto from 'crypto';
import AppError from '../errors/AppError';

function encrypt(text: string): string {
  const cryptoIV = process.env.CRYPTO_IV;
  const cryptoSecret = process.env.CRYPTO_SECRET;

  if (!cryptoIV || !cryptoSecret) {
    throw new AppError('Internal server error.', 500);
  }

  const cipher = crypto.createCipheriv(
    'aes-256-ctr',
    cryptoSecret,
    Buffer.from(cryptoIV, 'hex'),
  );

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return encrypted.toString('hex');
}

function decrypt(hash: string): string {
  const cryptoIV = process.env.CRYPTO_IV;
  const cryptoSecret = process.env.CRYPTO_SECRET;

  if (!cryptoIV || !cryptoSecret) {
    throw new AppError('Internal server error.', 500);
  }

  const decipher = crypto.createDecipheriv(
    'aes-256-ctr',
    cryptoSecret,
    Buffer.from(cryptoIV, 'hex'),
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash, 'hex')),
    decipher.final(),
  ]);

  return decrypted.toString();
}

export { encrypt, decrypt };
