import { handleAddGroup, handleCloseDialog, handleSaveGroups } from "../functions/groupHandlers";
import { renderGroupList } from "./renderGroups";

const SIDEBAR_GROUPS_TEMPLATE: string = `
<dialog id="groupsDialog" class="dialogMenu">
    <div class="dialogMenu__wrapper">
        <div class="dialogMenu__header">
            <h3>Группы контактов</h3>
            <img class="btn_close" src="/close_gray.svg" alt="close" id="closeGroupsDialog"/>
        </div>

        <ul id="group__list" class="group__list"></ul>

        <div class="group__buttons">
            <button id="btnAddGroup" class="btn_add">Добавить</button>
            <button id="btnSaveGroups" class="btn_save">Сохранить</button>
        </div>
    </div>
</dialog>
`;

document.querySelector<HTMLDialogElement>('#app')!.insertAdjacentHTML("beforeend", SIDEBAR_GROUPS_TEMPLATE);

const list = document.querySelector<HTMLUListElement>("#group__list");

if(list){
    renderGroupList(list)
}

const btnAddGroup = document.querySelector<HTMLButtonElement>('#btnAddGroup')
const btnSaveGroups = document.querySelector<HTMLButtonElement>('#btnSaveGroups')
const btnCloseGroupsDialog = document.querySelector<HTMLImageElement>('#closeGroupsDialog');

btnAddGroup?.addEventListener('click', ()=>{handleAddGroup(list)})
btnSaveGroups?.addEventListener('click', ()=>{
    if(handleSaveGroups() && list){
        renderGroupList(list)
    }
});
btnCloseGroupsDialog?.addEventListener('click', handleCloseDialog)