# SKA developer portal

This project contains the code used to generate SKA 
developer documentation hosted in the SKA developer
portal at developer.skatelescope.org

## Detailed SKA documentation 

This documentation details how software engineering practices in a number of
scenarios are implemented for the SKA telescope. The github repository is
owned by the *SAFe system team*, eveyone is ecnouraged to submit changes using
pull requests.

## Contributing

The website uses restructured text and Python sphinx to compile
text files into html documentation. In order to contribute, you can
clone the repository and test your changes locally: 

```bash
$ pip install -r requirements.txt
$ make html 
$ browser build/html/index.html 
```

Once your local changes are compiling, you can request to update the documentation
via a pull request.
When the pull request gets merged, the online version of the wensite gets 
automatically updated to the most recent version. 

