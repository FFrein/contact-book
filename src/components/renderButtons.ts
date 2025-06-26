export function renderButtons(){
const TEMPLATE = `
    <button id="btn_contacts_contactList" class="btn_contacts btn_big">
        <p>Добавить контакт</p>
        <img src="plus_white.svg" alt="+"/>
    </button>`;

    document.querySelector<HTMLDialogElement>('#app')!.insertAdjacentHTML("beforeend", TEMPLATE);

    const btnContacts = document.querySelector<HTMLButtonElement>('#btn_contacts_contactList')!;
    btnContacts.addEventListener('click', ()=>{
        const groupsDialog = document.querySelector<HTMLDialogElement>("#contactsDialog")!;

        if(groupsDialog){
            groupsDialog.showModal();
        }
    });
}