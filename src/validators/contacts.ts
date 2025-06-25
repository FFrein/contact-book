import IMask from "imask";

export const maskOptionsTelephone = {
  mask: '+{7}(000)000-00-00'
};

export function phoneValidator(inputPhone :HTMLInputElement, errorPhone?:HTMLParagraphElement){
    const mask = IMask(inputPhone, maskOptionsTelephone);

    function validatePhone(): boolean {
        const rawValue = mask.unmaskedValue;
        if (rawValue.length !== 11 || !rawValue.startsWith('7')) {
            if(errorPhone) errorPhone.textContent = "Введите корректный номер";
            inputPhone.classList.add("input-error");
            return false;
        }
        if(errorPhone) errorPhone.textContent = "";
        inputPhone.classList.remove("input-error");
        return true;
    }
            
    inputPhone.addEventListener("blur", validatePhone);
}

export function groupValidator(group: HTMLDivElement,input: HTMLInputElement, error: HTMLParagraphElement) {
    function validate(): boolean {
        const value = input.value.trim();
        if (value.length === 0) {
            error.textContent = "Поле является обязательным";
            group.classList.add("input-error");
            return false;
        }
        error.textContent = "";
        group.classList.remove("input-error");
        return true;
    }

    validate();
    group.addEventListener("click", ()=>{error.textContent = ""; group.classList.remove("input-error")});
}   

export function fioValidator(input: HTMLInputElement, error?: HTMLParagraphElement) {
    function validate(): boolean {
        const value = input.value.trim();
        if (value.length === 0) {
            if(error) error.textContent = "Поле является обязательным";
            input.classList.add("input-error");
            return false;
        }
        if(error) error.textContent = "";
        input.classList.remove("input-error");
        return true;
    }

    input.addEventListener("blur", validate);
}