class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.isOpen = false;
        this.shadowRoot.innerHTML = `
            <style> @import "./src/modal/style.css"; </style>
            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <slot name="title">Speaker Details</slot>
                </header>
                <section id="main">
                    <slot></slot>
                </section>
                <section id="actions">
                    <button id="cancel-btn">Cancel</button>
                    <button id="confirm-btn">Okay</button>
                </section>
            </div>
        `;
        this._main = this.shadowRoot.querySelector("#main");
        const backdrop = this.shadowRoot.querySelector("#backdrop");
        const cancelBtn = this.shadowRoot.querySelector("#cancel-btn");
        const confirmbtn = this.shadowRoot.querySelector("#confirm-btn");
        backdrop.addEventListener("click", this._cancel.bind(this));
        cancelBtn.addEventListener("click", this._cancel.bind(this));
        confirmbtn.addEventListener("click", this._confirm.bind(this));
    }

    open(element) {
        const userInfo = document.createElement("wc-user-info");

        userInfo.setUserInfo = element;

        this._main.appendChild(userInfo);
        this.setAttribute("opened", "");
    }

    hide() {
        if (this.hasAttribute("opened")) {
            this.removeAttribute("opened");
            const user_info = this.shadowRoot.querySelector("wc-user-info");
            this._main.removeChild(user_info);
        }
        this.isOpen = false;
    }

    _cancel(event) {
        this.hide();
        const cancelEvent = new Event("cancel", {
            bubbles: true,
            composed: true
        });
        event.target.dispatchEvent(cancelEvent);
    }

    _confirm() {
        this.hide();
        const confirmEvent = new Event("confirm");
        this.dispatchEvent(confirmEvent);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.hasAttribute("opened")) {
            this.isOpen = true;
        } else {
            this.isOpen = false;
        }
    }

    static get observedAttributes() {
        return ["opened"];
    }
}

customElements.define("wc-modal", Modal);
