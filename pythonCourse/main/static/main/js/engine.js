
function HttpRequestPost(URL, Func, data, isForm, timeout = 30000) {

    var xhr = new XMLHttpRequest();
    xhr.timeout = timeout;  // Устанавливаем таймаут
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.responseText == "error_by_connection" || xhr.responseText == "error_by_link" || xhr.responseText == "bad_login"|| xhr.responseText == "bad request2") window.location.href = '/login'
                else Func(JSON.parse(xhr.responseText))
            } else {
                console.error('ERROR BY "' + URL + '":' + xhr.responseText);
                return ''
            }
        }
    };

    xhr.open('POST', "api/" + URL, true);


    if(isForm){
        xhr.setRequestHeader('X-CSRFToken', csrftoken);
        xhr.send(data);
    }else{
        xhr.setRequestHeader('Content-Type', 'application/json');
        data['csrfmiddlewaretoken'] = csrftoken;
        xhr.send(JSON.stringify(data));
    }

    return xhr
}


function HttpRequestPostFormData(URL, callback, data) {
    HttpRequestPost(URL, callback, data, true)
}


function HttpRequestPostJson(URL, callback, data) {
    HttpRequestPost(URL, callback, data, false)
}



function out() {
    let json = {
        session: sessionStorage.getItem('sessionId')
    }
    HttpRequestPost('DeleteSession', function (request) {

        window.location.href = '/login'
    }, json)
}



function is_correct_session() {
    let json = {
        session: sessionStorage.getItem('sessionId')
    }
    HttpRequestPost('IsCorrectSession', function (request) {
        if(!request.answer) window.location.href = '/login'
    }, json)
}







var schet = 0
function createMessage(text, type){
    var message = document.createElement("div")
    if(text.length > 60) message.style.width = "750px"
    else if(text.length > 50) message.style.width = "650px"
    else if(text.length > 40) message.style.width = "550px"
    else if(text.length > 30) message.style.width = "450px"
    else if(text.length > 20) message.style.width = "350px"
    message.innerHTML = "<div class='center-text'>"+text+"</div>"
    if(type == "error") message.className = "message message-error";
    else if(type == "sucess") message.className = "message message-sucess";
    document.body.appendChild(message)


    message.style.bottom = (20+schet*(20+50))+"px";
    schet++

    setTimeout(function (message){
        message.style.opacity = 0;

        setTimeout(function (message){
            schet--
            message.remove()
        }, 3000, message)

    }, 2000, message)
}




function red_flag(id){
    var element = document.getElementById(id)

    var background = element.style.background
    var boxShadow = element.style.boxShadow
    element.style.background =  "#ffbdbd";
    element.style.boxShadow = "0px 3px 0px rgb(255 0 0)";

    setTimeout(function (element){
        element.style.background = background;
        element.style.boxShadow = boxShadow;
    }, 3000, element, background, boxShadow)
}






function createAlertSuccess(text, Func){
    if(document.getElementsByClassName('alert_').length == 0){
        var message = document.createElement("div")
        var blockirator = document.createElement("div")
        message.innerHTML = "<div class='alert-text'>"+text+"</div><div class='buttons-container-button-alert bcb-green center-text-button' id='alert-accept-button'>Подтвердить</div><div class='buttons-container-button-alert bcb-red center-text-button' id='alert-decline-button'>Отменить</div>"
        message.className = "alert_";
        blockirator.className = "blockirator";
        document.body.appendChild(blockirator)
        document.body.appendChild(message)

        document.getElementById('alert-accept-button').addEventListener('click', function () {
          Func(true)
          document.getElementsByClassName('blockirator')[0].remove();
          document.getElementsByClassName('alert_')[0].remove();
        });

        document.getElementById('alert-decline-button').addEventListener('click', function () {
          document.getElementsByClassName('blockirator')[0].remove();
          document.getElementsByClassName('alert_')[0].remove();
        });
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.perehod');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Убираем активный класс у всех кнопок
            buttons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
        });
    });
});





function slist(target) {
  // (A) SET CSS + GET ALL LIST ITEMS
  target.classList.add("slist");
  let items = target.getElementsByTagName("li"), current = null;

  // (B) MAKE ITEMS DRAGGABLE + SORTABLE
  for (let i of items) {
    // (B1) ATTACH DRAGGABLE
    i.draggable = true;

    // (B2) DRAG START - YELLOW HIGHLIGHT DROPZONES
    i.ondragstart = e => {
      current = i;
      for (let it of items) {
        if (it != current) { it.classList.add("hint"); }
      }
    };

    // (B3) DRAG ENTER - RED HIGHLIGHT DROPZONE
    i.ondragenter = e => {
      if (i != current) { i.classList.add("active"); }
    };

    // (B4) DRAG LEAVE - REMOVE RED HIGHLIGHT
    i.ondragleave = () => i.classList.remove("active");

    // (B5) DRAG END - REMOVE ALL HIGHLIGHTS
    i.ondragend = () => { for (let it of items) {
        it.classList.remove("hint");
        it.classList.remove("active");
    }};

    // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
    i.ondragover = e => e.preventDefault();

    // (B7) ON DROP - DO SOMETHING
    i.ondrop = e => {
      e.preventDefault();
      if (i != current) {
        let currentpos = 0, droppedpos = 0;
        for (let it = 0; it < items.length; it++) {
          if (current == items[it]) { currentpos = it; }
          if (i == items[it]) { droppedpos = it; }
        }
        if (currentpos < droppedpos) {
          i.parentNode.insertBefore(current, i.nextSibling);
        } else {
          i.parentNode.insertBefore(current, i);
        }
      }
    };
  }
}







function showConfirmation(onConfirm) {
  // Если уже существует — не создаём повторно
  if (document.getElementById("custom-modal")) return;

  // Создаем фон
  const backdrop = document.createElement("div");
  backdrop.id = "custom-modal";
  backdrop.className = "fixed inset-0 bg-black/20 flex items-center justify-center z-50";

  // Создаем окно
  const modal = document.createElement("div");
  modal.className = "bg-white p-6 rounded-xl shadow-xl w-80 text-center";

  // Заголовок / сообщение
  const message = document.createElement("p");
  message.className = "mb-6 text-lg font-semibold";
  message.textContent = "Вы уверены, что хотите выполнить это действие?";
  modal.appendChild(message);

  // Контейнер кнопок
  const buttons = document.createElement("div");
  buttons.className = "flex justify-center gap-4";

  // Кнопка "Да"
  const yesBtn = document.createElement("button");
  yesBtn.className = "px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600";
  yesBtn.textContent = "Да";
  yesBtn.onclick = () => {
    onConfirm?.(); // выполняем переданную функцию
    document.body.removeChild(backdrop);
  };

  // Кнопка "Нет"
  const noBtn = document.createElement("button");
  noBtn.className = "px-4 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500";
  noBtn.textContent = "Нет";
  noBtn.onclick = () => {
    document.body.removeChild(backdrop);
  };

  // Добавляем кнопки
  buttons.appendChild(yesBtn);
  buttons.appendChild(noBtn);
  modal.appendChild(buttons);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);
}

function showNotificationBad(message) {Notification(message, false)}
function showNotification(message) {Notification(message, true)}
function Notification(message, type) {
  // Удалим старое уведомление, если есть
  const old = document.getElementById("custom-notify");
  if (old) old.remove();

  // Создаем уведомление
  const note = document.createElement("div");
  note.id = "custom-notify";
  note.textContent = message;
  if(type) note.className = "fixed top-25 right-5 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg z-50";
  else note.className = "fixed top-25 right-5 bg-red-400 text-white px-4 py-2 rounded-xl shadow-lg z-50";
  document.body.appendChild(note);

  // Удалить через 3 секунды
  setTimeout(() => {
    note.remove();
  }, 3000);
}



function confirmСlearLogs() {
  showConfirmation(() => {
    createJson()
  });
}

function showNotificationModal(messageText) {
  if (document.getElementById("notification-modal")) return;

  const backdrop = document.createElement("div");
  backdrop.id = "notification-modal";
  backdrop.className = "fixed inset-0 bg-black/20 flex items-center justify-center z-50";

  const modal = document.createElement("div");
  modal.className = "bg-white p-6 rounded-xl shadow-xl w-80 text-center";

  const message = document.createElement("p");
  message.className = "mb-4 text-base font-medium text-gray-800";
  message.innerHTML = messageText.replace(/\n/g, "<br>");
  modal.appendChild(message);

  const closeBtn = document.createElement("button");
  closeBtn.className = "mt-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600";
  closeBtn.textContent = "Закрыть";
  closeBtn.onclick = () => {
    document.body.removeChild(backdrop);
  };

  modal.appendChild(closeBtn);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);
}
