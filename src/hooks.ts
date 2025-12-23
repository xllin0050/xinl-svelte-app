import type { Reroute } from '@sveltejs/kit';

export const reroute: Reroute = (request) => {
	return new URL(request.url).pathname;
};
