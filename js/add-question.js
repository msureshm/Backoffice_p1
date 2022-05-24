$(document).on('change','#InputChapter',function(){
  if($(this).val() == "AddChapter") {
    $("#NewChapterDiv").prop("hidden", false)
    $("#NewChapter").prop("disabled", false)
  }
  else  {
    $("#NewChapterDiv").prop("hidden", true)
    $("#InputDifficulty").prop("disabled", false)
    $("#Inputquestion").prop("disabled", false)
    $("#Inputoption_a").prop("disabled", false)
    $("#Inputoption_b").prop("disabled", false)
    $("#Inputoption_c").prop("disabled", false)
    $("#Inputoption_d").prop("disabled", false)
    $("#Inputcorrect_answer").prop("disabled", false)
    $("#Inputquestion_solution").prop("disabled", false)
  }
});

$(document).on('click', '#addChapter', function(){
  var add_chapter_hash = {url_for: "add_chapter"};
  add_chapter_hash["inputData"] = {
    subject_id: $("#InputSubject").val(),
    chapter_name: $("#NewChapter").val()
  }
  add_chapter_hash["url"] = "https://mindsplashacademy.in/index.php/api/student_api/addchapters";
  add_chapter_hash["type"] = "POST";
  make_request(add_chapter_hash);
});

$(document).on('click', '.remove_image', function(){
  $("#inputFileToLoad" + $(this).attr("img_id")).val("");
  $("#imgDiv" + $(this).attr("img_id")).hide();
});

$(document).ready(function(){
  $("#InputClass").on("change", function() {
    var get_subjects_hash = {url_for: "get_subjects"};
    get_subjects_hash["inputData"] = {
      class_id: this.value
    }
    get_subjects_hash["url"] = "https://mindsplashacademy.in/index.php/api/student_api/subjectslist";
    get_subjects_hash["type"] = "POST";
    $("#InputSubject").prop("disabled", false);
    make_request(get_subjects_hash);
  });

  $("#InputSubject").on("change", function() {
    var get_chapters_hash = {url_for: "get_chapters"};
    get_chapters_hash["inputData"] = {
      subject_id: this.value
    }
    get_chapters_hash["url"] = "https://mindsplashacademy.in/index.php/api/student_api/chapterslist";
    get_chapters_hash["type"] = "POST";
    $("#InputChapter").prop("disabled", false)
    make_request(get_chapters_hash);
  });

  $('#exampleModal').on('hidden.bs.modal', function () {
    location.reload();
  });

  $("#InputChapter").on("change", function() {
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

function add_question(){
  var hash = {url_for: "add_question"};
  var  image1 = $("#inputFileToLoad1").attr("data-img");
  var image2= $("#inputFileToLoad2").attr('data-img');
  var image3= $("#inputFileToLoad3").attr('data-img');
  var image4= $("#inputFileToLoad4").attr('data-img');
  var image5= $("#inputFileToLoad5").attr('data-img');
  var image6= $("#inputFileToLoad6").attr('data-img');
  var image7= $("#inputFileToLoad7").attr('data-img');
  var image8= $("#inputFileToLoad8").attr('data-img');
  var image9= $("#inputFileToLoad9").attr('data-img');
  var image10= $("#inputFileToLoad10").attr('data-img');
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

// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// }
// var id;
// var data;
function file_upload(i) {
  var fileInput = document.getElementById("myImage" + i);
  var reader = new FileReader();
  var img;
  debugger;
  reader.readAsDataURL(fileInput.files[0]);
  reader.onload = function () {
    img = reader.result; //base64encoded string
    $.ajax({
      url: 'https://mindsplashacademy.in/index.php/api/student_api/questionimage_upload',
      type: 'POST',
      data: {image:img},
      success: function (response) {
        $("#inputFileToLoad"+i).attr('data-img',response.data);
      }
    });
  };
  //console.log(getBase64(fileInput.files[0]));
}

function encodeImageFileAsURL(i) {

  var filesSelected = document.getElementById("inputFileToLoad" + i).files;
  if (filesSelected.length > 0) {
    var fileToLoad = filesSelected[0];

    var fileReader = new FileReader();

    fileReader.onload = function(fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result; // <--- data: base64

      var newImage = document.createElement('img');
      newImage.id = "myImage" + 1;
      newImage.src = srcData;
      newImage.width = 100;
      newImage.height = 100;
      debugger;

      jQuery('<img>', {
          id: "myImage" + 1,
          src: srcData,
          width: 100,
          height: 100
      }).appendTo("#imgDiv" + i);

      console.log("Converted Base64 version is " + document.getElementById("imgDiv" + i).innerHTML);
    }
    $("#imgDiv" + i).show();
    fileReader.readAsDataURL(fileToLoad);
    file_upload(i);

  }
}

function upload_file_to_server(i) {
    
    var hash = {url_for: "upload_file"};
    hash["inputData"] = {
      image: $("#myImage1").attr("src")
    };

    hash["url"] = "https://mindsplashacademy.in/index.php/api/student_api/questionimage_upload";
    hash["type"] = "POST";
    make_request(hash);
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