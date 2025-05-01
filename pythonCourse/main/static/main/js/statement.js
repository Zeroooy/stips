function createJson(){
    // ИНФОРМАЦИЯ
    var information = {
        "achievements": [],
        "fio": document.getElementById("input-field-fio").value,
        "inst": document.getElementById("input-field-inst").value,
        "phone": document.getElementById("input-field-phone").value,
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