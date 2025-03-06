function login() {
    var t1 = document.getElementById("login-input").value
    var t2 = document.getElementById("password-input").value
    if(t1 != ""){
        if(t2 != ""){

            let json = {
                login: t1,
                password: t2
            }

            HttpRequestPostJson('signIn', function (request) {

                if (request.answer != false) {
                    sessionStorage.setItem('sessionId', request.answer)
                    getRole()


                }else{
                    red_flag("password-input")
                    red_flag("login-input")
                }

            }, json)
        }else red_flag("password-input")
    }else red_flag("login-input")
}
function getRole() {
    const sessionId = sessionStorage.getItem('sessionId');

    if (sessionId) {
        let json = { session: sessionId };

        HttpRequestPostJson('getRole', function (request) {
            const role = request.answer;

            if (role) {
                // ✅ Сохраняем роль в sessionStorage
                sessionStorage.setItem('userRole', role);

                // ✅ Перенаправляем пользователя в нужный раздел
                if (role === "Administrator") {
                    window.location.href = '/adminpanel';
                } else if (role === "Student") {
                    window.location.href = '/studentmain';
                } else if (role === "Jury") {
                    window.location.href = '/jurymain';
                } else if (role.startsWith("Inspector")) {
                    window.location.href = '/inspectormain';
                } else {
                    alert("Ошибка: неизвестная роль пользователя");
                    console.error("Неизвестная роль: " + role);
                }
            } else {
                alert("Ошибка получения роли.");
            }
        }, json);
    } else {
        alert("Сессия не найдена, пользователь не авторизован.");
    }
}


