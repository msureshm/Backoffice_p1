let searchParams = new URLSearchParams(window.location.search)
let id = searchParams.get('id')
var classes = {}

function on_page_load() {
	// body...
	get_classes();
	get_question(id);
}

function get_classes() {
	var hash = {url_for: "get_classes"};
	hash["url"] = "https://mindsplashacademy.in/index.php/api/student_api/classeslist";
	hash["type"] = "POST";
	make_request(hash)
}

function get_question(id) {
	var hash = {url_for: "get_question_by_id"};
	hash["inputData"] = {
	  question_id: id
	}
	hash["url"] = "https://mindsplashacademy.in/index.php/api/student_api/searchboquestions_byID";
	hash["type"] = "POST";
	make_request(hash)
}

function assign_details(data)	{
	$("#InputClass").val(data[0].classes);
	console.log(classes[data[0].classes]);
}

function make_request(hash) {
  $.ajax({
      url: hash["url"],
      type: hash["type"],
      data: hash["inputData"],
      success: function (response) {
        console.log(response);
        if(hash["url_for"] ==  "get_question_by_id") {
        	assign_details(response.data)
        }
        if(hash["url_for"] ==  "get_classes") {
          $.each(response.data, function(key, value) {
          	classes[value.class_name] = value.id;
            $("#InputClass").append(`<option value="${value.id}">${value.class_name}</option>`);
          });
        }
        if(hash["url_for"] ==  "get_subjects") {
          $("#InputSubject").html('<option id="InputSubjectSelect" selected>Select Subject</option>');
          $("#InputChapter").html('<option id="InputChapterSelect" selected>Select Chapter</option>');
          $.each(response.data, function(key, value) {
            $("#InputSubject").append(`<option value="${value.id}">${value.subject_name}</option>`)
          });
        }
        if(hash["url_for"] ==  "get_chapters") {
          $("#InputChapter").html('<option id="InputChapterSelect" selected>Select Chapter</option>');
          $.each(response.data, function(key, value) {
            $("#InputChapter").append(`<option value="${value.id}">${value.chapter_name}</option>`)
          });
          $("#InputChapter").append('<option value="AddChapter">===Add New Chapter===</option>');
        }
        if(hash["url_for"] ==  "add_question") {
          $("#outputID").html(response.data[0].id);
          $("#modallaunchbutton").click();
        }
        if(hash["url_for"] ==  "add_chapter") {
          $("#NewChapterDiv").hide();
          var get_chapters_hash = {url_for: "get_chapters"};
          get_chapters_hash["inputData"] = {
            subject_id: $("#InputSubject").val()
          }
          get_chapters_hash["url"] = "https://mindsplashacademy.in/index.php/api/student_api/chapterslist";
          get_chapters_hash["type"] = "POST";
          $("#InputChapter").prop("disabled", false);
          make_request(get_chapters_hash);
          // $("#NewChapterDiv").html("Chapter Name: " + response.data.name + " ID: " + response.data.id)
        }
      },
      error: function (response) {
        console.log(response);
      }
  });
}

function populate_form() {
	// body...
}