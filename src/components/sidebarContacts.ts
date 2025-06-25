import { handleCloseDialog, handleSaveContact, handleSelectGroup } from "../functions/contactsHandlers";
import { Group, DataStorage, Contact } from "../types/types";
import { fioValidator, phoneValidator } from "../validators/contacts";
import { renderDropDown } from "./renderDropDown";

const SIDEBAR_CONTACTS_TEMPLATE = `
<dialog id="contactsDialog" class="dialogMenu">
    <div class="dialogMenu__wrapper">
        <div class="dialogMenu__header">
            <h3>Добавление контакта</h3>
            <img class="btn_close" src="/close_gray.svg" alt="close" id="closeContactsDialog"/>
        </div>

        <div id="contacts__form" class="contacts__form">
            <div>
                <input type="text" id="input_FIO" class="input contacts__form-input" placeholder="Введите ФИО"/>
                <p id="input_FIO-error" class="message_error"></p>
            </div>
            
            <div>
                <input type="text" id="input_Phone" class="input contacts__form-input" placeholder="Введите номер"/>
                <p id="input_Phone-error" class="message_error"></p>
            </div>
        </div>

        <div class="contacts__buttons">
            <button id="btnSaveContact" class="btn_save">Сохранить</button>
        </div>
    </div>
</dialog>
`

document.querySelector<HTMLDialogElement>('#app')!.insertAdjacentHTML("beforeend", SIDEBAR_CONTACTS_TEMPLATE);

const contactsForm = document.querySelector<HTMLImageElement>('#contacts__form');
const dialog = document.querySelector<HTMLDialogElement>('#contactsDialog');
const inputPhone = document.querySelector<HTMLInputElement>("#input_Phone");
const errorPhone = document.querySelector<HTMLParagraphElement>("#input_Phone-error");
const inputFIO = document.querySelector<HTMLInputElement>("#input_FIO");
const errorFIO = document.querySelector<HTMLParagraphElement>("#input_FIO-error");
const input = document.querySelector<HTMLDivElement>("#dropdown-groups")?.querySelector<HTMLInputElement>("#dropdown-groups_input");
let title = dialog?.querySelector<HTMLParagraphElement>("h3");

let currentEditingContactPhone: string | undefined;

if(contactsForm){
    function renderGroupUl(){
        let dropdownPopup = document.querySelector<HTMLDivElement>("#dropdown-groups-popup")

        if(dropdownPopup){
            const items : Group[] = DataStorage.loadGroups();
            
            const ul = document.createElement('ul');

            items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.name;
                li.addEventListener('click', ()=>{
                    handleSelectGroup(item.name, "dropdown-groups")
                })
                ul.appendChild(li);
            });

            dropdownPopup?.appendChild(ul);
        }
    }

    renderDropDown(contactsForm, "Выберите группу", "dropdown-groups-popup", "dropdown-groups", renderGroupUl)
}

if(inputFIO && errorFIO){
    fioValidator(inputFIO,errorFIO);
}

if(inputPhone && errorPhone){
    phoneValidator(inputPhone,errorPhone);
}

const btnCloseContactsDialog = document.querySelector<HTMLImageElement>('#closeContactsDialog');
const btnSaveContact = document.querySelector<HTMLButtonElement>('#btnSaveContact');

btnCloseContactsDialog?.addEventListener('click', ()=>{
    handleCloseDialog();
    if(title)title.innerText = "Добавление контакта";
    currentEditingContactPhone=undefined;
    if(inputFIO) inputFIO.value = "";
    if(inputPhone) inputPhone.value = "";
    if(input) input.value = ""
})
btnSaveContact?.addEventListener('click', ()=>{
    handleSaveContact(currentEditingContactPhone)
})

export function openContactsDialogWithData(contact: Contact) {
    if (!dialog || !inputFIO || !inputPhone || !btnSaveContact || !title) return;

    dialog.showModal();

    inputFIO.value = contact.name;
    inputPhone.value = contact.phone;
    currentEditingContactPhone = contact.phone;
    title.innerText = "Редактирование контакта";
}