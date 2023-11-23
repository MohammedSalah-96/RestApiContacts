const express = require("express");
const {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const router = express.Router();

router.route("/").get(getAllContacts).post(createContact);
router
  .route("/:id")
  .get(getSingleContact)
  .put(updateContact)
  .delete(deleteContact);

/* 
router.route("/").get(getAllContacts);
router.route("/:id").get(getSingleContact);
router.route("/").post(createContact);
router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact);
*/

module.exports = router;
