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
        var token = data.token;
        var user = data.user;
        window.open("http://test.backend.medjellydata.com/sights/new?user=" + user + "&token=" + token, '_self', false);
      },
      error: function () {
        alert("Nombre de usuario y/o contraseña incorrectos.");
      }
    });
    return false;
  });

});
