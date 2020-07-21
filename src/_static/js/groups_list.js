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
       var pg1 = "https://gitlab.com/api/v4/groups/3180705/subgroups?per_page=50&order_by=name&sort=asc&simple=true&page=1";
       var pg2 = "https://gitlab.com/api/v4/groups/3180705/subgroups?per_page=50&order_by=name&sort=asc&simple=true&page=2";
       var pg3 = "https://gitlab.com/api/v4/groups/3180705/subgroups?per_page=50&order_by=name&sort=asc&simple=true&page=3";
       var readthedocs_prepend="ska-telescope-" // all the readthedocs projects start with ska-telescope- next to their name
       var list = $("#list-of-subgroups p:eq(1)");
       //console.log(list);
       //
       if( list.length ){
           list.empty();
           // add all pages
           //
           $.getJSON(pg1, function(data1){
            $.getJSON(pg2, function(data2){
             $.getJSON(pg3, function(data3){
               data = data1.concat(data2,data3);
               data.sort(dynamicSort("name"));
               $.each(data, function(key, val){
//                  console.log(val);
                  if(val["description"])
                      description = val["description"];
                  else
                      description = "";
                  gitlab_url = val["web_url"];
                  name = val["name"];
                  path = val["path"];
                        item ="<p>" +
                        "<a alt=\"repo url on gitlab\" href=\"" +
                        gitlab_url + "\">" + name + "</a><br>" +
                        description + "</p>" ;
                  if (name != "dev.developer.skatelescope.org")
                      $(item).appendTo(list);
               }); //end each
           }); //end getJSON
           }); //end getJSON
           }); //end getJSON
       }else{ //if list not found
       }
    });
