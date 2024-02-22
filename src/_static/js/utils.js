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

// Add cache logic to fetchSubgroups
// to avoid unnecessary API requests.

const cacheExpiration = 60 * 1000; // 60 seconds

const subgroupCache = {}; // Simple object for caching

async function fetchSubgroups() {
  const cacheKey = "subgroups"; // Since you're likely fetching all subgroups at once

  if (
    subgroupCache[cacheKey] &&
    subgroupCache[cacheKey].timestamp + cacheExpiration > Date.now()
  ) {
    return subgroupCache[cacheKey]; // Return cached data
  }

  const subgroups = await fetch(buildSubgroupApiUrl()).then((response) =>
    response.json()
  );

  subgroupCache[cacheKey] = { timestamp: Date.now(), data: subgroups }; // Cache the results
  return subgroups;
}

// Add cache logic to fetchProjectsWithPagination
// to avoid unnecessary API requests.
const projectsCache = new {}();
async function fetchProjectsWithPagination() {
  let allProjects = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const cacheKey = `projects_page_${page}`;

    if (
      projectsCache[cacheKey] &&
      projectsCache[cacheKey].timestamp + cacheExpiration > Date.now()
    ) {
      allProjects = allProjects.concat(projectCache[cacheKey]);
    } else {
      const projectsResponse = await fetch(buildProjectApiUrl(page));
      const projectsPage = await projectsResponse.json();

      allProjects = allProjects.concat(projectsPage);
      projectsCache[cacheKey] = { timestamp: Date.now(), data: projectsPage }; // Cache this page
      projectsPage.forEach((project) => projectsCache.set(project.id, project));

      const linkHeader = projectsResponse.headers.get("Link");
      hasNextPage = hasLinkHeaderWithRel(linkHeader, "next");

      page++;
    }
  }

  return allProjects;
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
