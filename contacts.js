const fs = require("fs").promises;
const path = require("path");
const { v4: id } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);

    return console.table(parsedContacts);
  } catch (error) {
    return console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);

    const contactById = parsedContacts.find(
      (contact) => contact.id === contactId.toString()
    );

    return console.log(contactById);
  } catch (error) {
    return console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);

    const newList = parsedContacts.filter(
      (contact) => contact.id !== contactId.toString()
    );
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newList, null, "\t"),
      "utf8"
    );

    const contactsAfterRemove = await fs.readFile(contactsPath, "utf8");

    return console.table(JSON.parse(contactsAfterRemove));
  } catch (error) {
    return console.error(error);
  }
}

async function addContact(name, email, phone) {
  const newContact = { id: id(), name, email, phone };

  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);

    const newList = [...parsedContacts, newContact];
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newList, null, "\t"),
      "utf8"
    );
    return console.table(newList);
  } catch (error) {
    return console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
