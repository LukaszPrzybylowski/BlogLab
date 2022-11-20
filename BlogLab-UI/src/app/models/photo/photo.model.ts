export class Photo {

    constructor(
        public photoId: number,
        public applicaitonUserId: number,
        public imageUrl: string,
        public publicId: string,
        public description: string,
        public publishdate: Date,
        public updateDate: Date,
        public deleteConfirm: boolean = false,
        ){
    }
}