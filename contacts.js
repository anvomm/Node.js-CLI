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

    const contactById = parsedContacts.filter(({ id }) => id === contactId);

    if (contactById.length === 0) {
      return console.log(`There is no contact with id: ${contactId}`);
    }

    return console.table(contactById);
  } catch (error) {
    return console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);

    const newList = parsedContacts.filter(
      (contact) => contact.id !== contactId
    );

    if (parsedContacts.length === newList.length) {
      return console.log(`There is no contact with id: ${contactId} to remove`);
    }
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

    const nameToFind = parsedContacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    const emailToFind = parsedContacts.find(
      (contact) => contact.email.toLowerCase() === email.toLowerCase()
    );
    const phoneToFind = parsedContacts.find(
      (contact) => contact.phone === phone
    );

    if (nameToFind) {
      return console.log(`The contact named ${name} already exists`);
    };

    if (emailToFind) {
      return console.log(`The contact with email: ${email} already exists`);
    };

    if (phoneToFind) {
      return console.log(
        `The contact with phone number: ${phone} already exists`
      );
    };

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
