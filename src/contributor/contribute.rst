.. _contribute:

Contribute to the developer portal
**********************************

# Sphinx documentation


## Quick start 

### Direct Contribution

You can use the `Edit on GitLab` (TODO: need to add a picture!) button to directly contribute to a page. After logging in, this will open GitLab's edit page window in which depending on your permissions:

- could use GitLab's Edit Window to make your changes and push to a branch, then create a Merge Request
- or use fork option(TODO: need to add a picture!) and then follow the same steps: use GitLab's Edit Window to make your changes and push to a branch, then create a Merge Request from your fork to the developer portal project. Note; creation of the fork will be handled automatically.

Then, you can follow the Merge Request page for status updates, make new contributions directly or by setting up your local development as described below.


### Static build


First install dependencies:

```
pipenv install --dev
```

Build the documentation locally:

```
pipenv run make html
```

This will create a subdirectory `/build/html`. To browse the documents created
open `/build/html/index.html` in a web browser.

