export class ApplicationUserCreate {

    constructor(
        public username: string,
        public possword: string,
        public email: string,
        public fullname?: string,
        ){
    }
}