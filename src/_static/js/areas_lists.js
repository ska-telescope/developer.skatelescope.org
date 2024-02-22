$(document).ready(
  (async function () {
    try {
      const projects = await fetchProjectsWithPagination(); // From utils.js
      const areas = ["sdp", "simulations", "skampi"];

      for (const area of areas) {
        const filteredProjects = filterProjectsByArea(projects, area);
        renderProjects(filteredProjects, area + " table");
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
