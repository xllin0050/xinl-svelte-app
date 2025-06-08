export function hexToUint8Array(hexString: string): Uint8Array {
  if (hexString.length % 2 !== 0) {
    throw new Error("十六進制字串的長度必須是偶數。");
  }
  const byteArray = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < byteArray.length; i++) {
    byteArray[i] = parseInt(hexString.substring(i * 2, i * 2 + 2), 16);
    if (isNaN(byteArray[i])) {
      throw new Error("十六進制字串包含無效字符。");
    }
  }
  return byteArray;
}
