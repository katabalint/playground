class UserList extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style> @import "./src/user-list/style.css"; </style>
        `;
    }

    _renderList(userList) {
        userList = userList.results ? userList.results : userList;
        userList.forEach(element => {
            const listUserInfo = document.createElement("wc-user-info");
            const userDetailsButton = document.createElement("button");
            const userModal = document.createElement("wc-modal");

            userDetailsButton.innerText = "Show Speaker Details";
            userDetailsButton.classList.add("btn");
            listUserInfo.setListUserInfo = element;

            userDetailsButton.addEventListener("click", () => {
                this.root.appendChild(userModal);
                if (!userModal.isOpen) {
                    userModal.open(element);
                    console.log("Opening...");
                }
            });

            this.root.appendChild(listUserInfo);
            this.root.appendChild(userDetailsButton);
        });
    }

    _removeCurrentList() {
        this.shadowRoot.innerHTML = `
            <style> @import "./src/user-list/style.css"; </style>
        `;
    }

    set setUserList(userList) {
        this._renderList(userList);
    }

    set updateUserList(userList) {
        this._removeCurrentList();
        this._renderList(userList);
    }
}

customElements.define("wc-user-list", UserList);
