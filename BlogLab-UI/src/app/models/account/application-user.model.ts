export class ApplicationUser {

    constructor(
        public applicationUserId: number|null,
        public username: string|null,
        public fullname: string|null,
        public email: string|null,
        public token: string|null
        ){
    
        }
}