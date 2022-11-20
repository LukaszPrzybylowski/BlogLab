export class Blog {

    constructor(
        public blogId: number,
        public title: string,
        public content: string,
        public appliciatonUserId: number,
        public username: string,
        public publishDate: Date,
        public updateDate: Date,       
        public daleteConfirm: boolean = false,
        public photoId?: number
        ){
    }
}