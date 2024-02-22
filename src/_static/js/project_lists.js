$(document).ready(function () {
  const list = $("#list-of-projects-and-subgroups p:eq(1)");

  if (list.length) {
    list.empty();
    fetchAndProcessData();
  }

  async function fetchAndProcessData() {
    try {
      const subgroups = await fetchSubgroups();
      const projects = await fetchProjectsWithPagination();

      const processedData = processData(subgroups, projects);
      renderProjects(processedData);
    } catch (error) {
      console.error("Error fetching or processing data:", error);
      // Add error handling as needed
    }
  }

  function fetchSubgroups() {
    return fetch(buildSubgroupApiUrl()).then((response) => response.json());
  }

  async function fetchProjectsWithPagination() {
    let allProjects = [];
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const projectsResponse = await fetch(buildProjectApiUrl(page));
      const projectsPage = await projectsResponse.json();

      allProjects = allProjects.concat(projectsPage);

      const linkHeader = projectsResponse.headers.get("Link");
      hasNextPage = hasLinkHeaderWithRel(linkHeader, "next");

      page++;
    }

    return allProjects;
  }

  function buildSubgroupApiUrl() {
    const baseUrl = "https://gitlab.com/api/v4/groups/3180705/subgroups";
    const queryParams = new URLSearchParams({
      per_page: 100,
      skip_groups: "6051706,6429070,6051772",
      simple: true,
      all_available: true,
      page: 1,
    });
    return `${baseUrl}?${queryParams.toString()}`;
  }

  function buildProjectApiUrl(page = 1) {
    const baseUrl = "https://gitlab.com/api/v4/groups/3180705/projects";
    const queryParams = new URLSearchParams({
      per_page: 100,
      simple: true,
      archived: false,
      include_subgroups: true,
      all_available: true,
      page,
    });
    return `${baseUrl}?${queryParams.toString()}`;
  }

  function hasLinkHeaderWithRel(linkHeader, relValue) {
    if (!linkHeader) return false;

    const links = linkHeader.split(",");
    return links.some((link) => {
      const segments = link.split(";");
      return segments.some((segment) => {
        const relMatch = segment.match(/rel="(.+?)"/);
        return relMatch && relMatch[1] === relValue;
      });
    });
  }

  function processData(subgroups, projects) {
    // 1. Filtering Projects by Subgroup
    const projectsBySubgroup = {};
    subgroups.forEach((subgroup) => {
      projectsBySubgroup[subgroup.id] = projects.filter(
        (project) => project.namespace.id === subgroup.id
      );
    });

    // 2. Sorting (you might have more complex sorting logic)
    subgroups.sort((a, b) => a.name.localeCompare(b.name));

    // 3. Data Structure for Rendering
    const processedData = subgroups.map((subgroup) => {
      return {
        subgroup: subgroup,
        projects: projectsBySubgroup[subgroup.id].sort((a, b) =>
          a.name.localeCompare(b.name)
        ),
      };
    });

    // Include Ungrouped Projects
    const ungroupedProjects = projects.filter(
      (project) => !subgroups.some((sg) => sg.id === project.namespace.id)
    );
    if (ungroupedProjects.length > 0) {
      processedData.push({
        subgroup: {
          name: "Non-grouped projects",
          description: "List of projects at the root of ska-telescope.",
          web_url: "https://gitlab.com/ska-telescope",
        },
        projects: ungroupedProjects.sort((a, b) =>
          a.name.localeCompare(b.name)
        ),
      });
    }

    return processedData;
  }

  function renderProjects(data) {
    list.empty(); // Assuming 'list' is your target container

    data.forEach((group) => {
      const { subgroup, projects } = group;

      // Create details/summary element
      const item = $(`
      <p>
        <details>
          <summary>
             <a alt="repo url on gitlab" href="${subgroup.web_url}">${
        subgroup.name
      }</a>
          </summary>
          ${subgroup.description} 
          <blockquote><div>${ProjectTable(projects)}</div></blockquote>
        </details>
      </p>
    `);

      item.appendTo(list);
    });
  }

  function ProjectTable(data) {
    const readthedocsPrepend = "ska-telescope-";

    const table = document.createElement("table");
    table.classList.add("docutils", "align-default");

    const colgroup = document.createElement("colgroup");
    colgroup.innerHTML =
      '<col style="width: 30%;" /><col style="width: 20%;" /><col style="width: 50%;" />';
    table.appendChild(colgroup);

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
});

// AREA PAGE

// // https://stackoverflow.com/questions/62337587/return-paginated-output-recursively-with-fetch-api
// async function fetchRequest(url) {
//   try {
//     // Fetch request and parse as JSON
//     const response = await fetch(url);
//     let data = await response.json();

//     // Extract the url of the response's "next" relational Link header
//     let next_page;
//     if (/<([^>]+)>; rel="next"/g.test(response.headers.get("link"))) {
//       next_page = /<([^>]+)>; rel="next"/g.exec(
//         response.headers.get("link")
//       )[1];
//     }

//     // If another page exists, merge its output into the array recursively
//     if (next_page) {
//       data = data.concat(await fetchRequest(next_page));
//     }
//     return data;
//   } catch (err) {
//     return console.error(err);
//   }
// }

// // Fill the topics table
// function topicsList() {
//   let areas = ["sdp", "simulations", "skampi"];
//   let projectsUrl = new URL(
//     "https://gitlab.com/api/v4/groups/3180705/projects?"
//   );

//   projectsUrl.searchParams.set("simple", "true");
//   projectsUrl.searchParams.set("archived", "false");
//   projectsUrl.searchParams.set("include_subgroups", "true");
//   projectsUrl.searchParams.set("all_available", "true");
//   projectsUrl.searchParams.set("per_page", "100");

//   // get all results and fill the tables
//   fetchRequest(projectsUrl).then((data) => {
//     for (const area of areas) {
//       var list = $("#" + area + " table");
//       list.empty();
//       // restrict the list to files with the right tag
//       //
//       const data_filtered = data.filter((a) => a.tag_list.includes(area));
//       // sort by name
//       //
//       data_filtered.sort((a, b) => a["name"].localeCompare(b["name"]));
//       // build the table
//       //
//       item = ProjectTable(data_filtered);
//       $(item).appendTo(list);
//     }
//   });
// }

// function ProjectTable(data) {
//   const readthedocsPrepend = "ska-telescope-";
//   const table = document.createElement("table");
//   table.classList.add("table", "table-striped", "table-hover"); // Bootstrap classes

//   const thead = document.createElement("thead");
//   const headerRow = document.createElement("tr");
//   const headers = ["Documentation", "Status", "Gitlab repository"];
//   headers.forEach((headerText) => {
//     const header = document.createElement("th");
//     header.textContent = headerText;
//     headerRow.appendChild(header);
//   });
//   thead.appendChild(headerRow);
//   table.appendChild(thead);

//   const tbody = document.createElement("tbody");
//   data.forEach((val) => {
//     const { namespace, description, web_url, name, path } = val;
//     const docsName = path.replace(/\./g, "");
//     const docsUrl =
//       name === "developer.skao.int"
//         ? "https://developer.skao.int"
//         : `https://developer.skao.int/projects/${docsName}`;

//     const row = document.createElement("tr");

//     const docCell = document.createElement("td");
//     const docLink = document.createElement("a");
//     docLink.href = `${docsUrl}/en/latest/?badge=latest`;
//     docLink.textContent = name;
//     docCell.appendChild(docLink);
//     row.appendChild(docCell);

//     const badgeCell = document.createElement("td");
//     const badgeImage = document.createElement("img");
//     badgeImage.src = `https://readthedocs.org/projects/${readthedocsPrepend}${docsName}/badge/?version=latest`;
//     badgeImage.alt = "Documentation Status";
//     badgeCell.appendChild(badgeImage);
//     row.appendChild(badgeCell);

//     const repoCell = document.createElement("td");
//     const repoLink = document.createElement("a");
//     repoLink.href = web_url;
//     repoLink.textContent = name;
//     const descriptionText = document.createTextNode(description || "");
//     repoCell.appendChild(repoLink);
//     repoCell.appendChild(document.createElement("br"));
//     repoCell.appendChild(descriptionText);
//     row.appendChild(repoCell);

//     tbody.appendChild(row);
//   });

//   table.appendChild(tbody);
//   return table.outerHTML;
// }

// topicsList();
