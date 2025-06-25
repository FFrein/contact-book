import { rotate } from "../functions/any"

export function renderDropDown(parentHTML: HTMLElement, dropdown_text:string, popupId:string, dropdownId:string, renderUl:Function) {
    parentHTML.insertAdjacentHTML('beforeend',
        `
        <div class="dropdown__wrapper">
            <div id="${dropdownId}" class="dropdown">
                <input id="${dropdownId}_input" class="dropdown__input" placeholder="${dropdown_text}" readonly/>
                <img src="/arrow.svg" alt="open/close"/>
            </div>
            <div id="${popupId}" class="dropdown__popup">
            </div>
            <p id="${dropdownId}_error" class="message_error"></p>
        </div>
    `)

    const dropdown = document.querySelector<HTMLDivElement>(`#${dropdownId}`)
    const popup = document.querySelector<HTMLDivElement>(`#${popupId}`)
        
    dropdown?.addEventListener("click",changeVisibility);

    popup?.addEventListener("click",changeVisibility);

    function changeVisibility(){
        if(popup){
            const img = dropdown?.querySelector("img");
            if(img) rotate(img, 180);

            if (popup?.classList.contains("visible")) {
                popup.classList.remove("visible");
                popup.innerHTML = "";
            }
            else{
                renderUl();
                popup.classList.add("visible");
            }
        }
    }
}