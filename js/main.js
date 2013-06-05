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
      success: function(data) {
        alert("success");
        var token = data.token;
        var user = data.user;
        window.open('http://www.google.com');
      },
      error: function () {
        alert("Nombre de usuario y/o contraseña incorrectos.");
      }
    });
    return false;
  });

});
