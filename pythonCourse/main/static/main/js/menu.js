is_correct_session()

function update() {
    let json = {
        session: sessionStorage.getItem('sessionId')
    }

    HttpRequestPostJson('GetListCourses', function (request) {
        if (!request || !request.coursesImgs) {
            document.getElementsByClassName("main-container-select")[0].innerHTML = '<div class="container-course">Ошибка загрузки курсов</div>';
            return;
        }

        var block = "";
        for (var i = 0; i < request.coursesImgs.length; i++) {
            if(request.coursesImgs[i] == "") block += '<div class="container-course container-course-d" onclick="course(' + i + ')"><img class="container-course-img" src="static/main/img/no_photo.png"><div class="container-course-dop"><div class="container-course-title">' + request.coursesTitles[i] + '</div><div class="container-course-desc">' + request.coursesDiscs[i] + '</div></div></div>'
            else block += '<div class="container-course container-course-d" onclick="course(' + i + ')"><img class="container-course-img" src="' + request.coursesImgs[i] + '"><div class="container-course-dop"><div class="container-course-title">' + request.coursesTitles[i] + '</div><div class="container-course-desc">' + request.coursesDiscs[i] + '</div></div></div>'
        }
        if (block == "") {
            block = '<div class="container-course">У вас нет доступных курсов</div>'
        }
        document.getElementById("s-c").innerHTML = block;


        HttpRequestPostJson('IsAdmin', function (request) {
            if (request.answer != "true") {
                document.getElementById("admin-panel").remove()
            } else {
                document.getElementById("admin-panel").style.display = "block"
            }

        }, json)
    }, json)
}

update();

function course(i) {
    sessionStorage.setItem('numberCourse', i);
    window.location.href = '/course'
}