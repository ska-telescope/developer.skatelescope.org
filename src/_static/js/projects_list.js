/**
 * Function to sort alphabetically an array of objects by some specific key.
 * 
 * @param {String} property Key of the object to sort.
 */
function dynamicSort(property) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}
   jQuery(function(){
       var ska = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&order_by=name&sort=asc&simple=true";
       var templ = "https://gitlab.com/api/v4/groups/5901724/projects?per_page=100&order_by=name&sort=asc&simple=true";
       var sdi = "https://gitlab.com/api/v4/groups/7480052/projects?per_page=100&order_by=name&sort=asc&simple=true";
       var gitlab_v4_endpoint = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&order_by=name&sort=asc&simple=true";
       var readthedocs_prepend="ska-telescope-" // all the readthedocs projects start with ska-telescope- next to their name
       var list = $("#list-of-projects tbody");
       var i = 1;
       //console.log(list);
       //
       if( list.length ){
           list.empty();
           // this nested approach works fine and it is easy to understand but if there are more urls involved 
           // then it should be changed to use $.when 
           //
           $.getJSON(sdi, function(data1){
            $.getJSON(templ, function(data2){
             $.getJSON(ska, function(data3){
               data = data1.concat(data2,data3);
               data.sort(dynamicSort("name"));
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
                           "<img src=\"https://readthedocs.org/projects/" + readthedocs_prepend + docs_name + "/badge/?version=latest\" alt='Documentation Status' />" +
                       "</a></td>" +
                        //"<td><a alt=\"docs url on readthedocs\" href=\"" + docs_url + "\">" + "docs" + "</a></td>" +
                        "<td>" + description + "</td>" +
                        "</tr>";
                  if (name != "dev.developer.skatelescope.org")
                      $(item).appendTo(list);
               }); //end each
              console.log(i + " projects");
           }); //end getJSON
           }); //end getJSON
           }); //end getJSON
       }else{ //if list not found
           console.log("list not found")
       }
    });
