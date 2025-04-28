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
        "project-works":[],    // Получение студентом в течении предыдущего года награды по проектной деятельности
        "wins-works":[]
    }

    document.querySelectorAll(".project-works").forEach(el => {
        studies["project-works"].push(
            {
                "level": el.querySelector(".work-select").value,   // уровень
                "name": el.querySelector(".work-input").value,   // название
                "date": el.querySelector(".work-input").value,   // дата
                "url": el.querySelector(".work-input").value    // ссылка
            })
    })

    document.querySelectorAll(".wins-works").forEach(el => {
        studies["wins-works"].push(
            {
                "level": el.querySelector(".work-select").value,   // уровень
                "name": el.querySelector(".work-input").value,   // название
                "date": el.querySelector(".work-input").value,   // дата
                "url": el.querySelector(".work-input").value    // ссылка
            })
    })


    // if(studies["onlyFive"] == ''){ return }

    // if(studies["project-works"].length == 0 && studies["wins-works"].length == 0){ studies = {} } // оптимизатор

    console.log(studies)





    // НАУКА


    var science = {
        "list": [],
    }

    document.querySelectorAll(".frame-mid2").forEach(el => {
        var els = el.querySelectorAll(".work-input")
        if(el.querySelector(".work-select").value != '' && el.querySelector(".work-criteria").value != '' && els[0].value != '' && els[1].value != '' && els[2].value != '' && els[3].value != '' && els[4].value != ''){
            science["list"].push({
                "criteria": el.querySelector(".work-criteria").value,   // критерий
                "criteria-concrete": el.querySelector(".work-select").value,   // название
                "type-document": els[0].value,   // вид
                "name": els[1].value,    // название
                "date": els[2].value,  // дата
                "place": els[3].value,  // место
                "url": els[4].value  // ссылка
            })
        }
    })



    console.log(science)




    // АКТИВНОСТЬ

    var elementsCount = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    var elements = []
    elementsCount.forEach(el => {
        elements.push(...document.querySelectorAll(".frame-mid"+el))
    })

    var activities = {
        "list": []
    }

    document.querySelectorAll(".frame-mid9").forEach(el => {
        var els = el.querySelectorAll(".work-input")
        if(el.querySelector(".form-participation").value != '' && els[0].value != '' && els[1].value != '' && els[2].value != '' && els[3].value != '' && els[4].value != '' && els[5].value != ''){
            activities["list"].push({
                "criteria": els[0].value,   // критерий
                "type-document": els[1].value,   // название
                "form-activities": el.querySelector(".form-participation").value,   // вид
                "name": els[2].value,    // название
                "date": els[3].value,  // дата
                "place": els[4].value,  // место
                "url": els[5].value  // ссылка
            })
        }
    })

    console.log(activities)

    // КУЛЬТУРА

    var culture = {
        "list": []
    }

    var elementsCount = [6, 7, 3, 4, 5]
    var elements = []
    elementsCount.forEach(el => {
        elements.push(...document.querySelectorAll(".frame-mid"+el))
    })

    elements.forEach(el => {
        var els = el.querySelectorAll(".work-input")
        if(el.querySelector(".forma-participation").value != '' && el.querySelector(".criteria-concrete").value != '' && els[0].value != '' && els[1].value != '' && els[2].value != '' && els[3].value != '' && els[4].value != ''){
            culture["list"].push({
                "forma-participation": el.querySelector(".forma-participation").value,   // критерий
                "criteria-concrete": el.querySelector(".criteria-concrete").value,   // название
                "form-document": els[0].value,   // вид
                "name": els[1].value,    // название
                "date": els[2].value,  // дата
                "organizator": els[3].value,  // место
                "url": els[4].value  // ссылка
            })
        }
    })








    console.log(culture)

    // СПОРТ

    var sport = {
        "list": [],
    }


    elementsCount = [15, 16]
    elements = []
    elementsCount.forEach(el => {
        elements.push(...document.querySelectorAll(".frame-mid"+el))
    })

    elements.forEach(el => {
        var els = el.querySelectorAll(".work-input")
        if(el.querySelector(".forma-participation").value != '' && el.querySelector(".criteria-concrete").value != '' && els[0].value != '' && els[1].value != '' && els[2].value != '' && els[3].value != '' && els[4].value != ''){
            sport["list"].push({
                "criteria": el.querySelector(".forma-participation").value,   // критерий
                "criteria-concrete": el.querySelector(".criteria-concrete").value,   // название
                "name": els[0].value,   // вид
                "date": els[1].value,    // название
                "place": els[2].value,  // дата
                "copy-protocol": els[3].value,  // место
                "copy-calendar": els[4].value  // ссылка
            })
        }
    })


    console.log(sport)

    var json = {
        "information": information,
        "studies":studies,
        "science":science,
        "activities":activities,
        "culture":culture,
        "sport":sport,
    }
    return json
}
