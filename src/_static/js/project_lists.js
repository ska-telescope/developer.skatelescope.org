$(document).ready(function () {
  const list = $("#list-of-projects-and-subgroups p:eq(1)");
  const loader = new SimpleLoader("list-of-projects-and-subgroups");

  if (list.length) {
    list.empty();
    loader.show();
    fetchAndProcessData();
    loader.hide();
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
});
