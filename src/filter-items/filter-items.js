class FilterItems extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    set setNavItem(userDetails) {
        if (userDetails.length !== 0) {
            this.shadowRoot.innerHTML = `
                <style> @import "./src/filter-items/style.css"; </style>
                <nav>
                    <ul>
                    </ul>
                </nav>
            `;

            const nav = this.shadowRoot.querySelector("nav ul");

            userDetails.forEach(element => {
                console.log(element.name);
                const navElement = document.createElement("li");

                if (element.active) {
                    navElement.setAttribute("class", "active");
                    this.setAttribute("filter", element.filter);
                }

                navElement.innerText = element.name;

                navElement.addEventListener("click", () => {
                    if (!navElement.hasAttribute("class")) {
                        const currentActiveTab = this.shadowRoot.querySelector(
                            ".active"
                        );

                        currentActiveTab.removeAttribute("class");

                        navElement.setAttribute("class", "active");

                        this.setAttribute("filter", element.filter);
                    }
                });

                nav.appendChild(navElement);
            });
        }
    }
}
customElements.define("wc-filter-items", FilterItems);
