export interface User{
    id:number,
    name:string,
    email:string,
    password:string
}

export type UserToInsert = Omit<User, 'id'>;
