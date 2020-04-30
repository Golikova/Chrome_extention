var name;
var emailId;
var password;
var confirmpassword;

$(function() {
	$(".btn-signup").click(function() {

    console.log('click!');

		name = $("[name= 'name-signup']").val();
		emailId = $("[name= 'emailId-signup']").val();
		password = $("[name= 'password-signup']").val();
		confirmpassword = $("[name= 'confirmpassword-signup']").val();

   var obj = new Object();
   obj.name = name;
   obj.emailId  = emailId;
   obj.password = password;
   var jsonString= JSON.stringify(obj);

   console.log(jsonString);

   if (validateSignup()) {
    console.log('valid!');
    $.ajax({
      type : "POST",
      contentType : 'application/json; charset=utf-8',
      dataType : 'json',
      url : "http://localhost:8080/register/",
      data : jsonString,
      success : function(result) {
        console.log("AJAX прошел успешно!");
        showGreetingSignUp();
        console.log(result);

      },

      error: function(e){
        $(".error-field").text("Ой! Ошибочка вышла :( Попробуйте еще раз.");
        console.log("ОШИБОЧКА вышла: ", e);
      },

      done : function(e) {
        console.log("ВСЕ ОТЛИЧНО");
      }

    });
  }

});
});

function validateSignup(){

  $("[name = 'name-signup']").css("border", "none");
  $("[name = 'emailId-signup']").css("border", "none");
  $("[name = 'password-signup']").css("border", "none");
  $("[name = 'confirmpassword-signup']").css("border", "none");
  $(".error-field").text("");

  if (name == ""){
    $("[name = 'name-signup']").css("border", "solid");
    $("[name = 'name-signup']").css("border-color", "#FF0066");
    $("[name = 'name-signup']").css("border-width", "1px");
    $(".error-field").text("Вам обязательно нужно имя!");
    return false;
  }
  if (emailId == ""){
    $("[name = 'emailId-signup']").css("border", "solid");
    $("[name = 'emailId-signup']").css("border-color", "#FF0066");
    $("[name = 'emailId-signup']").css("border-width", "1px");
    $(".error-field").text("E-mail не может быть пустым!");
    return false;
  }
  if (!validateEmail(emailId)){
    $("[name = 'emailId-signup']").css("border", "solid");
    $("[name = 'emailId-signup']").css("border-color", "#FF0066");
    $("[name = 'emailId-signup']").css("border-width", "1px");
    $(".error-field").text("Кажется, вы ошиблись с написанием e-mail..");
    return false;
  }
  if (password == ""){
    $("[name = 'password-signup']").css("border", "solid");
    $("[name = 'password-signup']").css("border-color", "#FF0066");
    $("[name = 'password-signup']").css("border-width", "1px");
    $(".error-field").text("Пароль может быть пустым!");
    return false;
  }
  if (password != confirmpassword){
    $("[name = 'confirmpassword-signup']").css("border", "solid");
    $("[name = 'confirmpassword-signup']").css("border-color", "#FF0066");
    $("[name = 'confirmpassword-signup']").css("border-width", "1px");
    $(".error-field").text("Пароли не совпадают!");
    return false;
  }
  
  return true;
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}



function showGreetingSignUp() {
  var json_str = getCookie('newsExtension');
  var arr = JSON.parse(json_str);

  $(".btn-animate").toggleClass("btn-animate-grow");
  $(".welcome").toggleClass("welcome-left").text("Спасибо за регистрацию!");

  $(".cover-photo").toggleClass("cover-photo-down");
  $(".frame").toggleClass("frame-short");
  $(".profile-photo").toggleClass("profile-photo-down");
  $(".profile-letter").toggleClass("profile-letter-down");

  $(".profile-letter").text(arr.name.charAt(0));
  $(".btn-goback").toggleClass("btn-goback-up");
  $(".forgot").toggleClass("forgot-fade");
  /*$(".btn-signup").click(function() {
    $(".btn-animate").toggleClass("btn-animate-grow");
    $(".cover-photo").toggleClass("cover-photo-down");
    $(".welcome").toggleClass("welcome-left").text("Спасибо за регистрацию!");
    $(".frame").toggleClass("frame-short");
    $(".btn-goback").toggleClass("btn-goback-up");
    $(".forgot").toggleClass("forgot-fade");
  });*/
};
