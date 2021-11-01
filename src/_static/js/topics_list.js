// https://stackoverflow.com/questions/62337587/return-paginated-output-recursively-with-fetch-api
async function fetchRequest(url) {
  try {
    // Fetch request and parse as JSON
    const response = await fetch(url);
    let data = await response.json();

    // Extract the url of the response's "next" relational Link header
    let next_page;
    if (/<([^>]+)>; rel="next"/g.test(response.headers.get("link"))) {
      next_page = /<([^>]+)>; rel="next"/g.exec(
        response.headers.get("link")
      )[1];
    }

    // If another page exists, merge its output into the array recursively
    if (next_page) {
      data = data.concat(await fetchRequest(next_page));
    }
    return data;
  } catch (err) {
    return console.error(err);
  }
}

// Fill the topics table
function topicsList() {
  let areas = ["sdp", "simulations", "skampi"];
  let projectsUrl = new URL(
    "https://gitlab.com/api/v4/groups/3180705/projects?"
  );

  projectsUrl.searchParams.set("simple", "true");
  projectsUrl.searchParams.set("archived", "false");
  projectsUrl.searchParams.set("include_subgroups", "true");
  projectsUrl.searchParams.set("all_available", "true");
  projectsUrl.searchParams.set("per_page", "100");

  // get all results and fill the tables
  fetchRequest(projectsUrl).then((data) => {
    for (const area of areas) {
      var list = $("#" + area + " table");
      list.empty();
      // restrict the list to files with the right tag
      //
      const data_filtered = data.filter((a) => a.tag_list.includes(area));
      // sort by name
      //
      data_filtered.sort((a, b) => a["name"].localeCompare(b["name"]));
      // build the table
      //
      item = ProjectTable(data_filtered);
      $(item).appendTo(list);
    }
  });
}

topicsList();
