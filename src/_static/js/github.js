jQuery(function(){
    var github_v3_endpoint = "https://api.github.com/orgs/ska-telescope/repos";
    //var list = $("#list-of-projects div table tbody");
    var list = $("tbody");
    console.log(list);
    if( list.length ){
        list.empty();
        $.getJSON(github_v3_endpoint, function(data){
            $.each(data, function(key, val){
               //console.log(val);
               if(val["description"])
                   description = val["description"];
               else
                   description = "";
               github_url = val["html_url"];
               name = val["name"];
               docs_name = name.replace(/\./g,"");
               if(name == "developer.skatelescope.org")
                   docs_url = "https://developer.skatelescope.org";
                else
                    docs_url = "https://developer.skatelescope.org/projects/" + docs_name;
               item ="<tr>" + 
                     "<td><a alt=\"repo url on github\" href=\"" + github_url + "\">" + name + "</a></td>" +  
                    "<td><a href=\"" + docs_url + "/en/latest/?badge=latest\" >" +
                        "<img src=\"https://readthedocs.org/projects/" + docs_name + "/badge/?version=latest\" alt='Documentation Status' />" +
                    "</a></td>" +
                     //"<td><a alt=\"docs url on readthedocs\" href=\"" + docs_url + "\">" + "docs" + "</a></td>" +  
                     "<td>" + description + "</td>" +  
                     "</tr>";
               $(item).appendTo(list);
            }); //end each
        }); //end getJSON
    }else{ //if list not found
        console.log("list not found")
    }
	
	var ci_dashboard = "https://ska-telescope.gitlab.io/ska_ci_dashboard/";
    var dashboard_table = $("#ci-dashboard > table");
    if( dashboard_table.length ){
        $.get(ci_dashboard, function(data){
			// var s = document.createElement("script");
			// s.type = "text/javascript";
			// s.src = "//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js";
			// $("head").append(s);
			
			// $("<link/>", {
				   // rel: "stylesheet",
				   // type: "text/css",
				   // href: "//cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css"
				// }).appendTo("head");
			
			dashboard_table.html($(data).find("#dataTable"));			
        });
		
		// $(document).ready( function () {
			// dashboard_table.DataTable();
		// } );
    }
});
