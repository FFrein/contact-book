import { rotate } from "../functions/any";
import { handleDeleteContact, handleEditContact } from "../functions/contactsHandlers";
import { Contact, ContactsGroup, DataStorage } from "../types/types";

export function renderContacts(){
    const contacts: Array<Contact> = DataStorage.loadContacts();
    const groups = DataStorage.loadGroups();
    const contactHTML = document.querySelector<HTMLDivElement>("#contacts");

    if(contactHTML){
        contactHTML.innerHTML = ``;
    } else {
        document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', 
        `<div class="contacts___wrapper">
            <div id="contacts" class="contacts"></div>
        </div>`);
    }

    let contactGroups = groupContactGroups(contacts, groups);

    if(contactGroups.length > 0){
        renderContactsGroup(contactGroups as Array<ContactsGroup>);
    } else {
        const contactsHTML = document.querySelector<HTMLDivElement>('#contacts');
        if(contactsHTML){
            contactsHTML.innerHTML = `<p class="contact_list_empty">Список контактов пуст</p>`;
        }
    }
}

function groupContactGroups(contacts: Array<Contact>, groups: Array<{name: string}>): Array<ContactsGroup> {
  const contactGroups: ContactsGroup[] = groups.map(group => {
    const groupContacts = contacts.filter(contact => contact.group === group.name);
    return new ContactsGroup(group.name, groupContacts);
  });

  return contactGroups;
}

function renderContactsGroup(groupContacts: Array<ContactsGroup>){
    const contactsHTML = document.querySelector<HTMLDivElement>('#contacts');
    if(!contactsHTML) return;

    contactsHTML.innerHTML = ''; 

    for(let group of groupContacts){
        const div = document.createElement('div');
        div.classList.add("contact-block");
        div.id = `div-${group.name}`;
        div.insertAdjacentHTML('beforeend',`
           <div class="contact-block__header">
                <h4>${group.name}</h4>
                <button id="btn_${group.name}" class="btn_show">
                    <img src="/arrow.svg" alt="open/close"/>
                </button>
           </div>
           <ul class="contact-block__items">
           </ul>
        `);

        const ul = div.querySelector("ul");
        if(ul) ul.style.overflow = 'visible';

        if(group.contacts.length === 0){
            ul?.insertAdjacentHTML('beforeend', `<li class="contact-block__item contact-block__no-contacts">Нет контактов</li>`);
        } else {
            for(let contact of group.contacts){
                const li = document.createElement('li');
                li.classList.add("contact-block__item");
                li.id = `number_${contact.phone}`;

                li.innerHTML = `
                    <p class="contact-block__item_name">${contact.name}</p>
                    <div class="contact-block__item_block">
                        <p class="contact-block__item_phone">${contact.phone}</p>
                        <div class="contact-block__item_buttons">
                            <button id="btn_edit" class="btn_edit"><img src="/edit_gray.svg" alt="edit"/></button>
                            <button id="btn_delete" class="btn_delete"><img src="/trash_gray.svg" alt="delete"/></button>
                        </div>
                    </div>
                `;

                li.querySelector("#btn_delete")?.addEventListener('click', ()=>{handleDeleteContact(contact.phone)});
                li.querySelector("#btn_edit")?.addEventListener('click', ()=>{handleEditContact(`number_${contact.phone}`)});;
                ul?.appendChild(li);
            }
        }
        
        contactsHTML.appendChild(div);

        div?.addEventListener('click',()=>{
            if(ul){
                handleChangeVisibility(ul)
                const div = document?.getElementById(`div-${group.name}`);
                const img = div?.querySelector("img");

                if(img){
                    rotate(img, 180);
                    div?.querySelector("h4")?.classList.toggle("Active");
                } 
            }
        })
    }
}

function handleChangeVisibility(element: HTMLUListElement) {
    if (element.classList.contains("visible")) {
        element.style.maxHeight = element.scrollHeight + 'px';
        requestAnimationFrame(() => {
            element.style.maxHeight = '0';
            element.style.opacity = '0';
            element.style.marginTop = '0';
            
        });
        element.classList.remove("visible");
    } else {
        element.style.maxHeight = '0';
        element.style.opacity = '0';
        element.style.marginTop = '0';
        element.classList.add("visible");
        requestAnimationFrame(() => {
            element.style.maxHeight = element.scrollHeight + 'px';
            element.style.opacity = '1';
            element.style.marginTop = '24px';
        });
    }
}