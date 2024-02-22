$(document).ready(
  (async function () {
    try {
      const loaders = new Map();
      const areas = ["sdp", "simulations", "mvp"];
      for (const area of areas) {
        // Show loader if list is empty
        const loader = new SimpleLoader(area);
        loader.show();
        loaders.set(area, loader);
      }
      const projects = await fetchProjectsWithPagination(); // From utils.js

      for (const area of areas) {
        const filteredProjects = filterProjectsByArea(projects, area);
        renderProjects(filteredProjects, area + " table");
        loaders.get(area).hide();
      }
    } catch (error) {
      console.error("Error fetching or processing projects:", error);
    }

    function filterProjectsByArea(projects, area) {
      return projects.filter((a) => a.tag_list.includes(area));
    }

    function renderProjects(projects, tableId) {
      const list = $("#" + tableId);
      list.empty();
      const projectTable = ProjectTable(projects); // From utils.js
      $(projectTable).appendTo(list);
    }
  })()
);
