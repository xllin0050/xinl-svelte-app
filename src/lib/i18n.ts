import { derived, writable } from 'svelte/store';

import { browser } from '$app/environment';

import en from '$lib/messages/en.json';
import zh from '$lib/messages/zh.json';
import ja from '$lib/messages/ja.json';

type Locale = 'en' | 'zh' | 'ja';

type Dict = Record<string, string>;

const dictionaries: Record<Locale, Dict> = {
	en: en as Dict,
	zh: zh as Dict,
	ja: ja as Dict
};

function isLocale(value: unknown): value is Locale {
	return value === 'en' || value === 'zh' || value === 'ja';
}

const stored = browser ? localStorage.getItem('locale') : null;
const initialLocale: Locale = isLocale(stored) ? stored : 'en';

export const locale = writable<Locale>(initialLocale);

if (browser) {
	locale.subscribe((value) => {
		localStorage.setItem('locale', value);
	});
}

export const t = derived(locale, ($locale) => {
	return (key: string) => {
		return dictionaries[$locale]?.[key] ?? dictionaries.en?.[key] ?? key;
	};
});

export function setLocale(next: Locale) {
	locale.set(next);
}
