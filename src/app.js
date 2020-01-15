window.addEventListener("load", () => {
    const usersEndpoint = "https://randomuser.me/api/?results=5";
    fetchUsers(usersEndpoint);
});

async function fetchUsers(url) {
    const res = await fetch(url);

    const usersList = await res.json();

    console.log("app.js => ", usersList);

    createContent(usersList);
}

function createContent(usersList) {
    const bodyEl = document.querySelector("body");

    const navItems = [
        { name: "Speakers", active: true, filter: "all" },
        { name: "Women", active: false, filter: "female" },
        { name: "Men", active: false, filter: "male" }
    ];

    const wcCountdown = document.createElement("wc-countdown");
    const wcNavItems = document.createElement("wc-filter-items");
    const wcUserList = document.createElement("wc-user-list");

    wcCountdown.setStartCountdown = 60;
    wcNavItems.setNavItem = navItems;
    wcUserList.setUserList = usersList;

    bodyEl.appendChild(wcCountdown);
    bodyEl.appendChild(wcNavItems);
    bodyEl.appendChild(wcUserList);

    setMutationObserver(wcNavItems, wcUserList, usersList);
}

function setMutationObserver(targetNode, wcUserList, usersList) {
    const config = { attributes: true, childList: false, subtree: false };

    const observer = new MutationObserver(() => {
        const filterAtr = document
            .querySelector("wc-filter-items")
            .getAttribute("filter");

        const result =
            filterAtr === "all"
                ? usersList
                : usersList.results.filter(user => user.gender === filterAtr);
        wcUserList.updateUserList = result;
    });

    observer.observe(targetNode, config);
}
