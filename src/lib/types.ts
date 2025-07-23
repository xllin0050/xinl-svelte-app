export interface Release {
	id: string;
	title: string;
	date: string;
	cover: string;
	streamLinks: {
		spotify: string;
		apple: string;
		youtube: string;
	};
}
