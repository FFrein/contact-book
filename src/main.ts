import './style.scss'

import "./components/header.ts"
import "./components/contactsList.ts"
import "./components/sidebarGroups.ts"
import "./components/sidebarContacts.ts"

window.addEventListener("resize", () => {
  location.reload();
});