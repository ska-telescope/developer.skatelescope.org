jQuery(function(){
    var github_v3_endpoint = "https://api.github.com/orgs/ska-telescope/repos";
    var list = $("#list-of-projects > ul");
    if( list.length ){
        list.empty();
        $.getJSON(github_v3_endpoint, function(data){
            $.each(data, function(key, val){
               //console.log(val);
               if(val["description"])
                   description = val["description"];
               else
                   description = "";
               item = "<li><a href=\"" +
                      val["html_url"] +
                      "\">" +
                      val["name"] +
                      "</a> " +
                      description +
                      "</li>";
               $(item).appendTo(list);
            }); //end each
        }); //end getJSON
    }else{ //if list not found
        //console.log("list not found")
    }
	
	var ci_dashboard = "https://ska-telescope.gitlab.io/ska_ci_dashboard/";
    var dashboard_table = $("#ci-dashboard > table");
    if( dashboard_table.length ){
        $.get(ci_dashboard, function(data){
			var s = document.createElement("script");
			s.type = "text/javascript";
			s.src = "//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js";
			$("head").append(s);
			
			$("<link/>", {
				   rel: "stylesheet",
				   type: "text/css",
				   href: "//cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css"
				}).appendTo("head");
			
			dashboard_table.html($(data).find("#dataTable"));
			
			dashboard_table.DataTable();
        });
    }
});
