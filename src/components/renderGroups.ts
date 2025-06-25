import { handleDeleteGroup } from "../functions/groupHandlers";
import { Group, DataStorage } from "../types/types";
import { renderPopup } from "./renderPopup";

export function renderGroupList(listElement: HTMLElement) {
  const groups: Array<Group> = DataStorage.loadGroups();
  
  listElement.innerHTML = '';
  for (const group of groups) {
    listElement.insertAdjacentHTML("beforeend", `
      <div class="group__item">
        <p class="group__item_text">${group.name.replace(" ",`&nbsp`)}</p>
        <button id="delete_${group.name.replace(" ",`&nbsp`)}" class="btnDeleteGroup btn_delete"><img src="/trash_gray.svg" alt="delete"/></button>
      </div>
    `);

    document.getElementById(`delete_${group.name.replace(" ",`&nbsp`)}`)?.addEventListener('click', (e)=>{
      renderPopup(
        "Удалить группу?",
        "Вы уверены, что хотите удалить эту группу? Это приведет к удалению всех контактов, находящихся в этой группе.",
        ()=>{handleDeleteGroup(e)}
      )
    })
  }
}