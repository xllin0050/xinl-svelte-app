export const customBase32Alphabet = "BCDFGHJKMNPQRSTVWXYZ23456789AE01";

export function uint8ArrayToBase32Custom(data: Uint8Array): string {
  let result = "";
  let buffer = 0;
  let bitsInBuff = 0;

  for (const byte of data) {
    buffer = (buffer << 8) | byte;
    bitsInBuff += 8;
    while (bitsInBuff >= 5) {
      bitsInBuff -= 5;
      const index = (buffer >>> bitsInBuff) & 0x1F;
      result += customBase32Alphabet[index];
    }
  }

  if (bitsInBuff > 0) {
    const index = (buffer << (5 - bitsInBuff)) & 0x1F;
    result += customBase32Alphabet[index];
  }
  return result;
}

export function base32CustomToUint8Array(base32String: string): Uint8Array {
  const resultBytes: number[] = [];
  let buffer = 0;
  let bitsInBuff = 0;

  for (const char of base32String) {
    const value = customBase32Alphabet.indexOf(char);
    if (value === -1) {
      throw new Error(`密文中包含無效的Base32字符: ${char}`);
    }
    buffer = (buffer << 5) | value;
    bitsInBuff += 5;
    if (bitsInBuff >= 8) {
      bitsInBuff -= 8;
      const byte = (buffer >>> bitsInBuff) & 0xFF;
      resultBytes.push(byte);
    }
  }
  return new Uint8Array(resultBytes);
}

export function validateBase32Input(base32Str: string): string {
  if (!base32Str.trim()) return "請輸入需要解密的 Base32 密文";
  for (const char of base32Str) {
    if (customBase32Alphabet.indexOf(char) === -1) {
      return `密文包含無效字符 '${char}'。只允許使用以下字符: ${customBase32Alphabet}`;
    }
  }
  return "";
}
