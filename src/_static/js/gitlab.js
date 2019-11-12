jQuery(function(){
	
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
