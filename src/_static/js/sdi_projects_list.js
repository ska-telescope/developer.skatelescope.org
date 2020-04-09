//3180705 - main
//7480052 - SDI
//5901724 - templates
jQuery(function(){
    var gitlab_v4_endpoint = "https://gitlab.com/api/v4/groups/7480052/projects?per_page=100&order_by=name&sort=asc&simple=true";
    var list = $("#software-defined-infrastructure tbody");
    var i = 1;
    //console.log(list);
    if( list.length ){
        list.empty();
        $.getJSON(gitlab_v4_endpoint, function(data){
            $.each(data, function(key, val){
//                  console.log(val);
               i = i+1;
               if(val["description"])
                   description = val["description"];
               else
                   description = "";
               gitlab_url = val["web_url"];
               name = val["name"];
               path = val["path"];
               docs_name = path.replace(/\./g,"");
               docs_url = "https://developer.skatelescope.org/projects/" + docs_name;
               item ="<tr>" +
                     "<td><a alt=\"repo url on gitlab\" href=\"" + gitlab_url + "\">" + name + "</a></td>" +
                    "<td><a href=\"" + docs_url + "/en/latest/?badge=latest\" >" +
                        "<img src=\"https://readthedocs.org/projects/" + docs_name + "/badge/?version=latest\" alt='Documentation Status' />" +
                    "</a></td>" +
                     "<td>" + description + "</td>" +
                     "</tr>";
            }); //end each
           console.log(i + " projects");
        }); //end getJSON
    }else{ //if list not found
        console.log("list not found")
    }
 });
