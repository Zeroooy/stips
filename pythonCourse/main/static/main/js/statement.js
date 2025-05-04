function createJson(){
    // ИНФОРМАЦИЯ
    var information = {
        "achievements": [],
        "fio": document.getElementById("input-field-fio").value,
        "inst": document.getElementById("input-field-inst").value,
        "phone": document.getElementById("input-field-phone").value,
        "mail": document.getElementById("input-field-mail").value,
        "group": document.getElementById("input-field-group").value,
        "agree": document.getElementById("agree-checkbox").value
    }
    document.querySelectorAll(".custom-checkbox").forEach(el => {
        if(el.checked == true){
            information["achievements"].push(el.value)
        }
    })

    if(information["achievements"].length == 0){ return }
    if(information["inst"] == ''){ return }
    if(information["phone"] == ''){ return }
    if(information["inst"] == ''){ return }
    if(information["group"] == ''){ return }
    if(information["agree-checkbox"] == 'off'){ return }

    console.log(information)



    // УЧЕБА
    var studies = {
        "onlyFive": document.getElementById("onlyFive").value,   // только ли пятерки?
        "list":{}
    }

    var a = [0, 1]
    a.forEach(el => {
        studies["list"][""+el] = []
        document.querySelectorAll(".frame-mid"+el).forEach(el_ => {
            giveEls(el_, studies["list"][""+el])
        })
    })


    console.log(studies)

    // НАУКА

    var science = {
        "list": {}
    }

    a = [2, 3, 4, 5, 6]
    a.forEach(el => {
        science["list"][""+el] = []
        document.querySelectorAll(".frame-mid"+el).forEach(el_ => {
            giveEls(el_, science["list"][""+el])
        })
    })



    console.log(science)


    // АКТИВНОСТЬ

    var activities = {
        "list": {}
    }

    a = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    a.forEach(el => {
        activities["list"][""+el] = []
        document.querySelectorAll(".frame-mid"+el).forEach(el_ => {
            giveEls(el_, activities["list"][""+el])
        })
    })

    console.log(activities)

    // КУЛЬТУРА

    var culture = {
        "list": {}
    }

    a = [19, 20, 21, 22, 23]
    a.forEach(el => {
        culture["list"][""+el] = []
        document.querySelectorAll(".frame-mid"+el).forEach(el_ => {
            giveEls(el_, culture["list"][""+el])
        })
    })

    console.log(culture)

    // СПОРТ

    var sport = {
        "list": {}
    }

    a = [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]
    a.forEach(el => {
        sport["list"][""+el] = []
        document.querySelectorAll(".frame-mid"+el).forEach(el_ => {
            giveEls(el_, sport["list"][""+el])
        })
    })

    console.log(sport)

    var json_ = {
        "information": information,
        "studies":studies,
        "science":science,
        "activities":activities,
        "culture":culture,
        "sport":sport,
    }


    const formData = new FormData();
    formData.append("session", sessionStorage.getItem('sessionId'));
    formData.append("json", JSON.stringify(json_));

    HttpRequestPostFormData('uploadStatement', function (response) {
        if (response.answer) {
        } else {
            console.error("Нет данных или ошибка запроса");
        }
    }, formData);
}



function giveEls(element, parent){
    var el = {}
    var mass = element.querySelectorAll(".el")
    for(let i = 0; i < mass.length; i++){
        if(mass[i].value == "") return
        el[""+(i+1)] = mass[i].value
    }
    parent.push(el)
}


const json = {
    session: sessionStorage.getItem('sessionId')
};

HttpRequestPostJson('getRole', function (response) {
    var blocks = document.querySelectorAll(".button-block")
    if (response.answer == "Administrator") {
        blocks[0].remove()
        blocks[1].remove()
        blocks[2].classList.remove("hidden")
    }else if (response.answer == "Student") {
        blocks[0].classList.remove("hidden")
        blocks[1].remove()
        blocks[2].remove()
    }else if (response.answer == "Jury") {
        blocks[0].remove()
        blocks[1].classList.remove("hidden")
        blocks[2].remove()
    }else if (response.answer == "Inspector studies" || response.answer == "Inspector science" || response.answer == "Inspector culture" || response.answer == "Inspector activities" || response.answer == "Inspector sport") {
        blocks[0].remove()
        blocks[1].classList.remove("hidden")
        blocks[2].remove()
    } else {
        console.error("Нет данных или ошибка запроса");
    }
}, json);



function rateStatment(){
    const statementId = new URLSearchParams(window.location.search).get("statementId");
    const json = {
        session: sessionStorage.getItem('sessionId'),
        "statement-id": statementId,
        mark: document.getElementById("points").value,
        comment: document.getElementById("comment").value,
    };

    HttpRequestPostJson('rateStatement', function (response) {
        if(response.answer == true){
            window.location.href='menu'
        }
    }, json)
}








document.querySelectorAll(".checkboxs").forEach(el => {
    el.addEventListener('change', function() {
        var blocks = []
        for(let i = 0; i < 51; i++){
            var frameMid = document.getElementsByClassName("frame-mid"+i)
            frameMid.forEach(el2 => {
                if(el2.querySelector(".checkboxs").checked == "on"){
                    blocks.append(i)
                }
            })
        }
        const json = {
            session: sessionStorage.getItem('sessionId'),
            blocks: blocks_,
        };

        HttpRequestPostJson('autoPoints', function (response) {
            if(response.answer == true){
                window.location.href='menu'
            }
        }, json)
    })
})

