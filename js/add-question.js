$(document).ready(function(){
  $("#InputClass").on("change", function() {
    var get_subjects_hash = {url_for: "get_subjects"};
    get_subjects_hash["inputData"] = {
      class_id: this.value
    }
    get_subjects_hash["url"] = "https://mindsplashacademy.in/index.php/api/student_api/subjectslist";
    get_subjects_hash["type"] = "POST";
    $("#InputSubject").prop("disabled", false)
    make_request(get_subjects_hash)
  });

  $("#InputSubject").on("change", function() {
    var get_chapters_hash = {url_for: "get_chapters"};
    get_chapters_hash["inputData"] = {
      subject_id: this.value
    }
    get_chapters_hash["url"] = "https://mindsplashacademy.in/index.php/api/student_api/chapterslist";
    get_chapters_hash["type"] = "POST";
    $("#InputChapter").prop("disabled", false)
    make_request(get_chapters_hash)
  });

  $('#exampleModal').on('hidden.bs.modal', function () {
    location.reload();
  });

  $("#InputChapter").on("change", function() {
    $("#InputDifficulty").prop("disabled", false)
    $("#Inputquestion").prop("disabled", false)
    $("#Inputoption_a").prop("disabled", false)
    $("#Inputoption_b").prop("disabled", false)
    $("#Inputoption_c").prop("disabled", false)
    $("#Inputoption_d").prop("disabled", false)
    $("#Inputcorrect_answer").prop("disabled", false)
    $("#Inputquestion_solution").prop("disabled", false)
  });
});

var hash = {url_for: "get_classes"};
hash["url"] = "https://mindsplashacademy.in/index.php/api/student_api/classeslist";
hash["type"] = "POST";
make_request(hash)

function make_request(hash) {
  $.ajax({
      url: hash["url"],
      type: hash["type"],
      data: hash["inputData"],
      success: function (response) {
        console.log(response);
        if(hash["url_for"] ==  "get_classes") {
          $.each(response.data, function(key, value) {
            $("#InputClass").append(`<option value="${value.id}">${value.class_name}</option>`)
          });
        }
        if(hash["url_for"] ==  "get_subjects") {
          $("#InputSubject").html('<option id="InputSubjectSelect" selected>Select Subject</option>');
          $.each(response.data, function(key, value) {
            $("#InputSubject").append(`<option value="${value.id}">${value.subject_name}</option>`)
          });
        }
        if(hash["url_for"] ==  "get_chapters") {
          $("#InputChapter").html('<option id="InputChapterSelect" selected>Select Chapter</option>');
          $.each(response.data, function(key, value) {
            $("#InputChapter").append(`<option value="${value.id}">${value.chapter_name}</option>`)
          });
        }
        if(hash["url_for"] ==  "add_question") {
          $("#outputID").html(response.data[0].id);
          $("#modallaunchbutton").click();
          debugger;
        }
      },
      error: function (response) {
        console.log(response);
      }
  });
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
var id;
var data;
function file_upload(id) {
  var fileInput = document.getElementById(id);
  var reader = new FileReader();
  var img;
reader.readAsDataURL(fileInput.files[0]);

  reader.onload = function () {
 
    img = reader.result; //base64encoded string
    
    $.ajax({
      url: 'https://mindsplashacademy.in/index.php/api/student_api/questionimage_upload',
      type: 'POST',
      data: {image:img},
      success: function (response) {
        $("#"+id).attr('data-img',response.data);
      }
    });
  
};
  //console.log(getBase64(fileInput.files[0]));

 
}

function add_question(){
  var hash = {url_for: "add_question"};
  var  image1 = $("#myFile1").attr("data-img");
  var image2= $("#myFile2").attr('data-img');
  var image3= $("#myFile3").attr('data-img');
  var image4= $("#myFile4").attr('data-img');
  var image5= $("#myFile5").attr('data-img');
  var image6= $("#myFile6").attr('data-img');
  var image7= $("#myFile7").attr('data-img');
  var image8= $("#myFile8").attr('data-img');
  var image9= $("#myFile9").attr('data-img');
  var image10= $("#myFile10").attr('data-img');
  hash["inputData"] = {
    question: $("#Inputquestion").val(),
    option_a: $("#Inputoption_a").val(),
    option_b: $("#Inputoption_b").val(),
    option_c: $("#Inputoption_c").val(),
    option_d: $("#Inputoption_d").val(),
    correct_answer: $("#Inputcorrect_answer").val(),
    question_solution: $("#Inputquestion_solution").val(),
    difficulties: $("#InputDifficulty").val(),
    classes: $("#InputClass option:selected").text(),
    chapter_id: $("#InputChapter").val(),
      image1: image1,
      image2: image2,
      image3: image3,
      image4: image4 ,
      image5: image5,
      image6: image6,
      image7: image7,
      image8: image8,
      image9: image9,
      image10: image10,
  };
  hash["url"] = "https://mindsplashacademy.in/index.php/api/student_api/addboquestions";
  hash["type"] = "POST";
  make_request(hash);

  return false;
}

function search_question() {
  var hash = {url_for: "search_question"};
  hash["inputData"] = {
question_id: $("#Inputcorrect_answer").val(),
  };

    hash["url"] = "https://mindsplashacademy.in/index.php/api/student_api/addboquestions";
  hash["type"] = "POST";
  make_request(hash);
   return false;
}
// $(document).ready(function (e) {
//   $('#questionForm').on('submit',(function(e) {
//       e.preventDefault();
//       var formData = new FormData(this);
//       debugger
//       $.ajax({
//           type:'POST',
//           url: "https://mindsplashacademy.in/index.php/api/student_api/addboquestions",
//           data:formData,
//           cache:false,
//           contentType: false,
//           processData: false,
//           success:function(data){
//             debugger;
//               console.log("success");
//               console.log(data);
//           },
//           error: function(data){
//             debugger;
//               console.log("error");
//               console.log(data);
//           }
//       });
//   }));
// });