import db from "../db/db";

import { Contact, ContactToInsert } from "../domain/Contact";

class ContactModel {
  public static table = "contacts";

  public static async getAllContacts(id: number) {
    const allContacts = await db(ContactModel.table)
      .select(
        "id",
        "name",
        "contact",
        "email",
        "address",
        "photo",
        "is_favourite"
      )
      .where({ user_id: id })
      .orderBy("is_favourite", "desc")
      .orderBy("name", "desc");
    return allContacts;
  }

  public static async getContactById(id: number) {
    const contacts = await db(ContactModel.table).where({ id }).first();

    return contacts;
  }

  public static async getContactByName(name: string) {
    const contact = await db(ContactModel.table).where({ name }).first();

    return contact;
  }

  public static async createContact(contact: ContactToInsert) {
    const newContact = await db(ContactModel.table)
      .insert(contact)
      .returning("*");

    return newContact;
  }

  public static async updateContact(contact: Contact) {
    const updatedContact = await db(ContactModel.table)
      .where({ id: contact.id })
      .update(contact)
      .returning("*");

    return updatedContact;
  }

  public static async deleteContact(id: number) {
    await db(ContactModel.table).where({ id }).delete();

    return;
  }
}

export default ContactModel;
