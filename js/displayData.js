$( document ).ready(function(){
  if (!localStorage['userData']) {
    var text = document.createElement('p');
    text.innerHTML = "Войдите или зарегистрируйтесь, чтобы просматривать статистику";
    text.classList.add("text");
    document.body.appendChild(text); 
  }
  else {
    var json_str = JSON.parse(getLocalStorage('userData'));
    var token = json_str.access_token;
    var res;

        $.ajax({
            url: 'http://localhost:9090/note',
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'application/json; charset=utf-8'
            },
            dataType : 'json',
            success: function (result) { 
              res = result ;
              console.log(res); 
              append(res);
            },
            error: function () { },
        });
  }

});

function append(res) {
    var text = document.createElement('p');
    text.innerHTML = "Самый популярный запрос в мире: ";
    var glob = document.createElement('p');
    glob.innerHTML = res["global"];
    text.classList.add("text-black");
    glob.classList.add("text");
    document.body.appendChild(text); 
    document.body.appendChild(glob); 

    var text2 = document.createElement('p');
    text2.innerHTML = "Ваш самый популярный запрос: ";
    var personal = document.createElement('p');
    personal.innerHTML = res["personal"];
    text2.classList.add("text-black");
    personal.classList.add("text");
    document.body.appendChild(text2); 
    document.body.appendChild(personal); 
}