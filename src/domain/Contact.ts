export interface Contact{
    id:number;
    name:string;
    contact:string;
    email:string;
    address:string;
    photo:string;
    is_favourite:boolean;
    user_id:number
}

export type ContactToInsert = Omit<Contact,"id">;

export type ContactBeforeUpload = Omit<
  Contact,
  "id" | "photo" 
>;

export type ContactToUpdate = Omit<Contact, "photo">;

