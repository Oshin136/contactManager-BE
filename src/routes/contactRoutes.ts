import { Router } from "express";
import upload from "../config/multer";
import * as contactController from "../controllers/contactController";

const router = Router();

router.post("/", contactController.getAllContacts);
router.post("/add", upload.single("photo"), contactController.createContact);
router.get("/:id", contactController.getContactById);
router.get("/:name", contactController.getContactByName);
router.put("/:id", upload.single("photo"), contactController.updateContact);
router.delete("/:id", contactController.deleteContact);

export default router;
