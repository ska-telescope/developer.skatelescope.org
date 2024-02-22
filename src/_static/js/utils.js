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

async function fetchSubgroups() {
  const cacheKey = "subgroups";
  const cacheExpiration = 60 * 1000; // Example: Expire after 60 seconds

  if (sessionStorage.getItem(cacheKey)) {
    const cachedData = JSON.parse(sessionStorage.getItem(cacheKey));
    if (cachedData && cachedData.timestamp + cacheExpiration > Date.now()) {
      return cachedData.data; // Return cached subgroups
    }
  }

  const subgroups = await fetch(buildSubgroupApiUrl()).then((response) =>
    response.json()
  );

  sessionStorage.setItem(
    cacheKey,
    JSON.stringify({ timestamp: Date.now(), data: subgroups })
  );
  return subgroups;
}

async function fetchProjectsPage(page) {
  const cacheKey = `projectsPage_${page}`;
  const cacheExpiration = 60 * 1000; // Example: Expire after 60 seconds
  let hasNextPage = false; // Default to false

  // Try to retrieve cached data
  const cachedData = sessionStorage.getItem(cacheKey);
  if (cachedData) {
    const parsedData = JSON.parse(cachedData);
    if (parsedData && parsedData.timestamp + cacheExpiration > Date.now()) {
      // Additionally check if we have a cached indicator for hasNextPage
      hasNextPage = parsedData.hasNextPage;
      return { projectsPage: parsedData.data, hasNextPage };
    }
  }

  // Fetch data from the API if no valid cache is found
  const response = await fetch(buildProjectApiUrl(page));
  if (!response.ok) {
    throw new Error("Failed to fetch projects: " + response.statusText);
  }
  const projectsPage = await response.json();

  // Use the 'Link' header to determine if there's a next page
  const linkHeader = response.headers.get("Link");
  hasNextPage = hasLinkHeaderWithRel(linkHeader, "next");

  // Update the cache with the new data and the hasNextPage indicator
  sessionStorage.setItem(
    cacheKey,
    JSON.stringify({ timestamp: Date.now(), data: projectsPage, hasNextPage })
  );

  return { projectsPage, hasNextPage };
}

async function fetchProjectsWithPagination() {
  let allProjects = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const { projectsPage, hasNextPage: nextPageExists } =
      await fetchProjectsPage(page);
    allProjects = allProjects.concat(projectsPage);
    hasNextPage = nextPageExists; // Update based on the current page's response
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

class SimpleLoader {
  constructor(targetElementId) {
    this.targetElement = document.getElementById(targetElementId);
    this.loader = document.createElement("div");
    this.loader.style.width = "50px";
    this.loader.style.height = "50px";
    this.loader.style.border = "5px solid #f3f3f3";
    this.loader.style.borderTop = "5px solid #070068";
    this.loader.style.borderRadius = "50%";
    this.loader.style.animation = "spin 2s linear infinite";
    this.loader.style.margin = "auto";
    this.loader.style.display = "none";

    // Add the loader to the target element
    this.targetElement.insertBefore(this.loader, this.targetElement.children[1]);

    // Add CSS for animation
    const style = document.createElement("style");
    style.innerHTML = `@keyframes spin {0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}`;
    document.head.appendChild(style);
  }

  show() {
    this.loader.style.display = "block";
  }

  hide() {
    this.loader.style.display = "none";
  }
}
