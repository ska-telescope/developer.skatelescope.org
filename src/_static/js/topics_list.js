   jQuery(function(){
       var checklist = $("#software-modules-list p:eq(0)").text();
       var checklist = checklist.replace(/\s/g,''); // remove white space
       var checklist = checklist.split(':'); // split Topics from the tags
       var topics = checklist[0];
       var checklist = checklist[1].split(','); // get tag list
       var pg1 = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&simple=true&archived=false&include_subgroups=true&all_available=true&page=1";
       var pg2 = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&simple=true&archived=false&include_subgroups=true&all_available=true&page=2";
       var pg3 = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&simple=true&archived=false&include_subgroups=true&all_available=true&page=3";
       var list = $("#software-modules-list table");
       if( list.length && topics === "Topics" && checklist.length){
           list.empty();
           // concatenate all pages
           //
           $.getJSON(pg1, function(data1){
            $.getJSON(pg2, function(data2){
             $.getJSON(pg3, function(data3){
               data = data1.concat(data2,data3);
               // restrict the list to files with the rigt tags
               //
               data = data.filter( a => ($(checklist).not($(checklist).not(a.tag_list))).length > 0) ;    
               // sort by name
               //
               data.sort((a, b) => a["name"].localeCompare(b["name"]));  
               // build the table
               //
               item = ProjectTable(data);
               $(item).appendTo(list);
           }); //end getJSON
           }); //end getJSON
           }); //end getJSON
       }
    });
