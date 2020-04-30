var name_u;
var password_u;
USERNAME = "golikova";
PASSWORD = "golikova";

$(function() {
	$(".btn-signin").click(function() {
		name_u = $("[name= 'name']").val();
		password_u = $("[name= 'password']").val();
		console.log(name_u + " " + password_u);

		if (validateSignIn()) {

			$.ajax({
				type : "POST",
				url : "http://localhost:8080/oauth/token",
				data: {grant_type: "password",
				username: name_u,
				password: password_u},
				headers: {
					"Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD),
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				success : function(result) {
					console.log("AJAX прошел успешно!"+ JSON.stringify(result));

					setLocalStorage('userData', JSON.stringify(result));
					showGreetingSignIn();
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


function validateSignIn(){

	$("[name = 'name']").css("border", "none");
	$("[name = 'password']").css("border", "none");
	$(".error-field").text("");

	if (name_u == ""){
		$("[name = 'name']").css("border", "solid");
		$("[name = 'name']").css("border-color", "#FF0066");
		$("[name = 'name']").css("border-width", "1px");
		$(".error-field").text("Ой! Похоже, вы забыли ввести имя :(");
		return false;
	}
	if (password_u == ""){
		$("[name = 'password']").css("border", "solid");
		$("[name = 'password']").css("border-color", "#FF0066");
		$("[name = 'password']").css("border-width", "1px");
		$(".error-field").text("Ой! Похоже, вы забыли ввести пароль :(");
		return false;
	}
	
	return true;
}

function showGreetingSignIn() {

	var json_str = getLocalStorage('userData');
	var arr = JSON.parse(json_str);

	$(".btn-animate").toggleClass("btn-animate-grow");
	$(".welcome").toggleClass("welcome-left").text("Привет, " + arr.name + "!");

	$(".cover-photo").toggleClass("cover-photo-down");
	$(".frame").toggleClass("frame-short");
	$(".profile-photo").toggleClass("profile-photo-down");
	$(".avatar").text(arr.name.charAt(0).toUpperCase());
	$(".btn-goback").toggleClass("btn-goback-up");
	$(".forgot").toggleClass("forgot-fade");

}

