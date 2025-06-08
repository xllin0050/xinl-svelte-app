<script lang="ts">
	import { hexToUint8Array } from '$lib/utility/hexUtils';
	import {
		stringToUint8Array,
		uint8ArrayToString
	} from '$lib/utility/stringUtils';
	import {
		customBase32Alphabet,
		uint8ArrayToBase32Custom,
		base32CustomToUint8Array,
		validateBase32Input
	} from '$lib/utility/base32Utils';
	import { FIXED_COUNTER } from '$lib/utility/cryptoConstants';

	let secretKeyHex = $state(import.meta.env.VITE_CRYPTO_TRACK_SECRET_KEY ?? ''); // 從 .env 讀取密鑰
	let plainTextToEncrypt = $state('god bless you');
	let cipherTextBase32 = $state('');
	let encryptionError = $state('');

	let base32ToDecrypt = $state('');
	let decryptedPlainText = $state('');
	let decryptionError = $state('');

	// --- Validation Functions (Component Specific) ---
	function validateKey(keyHex: string): string {
		if (!/^[0-9a-fA-F]*$/.test(keyHex))
			return '密鑰只能包含十六進制字符 (0-9, a-f)';
		if (keyHex.length !== 32 && keyHex.length !== 64)
			return `密鑰長度必須為32個字符 (128位元) 或64個字符 (256位元), 目前長度: ${keyHex.length}`;
		return '';
	}

	function validatePlainText(text: string): string {
		if (!text.trim()) return '請輸入需要加密的句子';
		return '';
	}

	// --- AES-CTR Core (using SubtleCrypto) ---
	async function getCryptoKey(keyHexValue: string): Promise<CryptoKey> {
		const keyMaterial = hexToUint8Array(keyHexValue);
		return crypto.subtle.importKey(
			'raw',
			keyMaterial,
			{ name: 'AES-CTR' },
			false, // not extractable
			['encrypt', 'decrypt']
		);
	}

	// --- Encryption ---
	async function encryptSentence() {
		encryptionError = '';
		cipherTextBase32 = '';

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
				{ name: 'AES-CTR', counter: FIXED_COUNTER, length: 128 },
				cryptoKey,
				plainTextBytes
			);

			cipherTextBase32 = uint8ArrayToBase32Custom(
				new Uint8Array(encryptedBuffer)
			);
		} catch (e: any) {
			console.error('Encryption failed:', e);
			encryptionError = `加密失敗: ${e.message}`;
		}
	}

	// --- Decryption ---
	async function decryptSentence() {
		decryptionError = '';
		decryptedPlainText = '';

		const keyValidationError = validateKey(secretKeyHex);
		if (keyValidationError) {
			decryptionError = keyValidationError;
			return;
		}

		const cipherTextValidationError = validateBase32Input(base32ToDecrypt);
		if (cipherTextValidationError) {
			decryptionError = cipherTextValidationError;
			return;
		}

		try {
			const cryptoKey = await getCryptoKey(secretKeyHex);
			const cipherTextBytes = base32CustomToUint8Array(base32ToDecrypt);

			const decryptedBuffer = await crypto.subtle.decrypt(
				{ name: 'AES-CTR', counter: FIXED_COUNTER, length: 128 },
				cryptoKey,
				cipherTextBytes
			);

			decryptedPlainText = uint8ArrayToString(new Uint8Array(decryptedBuffer));
		} catch (e: any) {
			console.error('Decryption failed:', e);
			if (
				e.name === 'OperationError' ||
				e.message.toLowerCase().includes('decryption failed') ||
				e.message.toLowerCase().includes('operation error')
			) {
				decryptionError = '解密失敗：金鑰錯誤或密文無效。';
			} else {
				decryptionError = `解密失敗: ${e.message}`;
			}
		}
	}
</script>

<div
	class="flex min-h-screen flex-col items-center bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-slate-200 md:p-8"
>
	<header class="mb-10 text-center md:mb-12">
		<h1
			class="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl"
		>
			曲目標識隱寫術
		</h1>
		<p class="mt-3 text-lg text-slate-400">
			將神聖的曲目索引轉化為神秘代碼，再揭示其真實面貌。
		</p>
	</header>

	<main class="w-full max-w-3xl space-y-8 md:space-y-10">
		<section
			class="rounded-xl border border-slate-700 bg-slate-800/70 p-6 shadow-2xl backdrop-blur-sm"
		>
			<h2
				class="mb-4 border-b border-slate-700 pb-2 text-xl font-semibold text-cyan-400"
			>
				共享密鑰設定
			</h2>
			<div>
				<label
					for="secretKeyGlobal"
					class="mb-1.5 block text-sm font-medium text-slate-300"
					>秘密鑰匙 (十六進制，128或256位元):</label
				>
				<input
					type="text"
					id="secretKeyGlobal"
					bind:value={secretKeyHex}
					class="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 font-mono text-slate-100 shadow-inner transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
					placeholder="例如: 2b7e151628aed2a6abf7158809cf4f3c"
				/>
				<p class="mt-2 text-xs text-slate-500">
					此密鑰將同時用於加密與解密操作。請確保其安全。
				</p>
			</div>
		</section>

		<div class="grid gap-8 md:grid-cols-2 md:gap-10">
			<section
				class="rounded-xl border border-slate-700 bg-slate-800/70 p-6 shadow-2xl backdrop-blur-sm"
			>
				<h2
					class="mb-6 border-b-2 border-purple-500/50 pb-3 text-2xl font-semibold text-purple-400"
				>
					加密樂章 🎶
				</h2>
				<div class="space-y-5">
					<div>
						<label
							for="plainText"
							class="mb-1.5 block text-sm font-medium text-slate-300"
							>輸入英文句子進行加密:</label
						>
						<input
							type="text"
							id="plainText"
							bind:value={plainTextToEncrypt}
							class="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-slate-100 shadow-inner transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
							placeholder="例如: god bless you"
						/>
					</div>
					<button
						onclick={encryptSentence}
						class="w-full transform rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 font-bold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800 focus:outline-none"
					>
						生成神秘代碼
					</button>
					{#if encryptionError}
						<div
							class="mt-4 rounded-lg border border-red-700 bg-red-900/40 p-3 text-sm text-red-300"
						>
							<p class="font-medium">加密處理訊息:</p>
							<p>{encryptionError}</p>
						</div>
					{/if}
					{#if cipherTextBase32}
						<div
							class="mt-5 rounded-lg border border-slate-600 bg-slate-700/50 p-4"
						>
							<p class="text-sm text-slate-400">
								加密後的 Base32 密文 (使用自訂字符集):
							</p>
							<p
								class="py-1 font-mono text-lg break-all text-green-400 select-all"
							>
								{cipherTextBase32}
							</p>
						</div>
					{/if}
				</div>
			</section>

			<section
				class="rounded-xl border border-slate-700 bg-slate-800/70 p-6 shadow-2xl backdrop-blur-sm"
			>
				<h2
					class="mb-6 border-b-2 border-teal-500/50 pb-3 text-2xl font-semibold text-teal-400"
				>
					解密儀式 🗝️
				</h2>
				<div class="space-y-5">
					<div>
						<label
							for="base32ToDecrypt"
							class="mb-1.5 block text-sm font-medium text-slate-300"
							>輸入 Base32 密文進行解密:</label
						>
						<input
							type="text"
							id="base32ToDecrypt"
							bind:value={base32ToDecrypt}
							oninput={(e) =>
								(base32ToDecrypt = (
									e.currentTarget as HTMLInputElement
								).value.toUpperCase())}
							class="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 font-mono tracking-wider text-slate-100 uppercase shadow-inner transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
							placeholder="例如: NGPW2Z3Y..."
						/>
					</div>
					<button
						onclick={decryptSentence}
						class="w-full transform rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-3 font-bold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:from-teal-600 hover:to-cyan-600 hover:shadow-xl focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-800 focus:outline-none"
					>
						揭示真實面貌
					</button>
					{#if decryptionError}
						<div
							class="mt-4 rounded-lg border border-red-700 bg-red-900/40 p-3 text-sm text-red-300"
						>
							<p class="font-medium">解密處理訊息:</p>
							<p>{decryptionError}</p>
						</div>
					{/if}
					{#if decryptedPlainText}
						<div
							class="mt-5 space-y-2 rounded-lg border border-slate-600 bg-slate-700/50 p-4"
						>
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

	<footer
		class="mt-12 w-full max-w-3xl rounded-lg border border-slate-700 bg-slate-800/50 p-6 shadow-md backdrop-blur-sm"
	>
		<h3 class="mb-3 text-lg font-semibold text-purple-300">技術細節與備註</h3>
		<ul class="list-inside list-disc space-y-1.5 text-sm text-slate-400">
			<li>加密演算法：AES-CTR (對稱加密)。</li>
			<li>輸入：英文字串。</li>
			<li>輸出：加密後的密文以自訂 Base32 格式顯示。</li>
			<li>
				Base32 字符集: <code
					class="rounded bg-slate-700 px-1.5 py-0.5 font-mono text-xs select-all"
					>{customBase32Alphabet}</code
				>
			</li>
			<li>
				密鑰長度：支援 128 位元 (32 十六進制字符) 或 256 位元 (64
				十六進制字符)。
			</li>
			<li class="text-yellow-500">
				<span class="font-bold">安全性提示：</span
				>此為客戶端實作範例。在生產環境中，密鑰管理需採用更安全機制，避免在前端暴露。此方案主要提供編碼混淆與「參與儀式感」。
			</li>
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
</style>
