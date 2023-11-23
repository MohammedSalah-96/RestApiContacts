const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");
/* req =>  It represents the incoming HTTP request from the client, containing information such as parameters, headers, and the request body */
/* res =>  It is the object used to send back the HTTP response to the client */

//@desc Get All Contacts
//@route GET /api/contacts
//@access Public
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc Get Single Contacts
//@route GET /api/contacts/:id
//@access Public
const getSingleContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not Found");
  }
  res.status(200).json(contact);
});

//@desc POST Contact
//@route POST /api/contacts
//@access Public
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All Fields Are Mandatory");
  }

  const addContact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(addContact);
});

//@desc Update Contact
//@route PUT /api/contacts/:id
//@access Public
const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Contact For ${req.params.id}` });
});

//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access Public
const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Contact Number ${req.params.id}` });
});

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
};
