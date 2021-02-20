   jQuery(function(){
   // table header defaults for the theme
   var tbstart = "<blockquote><div><table class=\"docutils align-default\"  style=\"width: 100%;\"><colgroup>" +
                 "<col style=\"width: 20%;\" /><col style=\"width: 80%;\" /></colgroup><thead>" + 
                 "<tr class=\"row-odd\"><th class=\"head\"  style=\"width: 20%;\"><p>Documentation</p></th>" +
                 "<th class=\"head\"  style=\"width: 80%;\"><p>Gitlab repository</p></th></tr></thead><tbody>" ;
       var readthedocs_prepend="ska-telescope-" // all the readthedocs projects start with ska-telescope- next to their name
       // this will query the gitlab api for the subgroup list
       var sbg = "https://gitlab.com/api/v4/groups/3180705/subgroups?per_page=100&skip_groups=6051706,6429070,6051772&simple=true&all_available=true&page=1";
       // these will query the api for the project list, including those in subgroups, we call it twice since the api
       // limits the return list to 100 and currently we have more than 100 projects
       var pg1 = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&simple=true&archived=false&include_subgroups=true&all_available=true&page=1";
       var pg2 = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&simple=true&archived=false&include_subgroups=true&all_available=true&page=2";
       var pg3 = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&simple=true&archived=false&include_subgroups=true&all_available=true&page=3";
       //
       // replacement will be made on the second paragraph of this subsection, be careful to not change this in the document
       var list = $("#list-of-subgroups p:eq(1)");
       //
       if( list.length ){
           list.empty();
           // add all pages
           //
           //var name = [] ;
           //var sgid = [] ;
           //var gitlab_url = [] ;
           //var description = [] ;

           // due to the async nature of jquery
           // we need to chain the reading of the api information
           $.getJSON(sbg, function(datag){
            $.getJSON(pg1, function(data1){
             $.getJSON(pg2, function(data2){
             $.getJSON(pg3, function(data3){
               data.sort((a, b) => a["name"].localeCompare(b["name"]));      
               data = data1.concat(data2,data3);
               data.sort((a, b) => a["name"].localeCompare(b["name"]));      

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
                  if(val["id"])
                      sgid  = val["id"];
                  else
                      sgid  = "";

                  if (sgid != ""){ 
                      // for collapsing the entry we use details and summary
                      //
                      itemg ="<p><details><summary>" + "<a alt=\"repo url on gitlab\" href=\"" +
                      gitlab_urlg + "\">" + nameg +  "</a></summary>" + descriptiong;
                      // we now need to build the table! 
                      // the trick is to check the namespace id of 
                             item = ""
                             $.each(data, function(k1, val1){
                                    aux=val1["namespace"] ;
                                    if (aux["id"] === sgid){
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
                                         "/badge/?version=latest\" alt=\"Documentation Status\" style=\"width:100%;\" /> " +  "</a></td>" +
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
                      $(item).appendTo(list);
                  }; // endif append
               }); //end each
              }); //end getJSON
            }); //end getJSON
           }); //end getJSON
           }); //end getJSON
      }else{ //if list not found
       }
    });
