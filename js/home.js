$(document).ready(function(){
	$("#logout").click(function(){
		window.location.href = "login.html"
	});
	var user_group = localStorage.getItem('user_group')
	if(user_group == 'admin'){
		
	}
	else {
		window.location.href = "login.html"
	}
});


