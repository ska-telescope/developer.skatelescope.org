async function fetchJSON(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fetchAllPages(baseURL) {
  let page = 1;
  let data = [];
  while (true) {
    const url = `${baseURL}&page=${page}`;
    const pageData = await fetchJSON(url);
    if (pageData.length === 0) break;
    data = [...data, ...pageData];
    page++;
  }
  return data;
}

async function queryProjectsAndSubgroups() {
  const subgroupsURL =
    "https://gitlab.com/api/v4/groups/3180705/subgroups?per_page=100&skip_groups=6051706,6429070,6051772&simple=true&all_available=true";
  const projectsURL =
    "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&simple=true&archived=false&include_subgroups=true&all_available=true";

  const projectList = document.querySelector(
    "#list-of-projects-and-subgroups p:nth-child(2)"
  );

  if (projectList) {
    projectList.innerHTML = "";
    const subgroupsData = await fetchAllPages(subgroupsURL);
    let projectsData = await fetchAllPages(projectsURL);

    subgroupsData.sort((a, b) => a["name"].localeCompare(b["name"]));

    subgroupsData.forEach((subgroup) => {
      const listItem = document.createElement("li");
      listItem.textContent = subgroup.name;
      projectList.appendChild(listItem);
    });

    projectsData.sort((a, b) => a["name"].localeCompare(b["name"]));

    projectsData.forEach((project) => {
      const listItem = document.createElement("li");
      listItem.textContent = project.name;
      projectList.appendChild(listItem);
    });
  }
}

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

function ProjectTable(data) {
  const readthedocsPrepend = "ska-telescope-";
  const table = document.createElement("table");
  table.classList.add("table", "table-striped", "table-hover"); // Bootstrap classes

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headers = ["Documentation", "Status", "Gitlab repository"];
  headers.forEach((headerText) => {
    const header = document.createElement("th");
    header.textContent = headerText;
    headerRow.appendChild(header);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  data.forEach((val) => {
    const { namespace, description, web_url, name, path } = val;
    const docsName = path.replace(/\./g, "");
    const docsUrl =
      name === "developer.skao.int"
        ? "https://developer.skao.int"
        : `https://developer.skao.int/projects/${docsName}`;

    const row = document.createElement("tr");

    const docCell = document.createElement("td");
    const docLink = document.createElement("a");
    docLink.href = `${docsUrl}/en/latest/?badge=latest`;
    docLink.textContent = name;
    docCell.appendChild(docLink);
    row.appendChild(docCell);

    const badgeCell = document.createElement("td");
    const badgeImage = document.createElement("img");
    badgeImage.src = `https://readthedocs.org/projects/${readthedocsPrepend}${docsName}/badge/?version=latest`;
    badgeImage.alt = "Documentation Status";
    badgeCell.appendChild(badgeImage);
    row.appendChild(badgeCell);

    const repoCell = document.createElement("td");
    const repoLink = document.createElement("a");
    repoLink.href = web_url;
    repoLink.textContent = name;
    const descriptionText = document.createTextNode(description || "");
    repoCell.appendChild(repoLink);
    repoCell.appendChild(document.createElement("br"));
    repoCell.appendChild(descriptionText);
    row.appendChild(repoCell);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  return table.outerHTML;
}
