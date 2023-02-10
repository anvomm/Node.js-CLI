const fs = require("fs").promises;
const path = require("path");
const { getMaxListeners } = require("process");
const { v4: id } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const list = JSON.parse(contacts);
    return console.table(list);
  } catch (error) {
    return console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const list = JSON.parse(contacts);
    const contactById = list.find(
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
    const list = JSON.parse(contacts);

    const newList = list.filter(
      (contact) => contact.id !== contactId.toString()
    );
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

async function addContact(name, email, phone) {
  const newContact = { id: id(), name, email, phone };

  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const list = JSON.parse(contacts);
    
    const newList = [...list, newContact];
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
    addContact
  };

/* listContacts();
  getContactById(3);
addContact('Anastassia Vomm', 'anvomm@gmail.com', 234567)

removeContact("07d10547-3fd4-42c2-8b3d-0aee2e7f8a0e"); */
