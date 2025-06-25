import Logo from '/contact-book.svg'

document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', 
    `
    <header class="header__wrapper">
        <div class="header">
            <div class="header__logo">
                <img src="${Logo}"/>
                <p>Книга контактов</p>
            </div>
            <nav class="header__nav">
                <button class="btn_contacts">
                    <p>Добавить контакт</p>
                    <img src="plus_white.svg" alt="+"/>
                </button>
                <button class="btn_groups">
                    <p>Группы<p>
                </button>
            </nav>
        </div>
    </header>
    `
);

function openDialog(dialogId:string) {
    const groupsDialog = document.querySelector<HTMLDialogElement>(dialogId)!;

    if(groupsDialog){
        groupsDialog.showModal();
    }
}

const btnGroups = document.querySelector<HTMLButtonElement>('.btn_groups')!;
btnGroups.addEventListener('click', ()=>{
    openDialog('#groupsDialog')
});

const btnContacts = document.querySelector<HTMLButtonElement>('.btn_contacts')!;
btnContacts.addEventListener('click', ()=>{
    openDialog('#contactsDialog')
});