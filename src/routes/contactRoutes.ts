import {Router} from "express";
import upload from "../config/multer";
import * as contactController from "../controllers/contactController";


const router = Router();

router.get('/',contactController.getAllContacts);
router.get('/:id',contactController.getContactById);
router.get('/:name',contactController.getContactByName);
router.post('/',upload.single("photo"),contactController.createContact);
router.put(
    "/:id",
    upload.single("photo"),
    contactController.updateContact
  );
router.delete('/:id',contactController.deleteContact);

export default router;