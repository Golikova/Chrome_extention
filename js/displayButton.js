$( document ).ready(function(){
  if (!localStorage['userData']) {
    var btn = document.createElement('div');
    var a = document.createElement("a");
    a.classList.add("btn-auth");
    a.innerHTML = 'Войти';
    a.href = 'login.html'
    btn.classList.add('btn-animate');
    btn.appendChild(a);
    var frame = document.getElementsByName("frame");
    document.body.prepend(btn);  }
  else {
      var btn = document.createElement('div');
      var a = document.createElement("a");
      a.classList.add("btn-auth");
      a.innerHTML = 'Выход';
      a.href = 'logout.html'
      btn.classList.add('btn-animate');
      btn.appendChild(a);
      var frame = document.getElementsByName("frame");
      document.body.prepend(btn);
  }

  });