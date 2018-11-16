$(document).ready(function() {
    $("#deleteComments").click(function() {
    var url = "comment";
    $.ajax({
      url: url,
      type: "DELETE",
      success: function(data, textStatus) {
        $("#done").html(textStatus);
      }
    });
  });
    
    
    
    
    
    
    $("#postComment").click(function() {
        var myobj = { Name: $("#name").val(), Comment: $("#comment").val(), Image: $("#image").val() };
        jobj = JSON.stringify(myobj);
        $("#json").text(jobj);
        var url = "comment";

        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                $("#done").html(textStatus);
            }
        });

    });
    
    $("#getComments").click(function() {
    var name = $("#query").val();
    var URL = "comment?q="+name;
    $.getJSON(URL, function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var comment in data) {
        com = data[comment];
        if(com.Image == "") {
            everything += "<li style=\"font-weight:bold; text-align:left\">" + com.Name + "</li>" + "<li>" + com.Comment + "</li>" + "<br>";
        }
        else if(com.Comment == "") {
            everything += "<li style=\"font-weight:bold; text-align:left\">" + com.Name + "</li><br>" + "<img \"#postPicture\" src=" + com.Image + "><br>";
        }
        else {
        everything += "<li>" + com.Name + "</li>" + "<li>" + com.Comment + "</li>" + "<br>" + "<img \"#postPicture\" src=" + com.Image + "><br><br><br><br>";
        }
      }
      everything += "</ul>";
      $("#comments").html(everything);
    });
  });
  

    
    
});



