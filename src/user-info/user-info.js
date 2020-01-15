class UserInfo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    set setUserInfo(userDetails) {
        this.shadowRoot.innerHTML = `
            <style> @import "./src/user-info/style.css"; </style>
            <img src="${userDetails.picture.large}" alt="" />
            <h3>${userDetails.name.first} ${userDetails.name.last}</h3>
            <p>${userDetails.email}</p>
            <p>${userDetails.phone}</p>
        `;
    }

    set setListUserInfo(element) {
        this.shadowRoot.innerHTML = `
        <style> @import "./src/user-info/style.css"; </style>
        <figure>
        <div class="card">
        <div class="container">
                <img src="${element.picture.large}" alt="${element.gender}">
                <figcaption>
                    <p class="text">${element.name.title}. ${element.name.first} ${element.name.last}</p>
                </figcaption>
                </div>
            </div>
        </figure>
        `;
    }
}
customElements.define("wc-user-info", UserInfo);
