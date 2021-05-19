function ProjectTable(data) {
    // override table header defaults for the theme
    var tbentry = "<table class=\"docutils align-default\"  style=\"width: 100%;\"><colgroup>" +
        "<col style=\"width: 20%;\" /><col style=\"width: 80%;\" /></colgroup><thead>" +
        "<tr class=\"row-odd\"><th class=\"head\"  style=\"width: 20%;\">Documentation</th>" +
        "<th class=\"head\"  style=\"width: 80%;\">Gitlab repository</th></tr></thead><tbody>";
    var readthedocs_prepend = "ska-telescope-" // all the readthedocs projects start with ska-telescope- next to their name
    $.each(data, function(key, val) {
        aux = val["namespace"];
        if (val["description"])
            description = val["description"];
        else
            description = "";
        gitlab_url = val["web_url"];
        name = val["name"];
        path = val["path"];
        docs_name = path.replace(/\./g, "");
        if (name == "developer.skao.int")
            docs_url = "https://developer.skao.int";
        else
            docs_url = "https://developer.skao.int/projects/" + docs_name;
        tbentry = tbentry + "<tr>" + "<td><a href=\"" + docs_url + "/en/latest/?badge=latest\" >" +
            "<img src=\"https://readthedocs.org/projects/" + readthedocs_prepend + docs_name +
            "/badge/?version=latest\" alt=\"Documentation Status\" style=\"width:100%;\" /> " + "</a></td>" +
            "<td><a alt=\"repo url on gitlab\" href=\"" + gitlab_url + "\">" + name + "</a><br>" + description +
            "</td>" + "</tr>";
    }); //end each
    tbentry = tbentry + "</tbody></table>";
    return tbentry
}