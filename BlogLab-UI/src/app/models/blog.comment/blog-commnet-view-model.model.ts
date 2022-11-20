export class BlogCommentViewModel {

    constructor(
        public parentBlogId: number,
        public blogCommentId: number,
        public blogId: number,
        public content: string,
        public username: string,
        public applicaitonUserId: number,
        public publishDate: Date,
        public updateDate: Date,
        public isEditable: boolean = false,
        public daleteConfirm: boolean = false,
        public isReplying: boolean = false,
        public comments: BlogCommentViewModel[]
        ){
    }
}