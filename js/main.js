function saveTokenInfo(token, userid){
  if(typeof(Storage)!=="undefined"){
    localStorage.token = token;
    localStorage.userid = userid;
  }
  else{
    //TODO: If local storage is not available use a cookie
  }

}

function saveLoginInfo(username, password){
  if(typeof(Storage)!=="undefined"){
    localStorage.username = username;
    localStorage.password = password;
  }
  else{
    //TODO: If local storage is not available use a cookie
  }
}

function getUsername(){
  if(typeof(Storage)!=="undefined"){
    return localStorage.username;
  }
  else{
    //TODO: If local storage is not available use a cookie
  }
}

function getUserId(){
  if(typeof(Storage)!=="undefined"){
    return localStorage.userid;
  }
  else{
    //TODO: If local storage is not available use a cookie
  }
}

function getPassword(){
  if(typeof(Storage)!=="undefined"){
    return localStorage.password;
  }
  else{
    //TODO: If local storage is not available use a cookie
  }
}

function getToken(){
  if(typeof(Storage)!=="undefined"){
    return localStorage.token;
  }
  else{
    //TODO: If local storage is not available use a cookie
  }
}

function fillFormOnLoad(){
  fillUsername();
  fillPassword();
}

function fillUsername(){
  if(typeof(Storage)!=="undefined"){
    $("#username").innerHTML=getUsername();
  }
  else{
    //TODO: If local storage is not available use a cookie
  }
}

function fillPassword(){
  if(typeof(Storage)!=="undefined"){
    $("#password").innerHTML=getPassword();
  }
  else{
    //TODO: If local storage is not available use a cookie
  }
}

function goToNewSightForm(form){
  
  if(typeof(Storage)!=="undefined"){
    var saved_token = getToken();
    var saved_userid = getUserId();
  }
  else{
    //TODO: If local storage is not available use a cookie
  }

  $.ajax({
    url: "http://test.backend.medjellydata.com/token/" + saved_token + "/" + saved_userid + ".json",
    datatype: "json",
    success: function(data){
      var result = data.success;
      if(result == true){
        window.open("http://test.backend.medjellydata.com/sights/new?user=" + saved_userid + "&token=" + saved_token, '_self', false);
      }
      else{
        $.ajax({
          type: "POST",
          url: "http://test.backend.medjellydata.com/token/new.json",
          data: form.serialize(),
          datatype: "json",
          success: function(data){
            var result = data.success;
            if(result == true){
              var new_token = data.token;
              var new_userid = data.user;
              saveTokenInfo(new_token, new_userid);
              saveLoginInfo(form_user, form_password);
            }
            else{
              alert("Nom d'usuari i/o contrasenya incorrectes");
            }
          },
          error: function(){
            alert("Problema de connexió, si us plau, comprovi la seva connexió a Internet");
          }
        });
      }
    },
    error: function(){
      alert("Problema de connexió, si us plau, comprovi la seva connexió a Internet");
    }
  });
}

$(document).ready(function(){

  fillFormOnLoad();

  $("form#login").submit(function (e) {
    
    var that = this;
    e.preventDefault();

    var form_user = $("#username").val();
    var form_password = $("#password").val();

    if((form_user != getUsername()) || (form_password != getPassword())){
      $.ajax({
        type: "POST",
        url: "http://test.backend.medjellydata.com/token/new.json",
        data: $(that).serialize(),
        datatype: "json",
        success: function(data){
          var result = data.success;
          if(result == true){
            var new_token = data.token;
            var new_userid = data.user;
            saveTokenInfo(new_token, new_userid);
            saveLoginInfo(form_user, form_password);
            goToNewSightForm($(that));
          }
          else{
            alert("Nom d'usuari i/o contrasenya incorrectes");
          }
        },
        error: function(){
          alert("Problema de connexió, si us plau, comprovi la seva connexió a Internet");
        }
      });
    }
    else{
      goToNewSightForm(this);
    }
    return false;
  });

});
