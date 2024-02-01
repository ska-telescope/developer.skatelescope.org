const gitlabApiBaseUrl = 'https://gitlab.com/api/v4';
const repository = '39571622';
const directory = 'ansible_collections/ska_collections/k8s/roles/kyverno/policies/default/';
const accessToken = '';
const headers = accessToken ? { 'PRIVATE-TOKEN': accessToken } : {};

function replaceValue(obj, targetKey, newValue) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (key === targetKey) {
                obj[key] = newValue;
            } else if (typeof obj[key] === 'object') {
                replaceValue(obj[key], targetKey, newValue);
            }
        }
    }
}

async function fetchData(file) {
    const url = `${gitlabApiBaseUrl}/projects/${repository}/repository/files/${encodeURIComponent(directory + file)}?ref=main`;

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

async function fetch_policies() {
    const url = `${gitlabApiBaseUrl}/projects/${repository}/repository/tree?path=${directory}&ref=main`;

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const files = data.map(entry => entry.name);
        const container = document.getElementById('container');

        for (const file of files) {
            const fileContent = await fetchData(file);

            const divHeader = document.createElement('strong');
            divHeader.className = 'head';
            divHeader.textContent = "Policy: "+file.replace(".yml", '').replace('yaml','');
            container.appendChild(divHeader);

            const divElement = document.createElement('div');
            divElement.style.whiteSpace = 'pre-wrap';
            divElement.className = 'highlight';
            divElement.id = file;
            rules = fileContent.spec.rules
            replaceValue(rules, 'cert', '<ca.pem>')

            divElement.textContent = jsyaml.dump(rules);

            container.appendChild(divElement);
        }
    } catch (error) {
        console.error('Error fetching file content:', error.message);
    }
};
window.onload = fetch_policies;