jQuery(function(){
    var list = $("#list-of-projects > ul");
    console.log(list);
    var github_v3_endpoint = "https://api.github.com/orgs/ska-telescope/repos";
    $.getJSON(github_v3_endpoint, function(data){
        $.each(data, function(key, val){
           console.log(val);
           item = "<li>" + val["name"] + "</li>";
           $(item).appendTo(list);
        }); //end each
    }); //end getJSON
});
