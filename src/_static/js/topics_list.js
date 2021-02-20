   jQuery(function(){
       var checklist = $("#software-modules-list p:eq(0)").text();
       var checklist = checklist.replace(/\s/g,''); // remove white space
       var checklist = checklist.split(':'); // split Topics from the tags
       var topics = checklist[0];
       var checklist = checklist[1].split(','); // get tag list
       var pg1 = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&simple=true&archived=false&include_subgroups=true&all_available=true&page=1";
       var pg2 = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&simple=true&archived=false&include_subgroups=true&all_available=true&page=2";
       var pg3 = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&simple=true&archived=false&include_subgroups=true&all_available=true&page=3";
       var readthedocs_prepend="ska-telescope-"; // all the readthedocs projects start with ska-telescope- next to their name
       var list = $("#software-modules-list tbody");
       if( list.length && topics === "Topics" && checklist.length){
           list.empty();
           // concatenate all pages
           //
           $.getJSON(pg1, function(data1){
            $.getJSON(pg2, function(data2){
             $.getJSON(pg3, function(data3){
               data = data1.concat(data2,data3);
               // sort by name
               //
               data.sort((a,b) => a["name"].toLowerCase() > b["name"].toLowerCase());
               $.each(data, function(key, val){
                 tags = val["tag_list"] ;
                 var overlist=$(checklist).not($(checklist).not(tags));
                 if (overlist.length > 0){                     
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
                   else
                       docs_url = "https://developer.skatelescope.org/projects/" + docs_name;
                  item ="<tr>" +
                       "<td><a href=\"" + docs_url + "/en/latest/?badge=latest\" >" +
                           "<img src=\"https://readthedocs.org/projects/" + readthedocs_prepend + 
                         docs_name + "/badge/?version=latest\" alt=\"Documentation Status\" style=\"width:50%;\" /> " +  "</a></td>" +
                        "<td><a alt=\"repo url on gitlab\" href=\"" + gitlab_url + "\">" + name + "</a><br>" + description +
                       "</td>" +
                        "</tr>";
                       $(item).appendTo(list);
                   } //end if for overlist
               }); //end each
           }); //end getJSON
           }); //end getJSON
           }); //end getJSON
       }
    });
