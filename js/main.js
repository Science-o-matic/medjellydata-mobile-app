$(document).ready(function () {

  $("form#login").submit(function (e) {
    var that = this;
    e.preventDefault();
    console.log(this);

    $.ajax({
      type: "POST",
      url: $(that).attr("action"),
      data: $(that).serialize(),
      datatype: "json",
      async: false,
      success: function(data) {
        alert("success");
        var token = data.token;
        var user = data.user;
        var success = data.success;
      },
      error: function () {
        alert("Nombre de usuario y/o contraseña incorrectos.");
      }
    });

    if(success){
      window.open('http://google.com');
    }
    else{
      return false;
    }
  });

});
