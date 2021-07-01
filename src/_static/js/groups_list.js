jQuery(function(){
  // this will query the gitlab api for the subgroup list
  var sbg = "https://gitlab.com/api/v4/groups/3180705/subgroups?per_page=100&skip_groups=6051706,6429070,6051772&simple=true&all_available=true&page=1";
  // these will query the api for the project list, including those in subgroups, we call it several times for the api
  // limits the return list to 100 and currently we have more than 100 projects
  var pg1 = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&simple=true&archived=false&include_subgroups=true&all_available=true&page=1";
  var pg2 = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&simple=true&archived=false&include_subgroups=true&all_available=true&page=2";
  var pg3 = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&simple=true&archived=false&include_subgroups=true&all_available=true&page=3";
  //
  // replacement will be made on the second paragraph of this subsection, be careful to not change this in the document
  var list = $("#list-of-projects-and-subgroups p:eq(1)");
  //
  if( list.length ){
     list.empty();
     // due to the async nature of jquery
     // we need to chain the reading of the api information
     $.getJSON(sbg, function(datag){
     $.getJSON(pg1, function(data1){
     $.getJSON(pg2, function(data2){
     $.getJSON(pg3, function(data3){
        datag.sort((a, b) => a["name"].localeCompare(b["name"]));      
        data = data1.concat(data2,data3);

        // datag contains the subgroups list
        // iterate over it
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
           dgid = data.filter( a => a["namespace"]["id"] === sgid) ;
           data = data.filter( a => a["namespace"]["id"] != sgid) ;
           if (sgid != ""){ 
              // for collapsing the entry we use details and summary
              //
              itemg ="<p><details><summary>" + "<a alt=\"repo url on gitlab\" href=\"" +
              gitlab_urlg + "\">" + nameg +  "</a></summary>" + descriptiong;
              dgid.sort((a, b) => a["name"].localeCompare(b["name"]));      
              item = ProjectTable(dgid);
              item = "<blockquote><div>" + item + "</div></blockquote>"
              // export this entry (don't forget to close details) only 
              item = itemg + item + "</details></p>" ;
              $(item).appendTo(list);
           }; // endif append
        }); //end each
        // The ones remaining are the non-grouped projects 
        if (data.length > 0){ 
           // We use the root gitlab address
           //
           itemg ="<p><details><summary>" + "<a alt=\"repo url on gitlab\" href=\"" +
           "https://gitlab.com/ska-telescope" + "\">" + "Non-grouped projects" +  "</a></summary>" + 
           "List of projects at the root of ska-telescope.";
           data.sort((a, b) => a["name"].localeCompare(b["name"]));      
           item = ProjectTable(data);
           item = "<blockquote><div>" + item + "</div></blockquote>"
           // export this entry (don't forget to close details) only 
           item = itemg + item + "</details></p>" ;
           $(item).appendTo(list);
        }; // endif append
     }); //end getJSON
     }); //end getJSON
     }); //end getJSON
     }); //end getJSON
  };
});
