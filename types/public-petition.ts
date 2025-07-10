export interface PublicPetition {
	id: string;
	id_seq: number;
	category: string;
	sequenceNumber: number;
	title: string;
	objective: string;
	destination: string;
	mediaType: 'PICTURE' | 'VIDEO_YOUTUBE';
	videoYoutubeUrl: string;
	signatureGoal: number;
	publishedAt: string;
	isPublished: boolean;
	usersSignedNumber: number;
	offsetMarketing: number;
	isISign: boolean;
	content: string;
	pictureUrl: string;
	videoUrl: string;
	status: string;
	comments: string[];
	author: Author;
	isMine: boolean;
	urlPetition: string;
	paramsUrlPetition: string;
	litigationNumber: number;
}

export interface Author {
    id:         string;
    name:       string;
    picture:    Picture;
    pictureUrl: string;
}

export interface Picture {
    id: string;
}
