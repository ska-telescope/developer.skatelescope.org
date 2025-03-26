$(document).ready(
  (async function () {
    const areas = ["sdp", "simulations", "mvp"];
    const loaders = initializeLoaders(areas);
    try {
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
      return projects.filter((a) =>
        a.tag_list.some((tag) => tag.toLowerCase() === area.toLowerCase())
      );
    }    

    function renderProjects(projects, tableId) {
      const list = $("#" + tableId);
      list.empty();
      const projectTable = ProjectTable(projects); // From utils.js
      $(projectTable).appendTo(list);
    }
  })()
);
