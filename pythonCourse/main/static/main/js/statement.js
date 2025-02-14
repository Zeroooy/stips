function createJson(){

    // УЧЕБА
    var studies = {
        "onlyFive": document.getElementById("onlyFive"),   // только ли пятерки?
        "project-work":{    // Получение студентом в течении предыдущего года награды по проектной деятельности
            "international": {
                "level": document.getElementById("project-work-international-level").value,   // уровень
                "name": document.getElementById("project-work-international-name").value,   // название
                "date": document.getElementById("project-work-international-date").value,   // дата
                "url": document.getElementById("project-work-international-url").value    // ссылка
            },
            "regional": {
                "level": document.getElementById("project-work-regional-level").value,   // уровень
                "name": document.getElementById("project-work-regional-name").value,   // название
                "date": document.getElementById("project-work-regional-date").value,   // дата
                "url": document.getElementById("project-work-regional-url").value    // ссылка
            },
            "university": {
                "level": document.getElementById("project-work-university-level").value,   // уровень
                "name": document.getElementById("project-work-university-name").value,   // название
                "date": document.getElementById("project-work-university-date").value,   // дата
                "url": document.getElementById("project-work-university-url").value    // ссылка
            }
        },
        "student-wins":{    # Признание студента победителем
            "international": {
                "level": document.getElementById("student-wins-international-level").value,  // уровень
                "name": document.getElementById("student-wins-international-name").value,  // название
                "date": document.getElementById("student-wins-international-date").value,  // дата
                "url": document.getElementById("student-wins-international-url").value  // ссылка
            },
            "regional": {
                "level": document.getElementById("student-wins-regional-level").value,  // уровень
                "name": document.getElementById("student-wins-regional-name").value,  // название
                "date": document.getElementById("student-wins-regional-date").value,  // дата
                "url": document.getElementById("student-wins-regional-url").value  // ссылка
            }
        }
    }



    // НАУКА

    var list_science = []
    for(var i = 0; i < 45;i++){
        list_science.append({
            "criteria": document.getElementById("science-wins-criteria-" + i).value,  // критерий
            "criteria-concrete": document.getElementById("science-criteria-concrete-" + i).value,  // конкретика критерия ДЛЯ А1 ["Диплом 1 степени", "Диплом 2 степени", "Диплом 3 степени"]
            "type-document": document.getElementById("science-type-document-" + i).value,  // вид документов ДЛЯ А1["Копия диплома"]

            "name": document.getElementById("science-name-" + i).value,  // название
            "date": document.getElementById("science-date-" + i).value,  // дата
            "place": document.getElementById("science-place-" + i).value,  // место
            "url": document.getElementById("science-url-" + i).value  // ссылка
        })
    }

    var science = {
        "list": list_science,
    }



    // АКТИВНОСТЬ

    var list_activities = []

    for(var i = 0; i < 81; i++){
        list_activities.append({
            "criteria-concrete": document.getElementById("activities-criteria-concrete-" + i).value,  // конкретика критерия
            "type-document": document.getElementById("activities-type-document-" + i).value,  // вид документов
            "form-activities": document.getElementById("activities-form-activities-" + i).value,  // название
            "name": document.getElementById("activities-name-" + i).value,  // название
            "date": document.getElementById("activities-date-" + i).value,  // дата
            "place": document.getElementById("activities-place-" + i).value,  // место
            "url": document.getElementById("activities-url-" + i).value,  // ссылочка
        })
    }
    var activities = {
        "list": list_activities
    }



    // КУЛЬТУРА

    var list_culture = []
        for(var i = 0; i < 45;i++){
            list_culture.append({
                "forma-participation": document.getElementById("culture-forma-participation-" + i).value,  // критерий
                "criteria-concrete": document.getElementById("culture-criteria-concrete-" + i).value,  // конкретика критерия
                "type-document": document.getElementById("culture-type-document-" + i).value,  // вид документов

                "name": document.getElementById("culture-name-" + i).value,  // название
                "date": document.getElementById("culture-date-" + i).value,  // дата
                "organizator": document.getElementById("culture-organizator-" + i).value,  // место
                "url": document.getElementById("culture-url-" + i).value  // ссылка
        })
    }

    var culture = {
        "list": list_culture
    }



    // СПОРТ

    var list_sport = []
    for(var i = 0; i < 139; i++){
        list_sport.append({
            "criteria": document.getElementById("sport-criteria-" + i).value,  // критерии
            "criteria-concrete": document.getElementById("sport-criteria-concrete-" + i).value,  // конкретика критерия
            "name": document.getElementById("sport-name-" + i).value,  // название
            "date": document.getElementById("sport-date-" + i).value,  // дата
            "place": document.getElementById("sport-place-" + i).value,  // место
            "copy-protocol": document.getElementById("sport-copy-protocol-" + i).value,  // копия протокола
            "copy-calendar": document.getElementById("sport-copy-calendar-" + i).value  // копия календаря
        })
    }
    var sport = {
        "list": list_sport,
    }




    json = {
        "studies":studies,
        "science":science,
        "activities":activities,
        "culture":culture,
        "sport":sport,
    }
    return json
}

/*

json = {

    "science":{
        "list": [
            "work": {  # Научная штука
                "criteria": ["(А.1) Получение наград",
                "(А.2) Получение благодарственных писем",
                "(А.3) Получение документов",
                "(А.4) Получение грантов",
                "(Б) Наличие публикации в научном издании"],  # критерий

                -------------------------------------------------------------------------------------------------------------------------

                "criteria-concrete": "",  # конкретика критерия ДЛЯ А1 ["Диплом 1 степени", "Диплом 2 степени", "Диплом 3 степени"]

                ДЛЯ А2 ["Федерального уровня (Министерство образования и науки РФ и ведомства)",
                "Регионального и городского уровня (Правительство ВО, Губернатор и мэр)",
                "Внутриуниверситетского уровня (ректор) - за работу в рамках хоздоговора, сумма договора до 50.000 на 1 студента",
                "Внутриуниверситетского уровня (ректор) - за работу в рамках хоздоговора, сумма договора 51.000 - 100.000 на 1 студента",
                "Внутриуниверситетского уровня (ректор) - за работу в рамках хоздоговора, сумма договора 101.000 - 300.000 на 1 студента"
                ,"Внутриуниверситетского уровня (ректор) - за работу в рамках хоздоговора, сумма договора до 301.000 - 500.000 на 1 студента",
                "Внутриуниверситетского уровня (ректор) - за работу в рамках хоздоговора, сумма договора свыше 501.000 на 1 студента",
                "Внутриуниверситетского уровня (ректор) - за участие в организации научного мероприятия",
                "Внутриуниверситетского уровня (директор института/декан факультета)"]

                ДЛЯ А3 ["Индивидуальное достижение",
                "В соавторстве"]

                ДЛЯ А4 ["Под руководством студента",
                "В составе коллектива"]

                ДЛЯ Б [""Белый список" научных журналов",
                "Публикации, проиндексированные в WoS, Scopus, RSCI, не вошедшие в "Белый список"",
                "ВАК",
                "Научные журналы уровня РИНЦ (с № ISSN)",
                "Статья в сборниках уровня РИНЦ по материалам международных, всероссийских конференций",
                "Тезисы в сборниках уровня РИНЦ по материалам международных, всероссийских конференций",
                "Иные публикации, размещенные на elibrary"]

                ------------------------------------------------------------------------------------------------------

                "type-document": "",  # вид документов ДЛЯ А1["Копия диплома"]

                ДЛЯ А2 ["Копия благодарственного письма /грамоты / приказа ректора /распоряжения директора института или декана факультета по представлению руководителя научного объединения"]

                ДЛЯ А3 ["Копия патента, свидетельства"]

                ДЛЯ А4 ["Копия грантового соглашения, договора о выделении гранта, копия информационного письма грантодающей организации о присуждении гранта (Государственное задание, РНФ, РГО, РИО, Росмолодежь, Фонд содействия инновациям,внутриуниверситетские конкурсы)"]

                ДЛЯ Б ["Ссылка на публикацию в открытом онлайн-доступе, копии: титульного листа, содержания журнала/сборника с ФИО автора, первой страницы публикации и скриншот страницы для авторов из электронной библиотеки elibrary с отражением публикаций"]

                "name": "",  # название
                "date": "",  # дата
                "place": "",  # место
                "url": ""  # ссылка
            },
        ],

    },

    "activities":{
        "list": [
            "work": {  # активности
                "criteria-concrete": "",  # конкретика критерия ДЛЯ А2 ["Членство в общественных организациях, студенческих объединениях",
                "Членство в ученом совете университета, института, факультета","Выполнение функций студенческого куратора",
                "Выполнение функций старосты академической группы/старосты общежитий/секретаря",
                "Руководство общественной организацией, студенческим объединением"]

                ДЛЯ А3 ["Участник команды проекта","Руководитель проекта"]

                ДЛЯ А4 ["Участие в одном мероприятии", "Менеджмент мероприятия"]

                ДЛЯ А5 ["Участие в региональных конкурсах и форумах общественной направленности",
                "Участие в федеральных конкурсах и форумах общественной направленности, финальный этап (АНО "Россия - страна возможностей", Росмолодежь, "Твой ход")",
                "Победа в федеральных конкурсах общественной направленности"]

                "vid-pod-doc": "",  # вид подтверждающих документов ДЛЯ А2 для каждого критерия по порядку которые выше в том же порядке["Копия списка студенческого объединения, заверенного куратором",
                "Копия приказа о составе ученого совета",
                "Копия распоряжения о назначении и распределении кураторов",
                "назначение старосты академической группы / копия списка, заверенного заведующим общежитием / копия",
                "Копия списка студенческого объединения, заверенного куратором"]

                ДЛЯ А3 ["Копия грантового соглашения / договора о выделении гранта, копия информационного письмагрантодающей организации"]

                ДЛЯ А4 ["Справка, подтверждающая количество участий студента","Справка, подтверждающая количество организованных мероприятия студента"]

                ДЛЯ А5 ["Копия документа, подтверждающего участие (сертификат/диплом)"]

                "forma-proved": "",  # форма провередения ДЛЯ А2-В ["смешанная","очная","заочная"]

                "name": "",  # название
                "date": "",  # дата
                "url": ""  # ссылка
            },
        ],

    },

    "culture":{
        "list": [
            "work": {  # культура
                "criteria-concrete": "",  # конкретика критерия ДЛЯ А ["Всероссийский, международный уровень, победа/призовое место",
                "Областной уровень, победа/призовое место",
                "университетский уровень, диплом 1 степени",
                "университетский уровень, диплом 2-3 степени",
                "университетский уровень, диплом победителя в номинации",
                "университетский уровень, диплом призера в номинации",
                "университетский уровень, диплом финалиста"]
               !!! и под вопросом 3 пункта всегда есть просто такие вот одинаковые:["Победа в заочных конкурсах, интернет-конкурсах любого уровня"] 196 СТРОКУ СМОТРИ

                ДЛЯ Б ["Одно произведение"]

                ДЛЯ В1 ["Одно мероприятие"]

                ДЛЯ В2 ["Членство в одной студии"]

                ----------------------------------------------------------------------------------------

                "vid-pod-doc": "",  # вид подтверждающих документов ДЛЯ А ["Наградной документ"]

                ДЛЯ Б ["Ссылка на публичное представление созданного произведения"]

                ДЛЯ В1-B2 ["Копия справки, подтверждающий участие студента в культурно-творческой деятельности / сертификата, диплома участника, благодарственное письма / ссылка на пост в официальной группе проекта"]

                ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                "forma-participation": "",  # форма участия ДЛЯ А-Б ["смешанная","очная","заочная"] !!!!и у этих 3 последних пунктов ["заочная"]!!!! 177 СТРОКУ СМОТРИ

                 ДЛЯ В1 отсутсвуют требования

                 ДЛЯ В2 ["участник коллектива"]

                 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                "name": "",  # название для В2 ["ВЭС «Бриз»",
                "Студия «DanceFM»",
                "Студия «K-pop Cover Dance»",
                "Студия фитнеса и растяжки",
                "ИЗО-студия"]

                "date": "",  # дата
                "organizator": "",  # организатор
                "url": ""  # ссылка
            },
        ],
    },

    "sport":{
        "list": [
            "work": {  # спорт
                "criteria": "",  # критерии
                "criteria-concrete": "",  # конкретика критерия
                "name": "",  # название
                "date": "",  # дата "place": "",  # место
                "copy-protocol": "",  # копия протокола
                "copy-calendar": ""  # копия календаря
            },
        ],
    }
}*/