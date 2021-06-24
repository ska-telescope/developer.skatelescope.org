# SKA developer portal

[![Documentation Status](https://readthedocs.org/projects/developerskatelescopeorg/badge/)](https://developer.skao.int)

This project contains the code used to generate SKA
developer documentation hosted in the SKA developer
portal at developer.skao.int

## Detailed SKA documentation

This documentation details how software engineering practices in a number of
scenarios are implemented for the SKA telescope. The github repository is
owned by the *SAFe system team*, everyone is encouraged to submit changes using
pull requests.

## Contributing

The website uses restructured text and Python sphinx to compile
text files into html documentation. In order to contribute, you can
clone the repository and test your changes locally. 
### Set up your local environment using Poetry (recommended)

```bash
$ python get-poetry.py
$ poetry install
```

### Build your changes locally and open with browser
```bash
$ make html
$ browse build/html/index.html #linux
$ open build/html/index.html #macos
```

Once your local changes are compiling, you can request to update the documentation
via a pull request.
When the pull request gets merged, the online version of the website gets
automatically updated to the most recent version.
