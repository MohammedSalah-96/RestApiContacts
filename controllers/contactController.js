const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");
const mongoose = require("mongoose");
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
  const id = req.params.id;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const contact = await Contact.findById(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404);
      throw new Error("Contact not Found");
    }
  } else {
    res.status(400);
    throw new Error("Not Valid ID");
  }
});

//@desc POST Contact
//@route POST /api/contacts
//@access Public
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(422);
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
  const id = req.params.id;
  const updatedData = req.body;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const contact = await Contact.findById(id);
    if (contact) {
      const update = await Contact.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      res.status(200).json(updatedData);
    } else {
      res.status(404);
      throw new Error("Contact not Found");
    }
  } else {
    res.status(400);
    throw new Error("Not Valid ID");
  }
});

//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access Public
const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const deletedData = await Contact.findOneAndDelete({ _id: id });
    if (deletedData) {
      res.status(200).json({ message: "Contact Removed", deletedData });
    } else {
      res.status(404);
      throw new Error("Contact not Found");
    }
  } else {
    res.status(400);
    throw new Error("Not Valid ID");
  }
});

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
};
