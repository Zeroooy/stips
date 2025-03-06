document.addEventListener("DOMContentLoaded", function () {
    // Получаем sessionId и роль из sessionStorage
    const sessionId = sessionStorage.getItem("sessionId");
    const userRole = sessionStorage.getItem("userRole");

    // Получаем текущий URL страницы
    const currentPage = window.location.pathname.toLowerCase();

    // Страницы, которые требуют авторизации
    const protectedPages = {
        "/adminpanel": "Administrator",
        "/adminpanelcache": "Administrator",
        "/adminpaneldata": "Administrator",
        "/adminpanellog": "Administrator",
        "/adminpanelstatments": "Administrator",
        "/adminpaneluser": "Administrator",
        "/adminpanelusers": "Administrator",

        "/studentmain": "Student",
        "/studentmenu": "Student",
        "/studentstatment": "Student",

        "/jurymain": "Jury",
        "/jurymenu": "Jury",
        "/jurystatment": "Jury",

        "/inspectormain": [
            "Inspector studies",
            "Inspector science",
            "Inspector activities",
            "Inspector culture",
            "Inspector sport"
        ],
        "/inspectormenu": [
            "Inspector studies",
            "Inspector science",
            "Inspector activities",
            "Inspector culture",
            "Inspector sport"
        ],
        "/inspectorstatment": [
            "Inspector studies",
            "Inspector science",
            "Inspector activities",
            "Inspector culture",
            "Inspector sport"
        ]
    };

    // Проверяем, требует ли текущая страница авторизации
    for (const [page, allowedRoles] of Object.entries(protectedPages)) {
        if (currentPage.startsWith(page)) {
            // Если нет sessionId – выкидываем на login
            if (!sessionId) {
                alert("Вы не авторизованы! Войдите в систему.");
                window.location.href = "login";
                return;
            }

            // Проверка роли (если роль не совпадает с нужной)
            if (Array.isArray(allowedRoles)) {
                if (!allowedRoles.includes(userRole)) {
                    alert("Недостаточно прав!");
                    window.location.href = "login";
                }
            } else {
                if (userRole !== allowedRoles) {
                    alert("Недостаточно прав!");
                    window.location.href = "login";
                }
            }
        }
    }
});
