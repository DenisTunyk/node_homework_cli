const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

function updateContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
}

function getAllContacts() {
  return listContacts();
}

async function getContactById(id) {
  const contacts = await listContacts();

  const contact = contacts.find((contact) => contact.id === id);

  return contact;
}

async function addContact(name, email, phone) {
  const newContact = { id: nanoid(8), name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const newContacts = contacts.filter((value) => value.id !== id);
  updateContacts(newContacts);
  return newContacts;
}

module.exports = {
  getAllContacts,
  addContact,
  getContactById,
  removeContact,
};
