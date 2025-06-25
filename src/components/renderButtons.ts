export function renderButtons(){
const TEMPLATE = `
    <button class="btn_contacts btn_big">
        <p>Добавить контакт</p>
        <img src="plus_white.svg" alt="+"/>
    </button>`;

    document.querySelector<HTMLDialogElement>('#app')!.insertAdjacentHTML("beforeend", TEMPLATE);
}