<script lang="ts">
  let secretKeyHex = "00112233445566778899aabbccddeeff"; // Default 128-bit key
  let plainTextToEncrypt = "god bless you";
  let cipherTextBase32 = ""; // Changed from cipherTextHex
  let encryptionError = "";

  let base32ToDecrypt = ""; // Changed from cipherTextToDecrypt
  let decryptedPlainText = "";
  let decryptionError = "";

  const customBase32Alphabet = "BCDFGHJKMNPQRSTVWXYZ23456789AE01"; // Extended to 32 characters

  // --- Helper Functions ---
  function hexToUint8Array(hexString: string): Uint8Array { // Still needed for key
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
  
  function stringToUint8Array(str: string): Uint8Array {
    return new TextEncoder().encode(str);
  }

  function uint8ArrayToString(bytes: Uint8Array): string {
    return new TextDecoder().decode(bytes);
  }

  function uint8ArrayToBase32Custom(data: Uint8Array): string {
    let result = "";
    let buffer = 0;
    let bitsInBuff = 0;

    for (const byte of data) {
      buffer = (buffer << 8) | byte;
      bitsInBuff += 8;
      while (bitsInBuff >= 5) {
        bitsInBuff -= 5;
        const index = (buffer >>> bitsInBuff) & 0x1F; // 0x1F is 31 (00011111)
        result += customBase32Alphabet[index];
      }
    }

    if (bitsInBuff > 0) {
      const index = (buffer << (5 - bitsInBuff)) & 0x1F;
      result += customBase32Alphabet[index];
    }
    return result;
  }

  function base32CustomToUint8Array(base32String: string): Uint8Array {
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

  // --- Validation Functions ---
  function validateKey(keyHex: string): string {
    if (!/^[0-9a-fA-F]*$/.test(keyHex)) return "密鑰只能包含十六進制字符 (0-9, a-f)";
    if (keyHex.length !== 32 && keyHex.length !== 64) return `密鑰長度必須為32個字符 (128位元) 或64個字符 (256位元), 目前長度: ${keyHex.length}`;
    return "";
  }

  function validatePlainText(text: string): string {
    if (!text.trim()) return "請輸入需要加密的句子";
    return "";
  }

  function validateBase32Input(base32Str: string): string {
    if (!base32Str.trim()) return "請輸入需要解密的 Base32 密文";
    for (const char of base32Str) {
      if (customBase32Alphabet.indexOf(char) === -1) {
        return `密文包含無效字符 '${char}'。只允許使用以下字符: ${customBase32Alphabet}`;
      }
    }
    return "";
  }

  // --- AES-CTR Core (using SubtleCrypto) ---
  const FIXED_COUNTER = new Uint8Array(16); // Initialized to all zeros by default.

  async function getCryptoKey(keyHex: string): Promise<CryptoKey> {
    const keyMaterial = hexToUint8Array(keyHex);
    return crypto.subtle.importKey(
      "raw",
      keyMaterial,
      { name: "AES-CTR" },
      false, // not extractable
      ["encrypt", "decrypt"]
    );
  }

  // --- Encryption ---
  async function encryptSentence() {
    encryptionError = "";
    cipherTextBase32 = ""; // Changed

    const keyValidationError = validateKey(secretKeyHex);
    if (keyValidationError) {
      encryptionError = keyValidationError;
      return;
    }

    const plainTextValidationError = validatePlainText(plainTextToEncrypt);
    if (plainTextValidationError) {
      encryptionError = plainTextValidationError;
      return;
    }

    try {
      const cryptoKey = await getCryptoKey(secretKeyHex);
      const plainTextBytes = stringToUint8Array(plainTextToEncrypt);

      const encryptedBuffer = await crypto.subtle.encrypt(
        { name: "AES-CTR", counter: FIXED_COUNTER, length: 128 },
        cryptoKey,
        plainTextBytes
      );
      
      cipherTextBase32 = uint8ArrayToBase32Custom(new Uint8Array(encryptedBuffer)); // Changed

    } catch (e: any) {
      console.error("Encryption failed:", e);
      encryptionError = `加密失敗: ${e.message}`;
    }
  }

  // --- Decryption ---
  async function decryptSentence() {
    decryptionError = "";
    decryptedPlainText = "";

    const keyValidationError = validateKey(secretKeyHex);
    if (keyValidationError) {
      decryptionError = keyValidationError;
      return;
    }

    const cipherTextValidationError = validateBase32Input(base32ToDecrypt); // Changed
    if (cipherTextValidationError) {
      decryptionError = cipherTextValidationError;
      return;
    }

    try {
      const cryptoKey = await getCryptoKey(secretKeyHex);
      const cipherTextBytes = base32CustomToUint8Array(base32ToDecrypt); // Changed

      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: "AES-CTR", counter: FIXED_COUNTER, length: 128 },
        cryptoKey,
        cipherTextBytes
      );

      decryptedPlainText = uint8ArrayToString(new Uint8Array(decryptedBuffer));

    } catch (e: any) {
      console.error("Decryption failed:", e);
      if (e.name === 'OperationError' || e.message.toLowerCase().includes('decryption failed') || e.message.toLowerCase().includes('operation error')) {
        decryptionError = "解密失敗：金鑰錯誤或密文無效。";
      } else {
        decryptionError = `解密失敗: ${e.message}`;
      }
    }
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-200 p-4 md:p-8 flex flex-col items-center">
  <header class="text-center mb-10 md:mb-12">
    <h1 class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
      曲目標識隱寫術
    </h1>
    <p class="text-lg text-slate-400 mt-3">將神聖的曲目索引轉化為神秘代碼，再揭示其真實面貌。</p>
  </header>

  <main class="w-full max-w-3xl space-y-8 md:space-y-10">
    <section class="p-6 bg-slate-800/70 rounded-xl shadow-2xl border border-slate-700 backdrop-blur-sm">
      <h2 class="text-xl font-semibold mb-4 text-cyan-400 border-b border-slate-700 pb-2">共享密鑰設定</h2>
      <div>
        <label for="secretKeyGlobal" class="block text-sm font-medium text-slate-300 mb-1.5">秘密鑰匙 (十六進制，128或256位元):</label>
        <input type="text" id="secretKeyGlobal" bind:value={secretKeyHex} 
               class="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-slate-100 font-mono focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all shadow-inner"
               placeholder="例如: 2b7e151628aed2a6abf7158809cf4f3c">
        <p class="mt-2 text-xs text-slate-500">此密鑰將同時用於加密與解密操作。請確保其安全。</p>
      </div>
    </section>

    <div class="grid md:grid-cols-2 gap-8 md:gap-10">
      <section class="p-6 bg-slate-800/70 rounded-xl shadow-2xl border border-slate-700 backdrop-blur-sm">
        <h2 class="text-2xl font-semibold mb-6 text-purple-400 border-b-2 border-purple-500/50 pb-3">加密樂章 🎶</h2>
        <div class="space-y-5">
          <div>
            <label for="plainText" class="mb-1.5 block text-sm font-medium text-slate-300">輸入英文句子進行加密:</label>
						<input type="text" id="plainText" bind:value={plainTextToEncrypt} class="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-slate-100 shadow-inner transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500" placeholder="例如: god bless you" />
          </div>
          <button on:click={encryptSentence}
                  class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-purple-500">
            生成神秘代碼
          </button>
          {#if encryptionError}
            <div class="mt-4 p-3 bg-red-900/40 border border-red-700 rounded-lg text-red-300 text-sm">
              <p class="font-medium">加密處理訊息:</p>
              <p>{encryptionError}</p>
            </div>
          {/if}
          {#if cipherTextBase32}
						<div class="mt-5 rounded-lg border border-slate-600 bg-slate-700/50 p-4">
							<p class="text-sm text-slate-400">加密後的 Base32 密文 (使用自訂字符集):</p>
							<p class="text-lg font-mono text-green-400 break-all py-1 select-all">{cipherTextBase32}</p>
						</div>
					{/if}
        </div>
      </section>

      <section class="p-6 bg-slate-800/70 rounded-xl shadow-2xl border border-slate-700 backdrop-blur-sm">
        <h2 class="text-2xl font-semibold mb-6 text-teal-400 border-b-2 border-teal-500/50 pb-3">解密儀式 🗝️</h2>
        <div class="space-y-5">
          <div>
            <label for="base32ToDecrypt" class="block text-sm font-medium text-slate-300 mb-1.5">輸入 Base32 密文進行解密:</label>
            <input type="text" id="base32ToDecrypt" bind:value={base32ToDecrypt}
                   on:input={(e) => base32ToDecrypt = (e.currentTarget as HTMLInputElement).value.toUpperCase()}
                   class="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-slate-100 font-mono tracking-wider focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all shadow-inner uppercase"
                   placeholder="例如: NGPW2Z3Y...">
          </div>
          <button on:click={decryptSentence}
                  class="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-500">
            揭示真實面貌
          </button>
          {#if decryptionError}
            <div class="mt-4 p-3 bg-red-900/40 border border-red-700 rounded-lg text-red-300 text-sm">
              <p class="font-medium">解密處理訊息:</p>
              <p>{decryptionError}</p>
            </div>
          {/if}
          {#if decryptedPlainText}
            <div class="mt-5 p-4 bg-slate-700/50 rounded-lg border border-slate-600 space-y-2">
              <div>
                <p class="text-sm text-slate-400">解密後的句子:</p>
                <p class="text-lg text-sky-300">{decryptedPlainText}</p>
              </div>
            </div>
          {/if}
        </div>
      </section>
    </div>

  
  </main>
  
  <footer class="mt-12 p-6 bg-slate-800/50 rounded-lg shadow-md border border-slate-700 w-full max-w-3xl backdrop-blur-sm">
    <h3 class="text-lg font-semibold text-purple-300 mb-3">技術細節與備註</h3>
    <ul class="list-disc list-inside text-slate-400 space-y-1.5 text-sm">
      <li>加密演算法：AES-CTR (對稱加密)。</li>
      <li>輸入：英文字串。</li>
      <li>輸出：加密後的密文以自訂 Base32 格式顯示。</li>
      <li>Base32 字符集: <code class="bg-slate-700 px-1.5 py-0.5 rounded text-xs font-mono select-all">{customBase32Alphabet}</code></li>
      <li>密鑰長度：支援 128 位元 (32 十六進制字符) 或 256 位元 (64 十六進制字符)。</li>
      <li class="text-yellow-500"><span class="font-bold">安全性提示：</span>此為客戶端實作範例。在生產環境中，密鑰管理需採用更安全機制，避免在前端暴露。此方案主要提供編碼混淆與「參與儀式感」。</li>
      <li>相依套件：無外部加密函式庫 (使用瀏覽器內建 Crypto API)。</li>
    </ul>
  </footer>
</div>

<style>
  /* TailwindCSS is used via classes. Global styles or component-specific non-Tailwind styles can be added here if needed. */
  .bg-clip-text {
    -webkit-background-clip: text;
    background-clip: text;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
    appearance: textfield; /* Standard property */
  }
</style>
