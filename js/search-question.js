$(document).on('click','.edit_question',function(){
		alert("edit request");
});
$(document).on('click','.disable_question',function(){
	var hash = {url_for: "disable_question"};
	hash["inputData"] = {
	  question_id: $(this).attr("question_id")
	}
	hash["url"] = "https://mindsplashacademy.in/index.php/api/student_api/disableboquestions";
	hash["type"] = "POST";
	make_request(hash)
});

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

function search_question() {
	if($("#question_id").val() == ""){
		var hash = {url_for: "get_question_by_text"};
		hash["inputData"] = {
		  search_text: $("#search_text").val(),
		}
		hash["url"] = "https://mindsplashacademy.in/index.php/api/student_api/searchboquestions_byText";
		hash["type"] = "POST";
		make_request(hash)
	}
	else	{
		var hash = {url_for: "get_question_by_id"};
		hash["inputData"] = {
		  question_id: $("#question_id").val(),
		}
		hash["url"] = "https://mindsplashacademy.in/index.php/api/student_api/searchboquestions_byID";
		hash["type"] = "POST";
		make_request(hash)
	}
}

function make_request(hash) {
  $.ajax({
      url: hash["url"],
      type: hash["type"],
      data: hash["inputData"],
      success: function (response) {
        console.log(response);
        if(hash["url_for"] ==  "disable_question") {
					alert("Question Disabled");
        }
        else	{
	      	$("#questions_list").html("<tr><th>Question ID</th><th>Question Text</th><th>Action</th></tr>");
	        $.each(response.data, function(key, value) {
	        	$("#questions_list").append(`
	          	<tr>
	          		<td>${value.id}</td>
	          		<td>${value.question}</td>
	          		<td>
	          			<a class="edit_question" question_id="${value.id}">Edit</a>
	          			<a class="disable_question" question_id="${value.id}">Disable</a>
	          		</td>
	          	</tr>
	          `);
	        });
	      }
      },
      error: function (response) {
        console.log(response);
      }
  });
}