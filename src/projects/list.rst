.. this title is converted into a DOM id and used
   for populating this page using Github APIs,
   Do not edit it

.. _list:

List of projects
----------------

The following table is automatically extracted from our github organisation page
at [https://gitlab.com/ska-telescope]

.. raw:: html

   <div class="wy-table-responsive"><table class="docutils align-default">
   <colgroup>
   <col style="width: 37%">
   <col style="width: 28%">
   <col style="width: 35%">
   </colgroup>
   <thead>
   <tr class="row-odd"><th class="head"><p>Github repository</p></th>
   <th class="head"><p>Documentation</p></th>
   <th class="head"><p>Description</p></th>
   </tr>
   </thead>
   <tbody>
      <tr><td><a alt="repo url on github" href="https://github.com/ska-telescope/CUDA_Degridder">CUDA_Degridder</a></td><td><a href="https://developer.skatelescope.org/projects/CUDA_Degridder/en/latest/?badge=latest"><img src="https://readthedocs.org/projects/CUDA_Degridder/badge/?version=latest" alt="Documentation Status"></a></td><td>Multi-threaded GPU based implementation of the SDP Imaging pipeline degridding module</td></tr><tr><td><a alt="repo url on github" href="https://github.com/ska-telescope/sdp-prototype">sdp-prototype</a></td><td><a href="https://developer.skatelescope.org/projects/sdp-prototype/en/latest/?badge=latest"><img src="https://readthedocs.org/projects/sdp-prototype/badge/?version=latest" alt="Documentation Status"></a></td><td>Prototype of SDP components required for configuration and execution of workflows</td></tr>
   </tbody>
   </table></div>

   <script type="text/javascript">
   jQuery(function(){
       var github_v3_endpoint = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&order_by=name&sort=asc";
       //var list = $("#list-of-projects div table tbody");
       var list = $("tbody");
       //console.log(list);
       if( list.length ){
           list.empty();
           $.getJSON(github_v3_endpoint, function(data){
               $.each(data, function(key, val){
                  console.log(val);
                  if(val["description"])
                      description = val["description"];
                  else
                      description = "";
                  gitlab_url = val["web_url"];
                  name = val["name"];
                  docs_name = name.replace(/\./g,"");
                  if(name == "developer.skatelescope.org")
                      docs_url = "https://developer.skatelescope.org";
                   else
                       docs_url = "https://developer.skatelescope.org/projects/" + docs_name;
                  item ="<tr>" +
                        "<td><a alt=\"repo url on github\" href=\"" + gitlab_url + "\">" + name + "</a></td>" +
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
    });

   </script>
