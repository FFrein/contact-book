export function renderPopup(title: string,text: string, onConfirm: Function) {
    const dialog = document.createElement("dialog");
    dialog.className = "popup";

    dialog.innerHTML = `
        <form method="dialog" class="popup__form">
            <h4 class="popup__title">${title}</h4>
            <p class="popup__text">${text}</p>
            <div class="popup__buttons">
                <button value="ok" class="btn_blue">Да, удалить</button>
                <button value="cancel" class="btn_reverse-blue">Отмена</button>
            </div>

            <button value="cancel" class="popup__exit"><img src="/close_gray.svg" alt="close"/></button>
        </form>
    `;

    document.body.appendChild(dialog);

    dialog.addEventListener("close", () => {
        if (dialog.returnValue === "ok") {
            onConfirm();
        }
        dialog.remove();
    });

    dialog.showModal();
}