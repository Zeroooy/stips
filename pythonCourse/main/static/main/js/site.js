
function HttpRequestPost(URL, Func, data, isForm, timeout = 30000) {

    var xhr = new XMLHttpRequest();
    xhr.timeout = timeout;  // Устанавливаем таймаут
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.responseText == "error_by_connection" || xhr.responseText == "error_by_link" || xhr.responseText == "bad_login") window.location.href = '/login'
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


function HttpRequestPostFormDataWithProgressBar(URL, callback, data) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.responseText == "error_by_connection" || xhr.responseText == "error_by_link" || xhr.responseText == "bad_login") window.location.href = '/login'
                else callback(JSON.parse(xhr.responseText))
            } else {
                console.error('ERROR BY "' + URL + '":' + xhr.responseText);
                return ''
            }
        }
    };

    xhr.upload.addEventListener('progress', progressHandler, false)
    xhr.open('POST', "api/" + URL, true);

    xhr.setRequestHeader('X-CSRFToken', csrftoken);
    xhr.send(data);

}

function progressHandler(event) {
  updateProgress(event.loaded, event.total)
}

const BYTES_IN_MB = 1048576
async function updateProgress(loaded, total) {

  const percentLoaded = Math.round((loaded / total) * 100)
  var need_time = total / 1200000
      if(percentLoaded == 100){
        for(let i = 0; i < 100; i++){
            await new Promise(resolve => setTimeout(resolve, need_time));
            document.getElementById("progressBar").value = i
            document.getElementById("progressBar2").value = i
        }
      }
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



function createLockScreen(text){
    if(document.getElementsByClassName('alert_').length == 0){
        var message = document.createElement("div")
        var blockirator = document.createElement("div")
        message.innerHTML = "<div class='alert-text'>"+text+"</div>"
        message.className = "alert_";
        blockirator.className = "blockirator";
        document.body.appendChild(blockirator)
        document.body.appendChild(message)
    }
}


function createUnlockScreen(){
    document.getElementsByClassName('blockirator')[0].remove();
    document.getElementsByClassName('alert_')[0].remove();
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





