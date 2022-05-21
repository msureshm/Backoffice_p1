$(document).ready(function(){
	$("#logout").click(function(){
		localStorage.setItem('user_group', "")
		window.location.href = "login.html"
	});
	var user_group = localStorage.getItem('user_group')
	if(user_group == 'admin'){

	}
	else {
		window.location.href = "login.html"
	}
});