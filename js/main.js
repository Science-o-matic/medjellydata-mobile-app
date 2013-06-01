$(document).ready(function () {

  $("form#login").submit(function (e) {
    var that = this;

    console.log(this);

    $.ajax({
      type: "POST",
      url: $(that).attr("action"),
      success: function(data) {
        window.open(data.url);
      },
      error: function () {
        alert("Nombre de usuario y/o contraseña incorrectos.");
      }
    });
    return false;
  });

});
