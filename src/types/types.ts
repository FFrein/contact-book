import { renderContacts } from "../components/renderContacts";

  export interface dbElement{
      name:string;
  }

  export class Contact implements dbElement{
      constructor(phone:string, name:string, group:string){
          this.name = name
          this.phone = phone;
          this.group = group
      }
      name:string;
      phone: string;
      group:string;
  }

  export class Group implements dbElement{
      constructor(name:string){
          this.name = name
      }
      name:string;
  }

  export class ContactsGroup implements dbElement {
      constructor(name:string, contacts:Array<Contact>){
          this.name = name
          this.contacts = contacts || [];
      }
      name:string;
      contacts: Array<Contact>;
  }

  export class DataStorage {
    static loadGroups(): Group[] {
      return JSON.parse(localStorage.getItem("groups") || "[]");
    }
    static saveGroups(groups: Group[]): void {
      localStorage.setItem("groups", JSON.stringify(groups));
      renderContacts();
    }

    static deleteGroupByName(name:string):void{
      let data = this.loadGroups();
      data = data.filter(e=> e.name != name);
      let contacts = this.loadContacts();
      contacts = contacts.filter(e=>e.group != name)
      this.saveContacts(contacts)
      this.saveGroups(data)
    }

    static loadContacts(): Contact[] {
      return JSON.parse(localStorage.getItem("contacts") || "[]");
    }

    static FindContactByPhone(phone:string): Contact {
      let data = this.loadContacts();
      data = data.filter(e=> e.phone === phone);
      return data[0];
    }

    static EditContact(oldPhone:string, updatedContact:Contact): void {
      let data = this.loadContacts();
      data = data.filter(e=> e.phone != oldPhone);
      data.push(updatedContact);
      localStorage.setItem("contacts", JSON.stringify(data));
      renderContacts();
    }

    static saveContacts(contacts: Contact[]): void {
      localStorage.setItem("contacts", JSON.stringify(contacts));
      renderContacts();
    }

    static deleteContactByPhone(phone:string):void{
      let data = this.loadContacts();
      data = data.filter(e=> e.phone != phone);
      localStorage.setItem("contacts", JSON.stringify(data));
    }
  }