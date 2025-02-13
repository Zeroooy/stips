




class statement{
	constructor(){
		this.studies = {}
		this.science = {}
		this.activities = {}
		this.culture = {}
		this.sport = {}
	}


	// тут все поля мира
	addStudies(){

	}

	addScience(){

	}

	addActivities(){

	}

	addCulture(){

	}

	addSport(){

	}



	static fromJSON(json) {
    const data = JSON.parse(json);
    return new Person(
      data.firstName,
      data.lastName,
      data.age,
      data.email,
      data.phoneNumber,
      data.address
    );
  }
}

/*



 json = {
            "studies":{
                "onlyFive": data.get("onlyFive"),   # только ли пятерки?
                "project-work":{    # Получение студентом в течении предыдущего года награды по проектной деятельности
                    "international": {
                        "level": data.get("project-work-international-level"),   # уровень
                        "name": data.get("project-work-international-name"),   # название
                        "date": data.get("project-work-international-date"),   # дата
                        "url": data.get("project-work-international-url")    # ссылка
                    },
                    "regional": {
                        "level": data.get("project-work-regional-level"),   # уровень
                        "name": data.get("project-work-regional-name"),   # название
                        "date": data.get("project-work-regional-date"),   # дата
                        "url": data.get("project-work-regional-url")    # ссылка
                    },
                    "university": {
                        "level": data.get("project-work-university-level"),   # уровень
                        "name": data.get("project-work-university-name"),   # название
                        "date": data.get("project-work-university-date"),   # дата
                        "url": data.get("project-work-university-url")    # ссылка
                    }
                },
                "student-wins":{    # Признание студента победителем
                    "international": {
                        "level": data.get("student-wins-international-level"),  # уровень
                        "name": data.get("student-wins-international-name"),  # название
                        "date": data.get("student-wins-international-date"),  # дата
                        "url": data.get("student-wins-international-url")  # ссылка
                    },
                    "regional": {
                        "level": data.get("student-wins-regional-level"),  # уровень
                        "name": data.get("student-wins-regional-name"),  # название
                        "date": data.get("student-wins-regional-date"),  # дата
                        "url": data.get("student-wins-regional-url")  # ссылка
                    }
                }
            },
            "science":{
                "list": [
                    "work": {  # Научная штука
                        "criteria": "",  # критерий
                        "criteria-concrete": "",  # конкретика критерия
                        "type-document": "",  # вид документов
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
                        "criteria-concrete": "",  # конкретика критерия
                        "vid-pod-doc": "",  # вид подтверждающих документов
                        "forma-proved": "",  # форма провередения
                        "name": "",  # название
                        "date": "",  # дата
                        "url": ""  # ссылка
                    },
                ],

            },
            "culture":{
                "list": [
                    "work": {  # культура
                        "criteria-concrete": "",  # конкретика критерия
                        "vid-pod-doc": "",  # вид подтверждающих документов
                        "forma-proved": "",  # форма провередения
                        "name": "",  # название
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
                        "date": "",  # дата
                        "place": "",  # место
                        "copy-protocol": "",  # копия протокола
                        "copy-calendar": ""  # копия календаря
                    },
                ],
            }
}*/