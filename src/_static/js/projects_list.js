   jQuery(function(){
       var gitlab_v4_endpoint = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&order_by=name&sort=asc&simple=true";
       var list = $("#list-of-projects tbody");
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
                  if(name == "developer.skatelescope.org")
                      docs_url = "https://developer.skatelescope.org";
                  else if(name == "web-maxiv-tangogql")
                      docs_url = "https://web-maxiv-tangogql.readthedocs.io";
                  else if(name == "webjive")
                      docs_url = "https://webjive.readthedocs.io";
                  else if(name == "WebJive Dashboards")
                      docs_url = "https://webjive-dashboards.readthedocs.io";
                  else if(name == "WebJive Auth")
                      docs_url = "https://webjive-auth.readthedocs.io";
                   else
                       docs_url = "https://developer.skatelescope.org/projects/" + docs_name;
                  item ="<tr>" +
                        "<td><a alt=\"repo url on gitlab\" href=\"" + gitlab_url + "\">" + name + "</a></td>" +
                       "<td><a href=\"" + docs_url + "/en/latest/?badge=latest\" >" +
                           "<img src=\"https://readthedocs.org/projects/" + docs_name + "/badge/?version=latest\" alt='Documentation Status' />" +
                       "</a></td>" +
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
