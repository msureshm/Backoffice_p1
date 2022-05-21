function login(){  
  var username = $("#InputUsername").val()
  var password = $("#InputPassword").val()
  var url = "https://mindsplashacademy.in/index.php/api/student_api/bologin"
  var inputData = {
    user_name: username,
    user_pwd: password
  }
  var type = "POST"
  let response_data;
  let response_type;
  $.ajax({
      url: url,
      type: type,
      data: inputData,
      success: function (data) {
        $("#login-error").hide();
      },
      error: function (error) {
        $("#login-error").show();
      }
  });
  return false;
}