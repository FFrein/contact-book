import { showToast } from "../components/toast";
import { Group, DataStorage } from "../types/types";
import { uniqueId } from "./any";

export function handleAddGroup(list: HTMLElement | null): void { 
    const itemId = uniqueId();

    if(list){
        list.insertAdjacentHTML("beforeend",`
                <div class="group__item_new">  
                    <div class="group__item">
                        <input class="group__item_new__text placeholder="Введите название"/>
                        <button id="delete_${itemId}" class="btnDeleteGroup btn_delete">
                            <img src="/trash_gray.svg" alt="delete"/>
                        </button>
                    </div>
                    <p class="group__item_new__error"></p>
                </div>
                `)

    document.querySelector<HTMLButtonElement>(`#delete_${itemId}`)?.addEventListener('click', handleDeleteGroup)
            }
}
export function handleDeleteGroup(e: MouseEvent): void {
    const target = e.target as HTMLElement;

    const btn = target.parentElement

    if (btn) {
        const groupDiv = btn.parentElement;
        if (groupDiv?.className.includes("group__item")) {
            groupDiv.remove(); 
        }
        const groupName = groupDiv?.querySelector("p")?.innerText;
        if(groupName){
            DataStorage.deleteGroupByName(groupName)
            showToast("✅ Группа удалена");
        }
    }
}
export function handleSaveGroups(): boolean { 
    const updateGroups: Group[] = [];
    const seenNames = new Set<string>();
    let hasError = false;

    document.querySelectorAll<HTMLDivElement>('.group__item').forEach(el => {
        const name = (el.querySelector<HTMLInputElement>('input')?.value 
                || el.querySelector<HTMLParagraphElement>('p')?.innerText 
                || "").trim();

        const isInvalid = !name || seenNames.has(name);
        el.classList.toggle('group__item_error', isInvalid);

        if (isInvalid) {
            let errorBlock = el.parentNode?.querySelector<HTMLParagraphElement>(".group__item_new__error");

            if(errorBlock){
                errorBlock.classList.add("visible");
                if(name.length <= 0){
                    showToast("Неверно заполенны поля");     
                    errorBlock.innerText = "Поле не должно быть пустым";
                }else{
                    showToast("Названия должны быть уникальынми");   
                    errorBlock.innerText = "Название должно быть уникальным";
                }
            }

            if(!hasError){
                hasError = true;
            }
        } else {
            seenNames.add(name);
            updateGroups.push(new Group(name.replace(" ", '\u00A0')));
        }
    });

    if (!hasError) {
        DataStorage.saveGroups(updateGroups)
        showToast("✅ Группы добавлены");
        return true;
    }
    else{
         return false;
    }
}
export function handleCloseDialog(): void { 
    const groupsDialog = document.querySelector<HTMLDialogElement>('#groupsDialog')!;

    if(groupsDialog){
        groupsDialog.close();
    }
}