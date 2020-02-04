   jQuery(function(){
       var github_v3_endpoint = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&order_by=name&sort=asc&simple=true";
       var list = $("#list-of-projects tbody");
       var i = 1;
       //console.log(list);
       if( list.length ){
           list.empty();
           $.getJSON(github_v3_endpoint, function(data){
               $.each(data, function(key, val){
//                  console.log(val);
                  i = i+1;
                  if(val["description"])
                      description = val["description"];
                  else
                      description = "";
                  gitlab_url = val["web_url"];
                  name = val["name"];
                  docs_name = name.replace(/\./g,"");
                  if(name == "developer.skatelescope.org")
                      docs_url = "https://developer.skatelescope.org";
                   else
                       docs_url = "https://developer.skatelescope.org/projects/" + docs_name;
                  item ="<tr>" +
                        "<td><a alt=\"repo url on gitlab\" href=\"" + gitlab_url + "\">" + name + "</a></td>" +
                       "<td><a href=\"" + docs_url + "/en/latest/?badge=latest\" >" +
                           "<img src=\"https://readthedocs.org/projects/" + docs_name + "/badge/?version=latest\" alt='Documentation Status' />" +
                       "</a></td>" +
                        //"<td><a alt=\"docs url on readthedocs\" href=\"" + docs_url + "\">" + "docs" + "</a></td>" +
                        "<td>" + description + "</td>" +
                        "</tr>";
                  if (name != "dev.developer.skatelescope.org")
                      $(item).appendTo(list);
               }); //end each
              console.log(i + " projects");
           }); //end getJSON
       }else{ //if list not found
           console.log("list not found")
       }
    });
