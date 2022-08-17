import { Request,Response,NextFunction } from "express";
import * as contactService from "../services/contactService";



export const getAllContacts = (req:Request,res:Response,next:NextFunction)=>{
  const {id}  = req.body;
    contactService.getAllContacts(+id)
    .then(data => res.json(data))
    .catch(err => next(err))
}

export const getContactById = (req:Request,res:Response,next:NextFunction)=>{
    const {id} = req.params;
    contactService.getContactById(+id)
    .then((data)=>res.json(data))
    .catch((err) => next(err))
}

export const getContactByName = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name } = req.body;
    contactService
      .getContactByName(name)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  };

  export const createContact = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name, contact, email, address, user_id, is_favourite } = req.body;
    const fileString = req.file?.path as string;
  
    contactService
      .createContact(
        {
          name,
          contact,
          email,
          address,
          user_id,
          is_favourite,
        },
        fileString
      )
      .then((data) => res.json(data))
      .catch((error) => next(error));
  };
  
  
  export const updateContact = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {
      id,
      name,
      contact,
      email,
      address,
      user_id,
      is_favourite,
    } = req.body;
    const fileString = req.file?.path as string;
    contactService
      .updateContact(
        {
          id,
          name,
          contact,
          email,
          address,
          user_id,
          is_favourite,
        },
        fileString
      )
      .then((data) => res.json(data))
      .catch((error) => next(error));
  };
  

  export const deleteContact = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    contactService
      .deleteContact(+id)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  };