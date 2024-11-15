document.addEventListener('DOMContentLoaded', loadContacts);

const contactForm = document.getElementById('contact-form');
const contactList = document.getElementById('contact-list');
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function loadContacts() {
    contactList.innerHTML = '';
    contacts.forEach((contact, index) => {
        const contactCard = document.createElement('div');
        contactCard.classList.add('contact-card');
        contactCard.innerHTML = `
            <p><strong>Nombre:</strong> ${contact.name}</p>
            <p><strong>Teléfono:</strong> ${contact.phone}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Dirección:</strong> ${contact.address}</p>
            <button onclick="editContact(${index})">Editar</button>
            <button onclick="deleteContact(${index})">Eliminar</button>
        `;
        contactList.appendChild(contactCard);
    });
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    if (!name || !phone || !email || !address) {
        alert('Por favor, complete todos los campos');
        return;
    }

    const newContact = { name, phone, email, address };
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));

    contactForm.reset();
    loadContacts();
});

function editContact(index) {
    const contact = contacts[index];
    
    document.getElementById('name').value = contact.name;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('email').value = contact.email;
    document.getElementById('address').value = contact.address;
    
    const submitButton = document.getElementById('submit-button');
    submitButton.textContent = 'Actualizar Contacto';
    
    contactForm.onsubmit = function (e) {
        e.preventDefault();
        
        contact.name = document.getElementById('name').value;
        contact.phone = document.getElementById('phone').value;
        contact.email = document.getElementById('email').value;
        contact.address = document.getElementById('address').value;
        
        localStorage.setItem('contacts', JSON.stringify(contacts));

        contactForm.reset();
        loadContacts();
        submitButton.textContent = 'Agregar Contacto';
        contactForm.onsubmit = addContact;
    };
}

function deleteContact(index) {
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    loadContacts();
}
