import { renderContacts } from "../components/renderContacts";
import { openContactsDialogWithData } from "../components/sidebarContacts";
import { showToast } from "../components/toast";
import { Contact, DataStorage } from "../types/types";
import { groupValidator } from "../validators/contacts";

export function handleCloseDialog(): void {
    const contactsDialog = document.querySelector<HTMLDialogElement>('#contactsDialog')!;

    if(contactsDialog){
        contactsDialog.close();
    }
}

export function handleSaveContact(currentEditingContactPhone?:string): void {
    const form = document.querySelector<HTMLDivElement>("#contacts__form");
    const FIO = form?.querySelector<HTMLInputElement>("#input_FIO");
    const phone = form?.querySelector<HTMLInputElement>("#input_Phone");
    const group = form?.querySelector<HTMLDivElement>('#dropdown-groups');
    const groupError = form?.querySelector<HTMLDivElement>('#dropdown-groups_error');
    const groupInput = group?.querySelector<HTMLInputElement>("input");

    if(groupInput && groupError && group){
        groupValidator(group, groupInput, groupError);
    }

    if(FIO && phone && groupInput && group){
        let contacts: Contact[] = DataStorage.loadContacts();

        const isFIOValid = FIO.value.trim().length > 0;
        const isGroupValid = groupInput.value !== "";
        const isPhoneValid = phone.value.length === 16;

        if(!isFIOValid || !isGroupValid || !isPhoneValid) {
            showToast("Заполнены не все поля или телефон введён некорректно");
            return;
        }

        if(currentEditingContactPhone) {
            if(phone.value !== currentEditingContactPhone) {
                const phoneExists = contacts.some(c => c.phone === phone.value);
                if(phoneExists) {
                    showToast("Данный номер телефона уже используется");
                    return;
                }
            }

            DataStorage.EditContact(
                currentEditingContactPhone,
                new Contact(phone.value, FIO.value, groupInput.value)
            );

            showToast("✅ Контакт изменён");
        } else {
            const isUnique = !contacts.some(e => e.phone === phone.value);

            if(!isUnique) {
                showToast("Данный номер телефона уже используется");
                return;
            }

            contacts.push(new Contact(phone.value, FIO.value, groupInput.value));
            DataStorage.saveContacts(contacts);

            showToast("✅ Контакт создан");
        }

        groupInput.value = "";
        phone.value = "";
        FIO.value = "";
    }
}

export function handleSelectGroup(name:string, dropdownId:string):void{
    const dropdown = document.querySelector<HTMLDivElement>(`#${dropdownId}`);
    let input = dropdown?.querySelector<HTMLInputElement>('input');

    if(input){
        input.value = name;
    }
}

export function handleDeleteContact(phone:string):void{
    DataStorage.deleteContactByPhone(phone);
    document.getElementById(`number_${phone}`)?.remove();
    showToast("✅ Контакт удалён");
    renderContacts();
}

export function handleEditContact(elementId: string): void {
    const li = document.getElementById(elementId);
    if (!li) return;

    const phoneElement = li.querySelector<HTMLParagraphElement>(".contact-block__item_phone");
    const nameElement = li.querySelector<HTMLParagraphElement>(".contact-block__item_name");

    if (!phoneElement || !nameElement) return;

    const contact = DataStorage.FindContactByPhone(phoneElement.innerText);
    if (!contact) {
        showToast(`Контакт не найден: phoneElement.innerText`)
        return;
    }

    openContactsDialogWithData(contact);
}