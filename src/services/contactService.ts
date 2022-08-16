import Success from "../domain/Success";
import { Contact,ContactBeforeUpload,ContactToUpdate } from "../domain/Contact";
import logger from "../misc/logger";
import ContactModel from "../models/ContactModel";
import fs from 'fs';
import {v2 as cloudinary} from "cloudinary";

export const getAllContacts = async():Promise<Success<Contact>>=>{
    logger.info("Getting all contacts");
    const allContacts = await ContactModel.getAllContacts();
    return{
        data:allContacts,
        message:"Contacts festched successfully"
    }

}

export const getContactById = async(id:number):Promise<Success<Contact>>=>{
    logger.info("Getting contact by ID");
    const contact = await ContactModel.getContactById(id);
    return{
        data:contact,
        message:"Contact fetched successfully"
    }
}

export const getContactByName = async(name:string):Promise<Success<Contact>>=> {
logger.info("Getting contact by name");
const contact = await ContactModel.getContactByName(name);
return{
    data:contact,
    message:"Contact fetched sucessfully"
}    
}

export const createContact = async (
    contact: ContactBeforeUpload,
    filePath: string
  ): Promise<Success<Contact>> => {
    logger.info("Creating a new contact!!");
  
    try {
      // checks if the file exists
      if (!fs.existsSync(filePath)) {
        throw new Error("File not found!!");
      }
  
      // uploads the image to cloudinary
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: "image",
        use_filename: true,
        width: 500,
        height: 500,
        crop: "limit",
      });
  
      // Delets the file from the server
    //   fs.unlinkSync(filePath);
  
      // Create a new contact on the database
      const newContact = await ContactModel.createContact({
        ...contact,
        photo: result.url,
        
      });
  
      return {
        data: newContact,
        message: "Successfully created a contact",
      };
    } catch (error) {
      // Logs the error
      logger.error(error);
  
      // Deletes the file from the server
      fs.unlinkSync(filePath);
  
      return {
        message: "Could not create the contact!!",
      };
    }
  };


  export const updateContact = async (
    contact: ContactToUpdate,
    filePath: string
  ): Promise<Success<Contact>> => {
    logger.info("Getting contact by id!!");
  
    try {
      // checks if the file exists
      if (!fs.existsSync(filePath)) {
        throw new Error("File not found!!");
      }
  
      // uploads the image to cloudinary
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: "image",
        uplad_preset: "contact-manager",
        use_filename: true,
        invalidate: true,
      });
  
      // Delets the file from the server
      fs.unlinkSync(filePath);
  
      // Create a new contact on the database
      const updatedContact = await ContactModel.updateContact({
        ...contact,
        photo: result.url,
       
      });
  
      return {
        data: updatedContact,
        message: "Successfully updated a contact",
      };
    } catch (error) {
      // Logs the error
      logger.error(error);
  
      // Deletes the file from the server
      fs.unlinkSync(filePath);
  
      return {
        message: "Could not update the contact!!",
      };
    }
  };


export const deleteContact = async(id:number):Promise<Success<Contact>>=>{
    logger.info("Deleting contact");
     await ContactModel.deleteContact(id);
    return{
        message:"Contact deleted successfully"
    }
}