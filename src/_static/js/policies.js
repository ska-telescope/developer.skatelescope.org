const gitlabApiBaseUrl = "https://gitlab.com/api/v4";
const repository = "39571622";
const directory =
  "ansible_collections/ska_collections/k8s/roles/kyverno/policies/default/";
const accessToken = "";
const headers = accessToken ? { "PRIVATE-TOKEN": accessToken } : {};
import * as webllm from "./webllm.js";

function replaceValue(obj, targetKey, newValue) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key === targetKey) {
        obj[key] = newValue;
      } else if (typeof obj[key] === "object") {
        replaceValue(obj[key], targetKey, newValue);
      }
    }
  }
}

async function fetchData(file) {
  const url = `${gitlabApiBaseUrl}/projects/${repository}/repository/files/${encodeURIComponent(
    directory + file
  )}?ref=main`;

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const fileContent = atob(data.content);
    const yamlContent = jsyaml.load(fileContent);
    return yamlContent;
  } catch (error) {
    console.error(`Error fetching ${file}:`, error.message);
  }
}

function setLabel(id, text) {
  const label = document.getElementById(id);
  if (label == null) {
    throw Error("Cannot find label " + id);
  }
  label.innerText = text;
}

async function fetch_policies() {
  const url = `${gitlabApiBaseUrl}/projects/${repository}/repository/tree?path=${directory}&ref=main`;

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const files = data.map((entry) => entry.name);
    const container = document.getElementById("container");

    for (const file of files) {
      const fileContent = await fetchData(file);

      const divHeader = document.createElement("strong");
      divHeader.className = "head";
      divHeader.textContent =
        "Policy: " + file.replace(".yml", "").replace("yaml", "");
      container.appendChild(divHeader);

      const divElement = document.createElement("div");
      divElement.style.whiteSpace = "pre-wrap";
      divElement.className = "highlight";
      divElement.id = file;
      const rules = fileContent.spec.rules;
      replaceValue(rules, "cert", "<ca.pem>");
      const yamlContent = jsyaml.dump(rules);
      divElement.textContent = yamlContent;

      container.appendChild(divElement);

      // add a new line to the container
      const br = document.createElement("br");
      container.appendChild(br);

      const divDescription = document.createElement("div");
      container.appendChild(divDescription);
      // add a h4 element with title Init to the container
      const h4Init = document.createElement("h4");
      h4Init.textContent = "Init";
      divDescription.appendChild(h4Init);

      // create a label element with id init-label and add it to the container
      const initLabel = document.createElement("label");
      initLabel.id =
        "init-label" + file.replace(".yml", "").replace("yaml", "");
      divDescription.appendChild(initLabel);

      // add a h4 element with title Description to the container
      const h4Description = document.createElement("h4");
      h4Description.textContent = "Description";
      divDescription.appendChild(h4Description);

      // create a label element with id generate-label and add it to the container
      const generateLabel = document.createElement("label");
      generateLabel.id =
        "generate-label" + file.replace(".yml", "").replace("yaml", "");
      divDescription.appendChild(generateLabel);

      // Add a paragpraph that will be used to display the policy description
      const chat = new webllm.ChatModule();
      chat.setInitProgressCallback((report) => {
        setLabel(
          "init-label" + file.replace(".yml", "").replace("yaml", ""),
          report.text
        );
      });

      await chat.reload("Llama-2-7b-chat-hf-q4f32_1");
      //   await chat.reload("RedPajama-INCITE-Chat-3B-v1-q4f32_1");

      const generateProgressCallback = (_step, message) => {
        setLabel(
          "generate-label" + file.replace(".yml", "").replace("yaml", ""),
          message
        );
      };

      const prompt =
        "Explain the following Kyverno Policy to a software application developer. Be concise as possible and focus what it means for the developer without going into too much detail. Write it as if this is written in a documentation webpage so you should only output 3 or 4 sentences\n";

      const yamlSummary = await chat.generate(
        prompt + yamlContent,
        generateProgressCallback
      );
      console.log(prompt + yamlContent);
      console.log(await chat.runtimeStatsText());
    }
  } catch (error) {
    console.error("Error fetching file content:", error.message);
  }
}
window.onload = fetch_policies;
