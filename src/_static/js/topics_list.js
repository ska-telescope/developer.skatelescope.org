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
   // table header defaults for the theme
   var tbstart = "<blockquote><div><table class=\"docutils align-default\"><colgroup>" +
                 "<col style=\"width: 43%\" /><col style=\"width: 57%\" /></colgroup><thead>" + 
                 "<tr class=\"row-odd\"><th class=\"head\"><p>Documentation</p></th>" +
                 "<th class=\"head\"><p>Gitlab repository</p></th></tr></thead><tbody>" ;
       var readthedocs_prepend="ska-telescope-" // all the readthedocs projects start with ska-telescope- next to their name
       // these will query the api for the project list, including those in subgroups, we call it twice since the api
       // limits the return list to 100 and currently we have more than 100 projects
       var pg1 = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&order_by=name&sort=asc&simple=true&archived=false&include_subgroups=true&page=1";
       var pg2 = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&order_by=name&sort=asc&simple=true&archived=false&include_subgroups=true&page=2";
       //
       // replacement will be made on the second paragraph of this subsection, be careful to not change this in the document
       var topics = $("#list-of-subgroups p:eq(0)");
       //
       if( topics.length ){
           topics.empty();
           // add all pages
           //
           //var name = [] ;
           //var tag_list = [] ;
           //var gitlab_url = [] ;
           //var description = [] ;

           // due to the async nature of jquery
           // we need to chain the reading of the api information
           $.getJSON(pg1, function(data1){
            $.getJSON(pg2, function(data2){
              datag.sort(dynamicSort("name"));
              data = data1.concat(data2);
              data.sort(dynamicSort("name"));

              // data contains the full project list including the 
              // projects in subgroups

              // datag contains the subgroups list
              // extract their names, urls and ids
              //
              $.each(datag, function(k, val){
                 if(val["description"])
                     descriptiong = val["description"];
                 else
                     descriptiong = "";
                 if(val["web_url"])
                     gitlab_urlg = val["web_url"];
                 else
                     gitlab_urlg = "";
                 if(val["name"])
                     nameg = val["name"];
                 else
                     nameg = "";
                 if(val["tag_list"])
                     tag_list  = val["tag-list"];
                 else
                     tag_list  = "";

                 if (tag_list != ""){ 
                     // for collapsing the entry we use details and summary
                     //
                     itemg ="<p><details><summary>" + "<a alt=\"repo url on gitlab\" href=\"" +
                     gitlab_urlg + "\">" + nameg +  "</a></summary>" + descriptiong;
                     // we now need to build the table! 
                     // the trick is to check the namespace id of 
                            item = ""
                            $.each(data, function(k1, val1){
                                   aux=val1["namespace"] ;
                                   if (aux["tag_list"] === tag_list){
                                      if(val1["description"])
                                         description = val1["description"];
                                      else
                                         description = "";
                                      gitlab_url = val1["web_url"];
                                      name = val1["name"];
                                      path = val1["path"];
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
                                      if (name != "dev.developer.skatelescope.org"){
                                        item = item + "<tr>" + "<td><a href=\"" + docs_url + "/en/latest/?badge=latest\" >" +
                                        "<img src=\"https://readthedocs.org/projects/" + readthedocs_prepend + docs_name +
                                        "/badge/?version=latest\" alt='Documentation Status' style='height:125%;' /> " +  "</a></td>" +
                                        "<td><a alt=\"repo url on gitlab\" href=\"" + gitlab_url + "\">" + name + "</a><br>" + description +
                                        "</td>" + "</tr>";
                                       };
                                   };
                            }); // end each
                            // if item is not empty one needs to add the table details at
                            // start and end
                            if ( item != "")
                               item = tbstart + item + "</tbody></table></div></blockquote>"
                     // export this entry (don't forget to close details) only 
                     item = itemg + item + "</details></p>" ;
                     $(item).appendTo(topics);
                 }; // endif append
              }); //end each
             }); //end getJSON
           }); //end getJSON
      }else{ //if list not found
       }
    });
