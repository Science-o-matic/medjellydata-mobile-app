$(document).ready(function () {

  $("form#login").submit(function (e) {
    var that = this;
    e..preventDefault();
    console.log(this);

    $.ajax({
      type: "POST",
      url: $(that).attr("action"),
      data: $(that).serialize(),
      datatype: "json",
      success: function(data) {
        var token = $(that).find("token");
        var user = $(that).find("user");
      },
      error: function () {
        alert("Nombre de usuario y/o contraseña incorrectos.");
      }
    });
    return false;
  });

});
