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
                    window.location.href = '/menu';
                }else{
                    red_flag("password-input")
                    red_flag("login-input")
                }

            }, json)
        }else red_flag("password-input")
    }else red_flag("login-input")
}



