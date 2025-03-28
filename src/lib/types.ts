export interface Release {
	title: string;
	date: string;
	cover: string;
	streamLinks: {
		spotify: string;
		apple: string;
		youtube: string;
	};
}
