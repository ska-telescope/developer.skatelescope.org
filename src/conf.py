#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#
# developer.skao.int documentation build configuration file, created by
# sphinx-quickstart on Wed Dec 13 11:59:38 2017.
#
# This file is execfile()d with the current directory set to its
# containing dir.
#
# Note that not all possible configuration values are present in this
# autogenerated file.
#
# All configuration values have a default; values that are commented out
# serve to show the default.

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.')


def setup(app):
    app.add_css_file('css/custom.css')
    app.add_js_file('js/gitlab.js')
    app.add_js_file('js/groups_list.js')
    app.add_js_file('js/topics_list.js')
    app.add_js_file('js/project_table.js')
    app.add_js_file("js/feedback.js")

# -- General configuration ------------------------------------------------

# If your documentation needs a minimal Sphinx version, state it here.
#
# needs_sphinx = '1.0'


# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    "sphinx.ext.autodoc",
    "sphinx.ext.doctest",
    "sphinx.ext.intersphinx",
    "sphinx.ext.todo",
    "sphinx.ext.coverage",
    "sphinx.ext.mathjax",
    "sphinx.ext.ifconfig",
    "sphinx.ext.viewcode",
    "sphinx.ext.githubpages",
    "sphinx_gitstamp",
    "notfound.extension",
    "sphinx_copybutton",
    "sphinx.ext.autosectionlabel",
    "sphinx_design",
    "sphinx_rtd_theme",
    "sphinxcontrib.mermaid"
]

# Set each document name as prefix to avoid duplication
autosectionlabel_prefix_document = True

# 404 page configuration
notfound_context = {
    "body": "<h3>Unfortunately, we couldn't locate the object you are searching for, yet!</h3> <p> In the meantime, please feel free to explore the rest of the Portal!</p>",
}

notfound_no_urls_prefix = True

# Date format for git timestamps
gitstamp_fmt = "%b %d, %Y"

# Add any paths that contain templates here, relative to this directory.
templates_path = ["_templates"]

# The suffix(es) of source filenames.
# You can specify multiple suffix as a list of string:
#
# source_suffix = ['.rst', '.md']
source_suffix = ".rst"

# The master toctree document.
master_doc = "index"

# General information about the project.
project = "developer.skao.int"
copyright = "2018-2023 SKA Observatory"
author = "Marco Bartolini"

# The version info for the project you're documenting, acts as replacement for
# |version| and |release|, also used in various other places throughout the
# built documents.
#
# The short X.Y.Z version.
version = "1.0.0"
# The full version, including alpha/beta/rc pre-release tags.
release = "1.0.0"

# The language for content autogenerated by Sphinx. Refer to documentation
# for a list of supported languages.
#
# This is also used if you do content translation via gettext catalogs.
# Usually you set "language" from the command line for these cases.
language = "En-en"

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This patterns also effect to html_static_path and html_extra_path
exclude_patterns = []

# The name of the Pygments (syntax highlighting) style to use.
pygments_style = "sphinx"

# If true, `todo` and `todoList` produce output, else they produce nothing.
todo_include_todos = True


# -- Options for HTML output ----------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = "pydata_sphinx_theme"

# Theme options are theme-specific and customize the look and feel of a theme
# further.  For a list of options available for each theme, see the
# documentation.
#
html_static_path = ["_static"]

html_css_files = [
    'css/custom.css',
]

html_theme_options = {
    "navbar_start": ["navbar-logo","search-field",],
    # "navbar_center": [ "navbar-nav"],
    # "navbar_end": ["navbar-icon-links", "version-switcher"],
   "logo": {
      "image_light": "img/logo-default.png",
      "image_dark": "img/logo-dark.png",
   },
    "use_edit_page_button": True,
}

html_sidebars = {
    "**": ["sidebar-nav-bs.html", "sidebar-ethical-ads.html"]
}

html_logo = "_static/img/logo.png"
html_favicon = "_static/img/favicon_mono.ico"

html_context = {
    "theme_logo_only": True,
    "display_gitlab": True,  # Integrate Gitlab
    "gitlab_user": "ska-telescope",  # Username
    "gitlab_repo": "developer.skatelescope.org",  # Repo name
    "gitlab_version": "master",  # Version
    "conf_py_path": "/src/",  # Path in the checkout to the docs root
    # workaround for https://github.com/readthedocs/sphinx_rtd_theme/issues/701
    "theme_vcs_pageview_mode": "edit",
}

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ["_static"]

# Custom sidebar templates, must be a dictionary that maps document names
# to template names.
#
# This is required for the alabaster theme
# refs: http://alabaster.readthedocs.io/en/latest/installation.html#sidebars
# html_sidebars = {
#    '**': [
#        'navbar-nav.html',
#    ]
# }


# -- Options for HTMLHelp output ------------------------------------------

# Output file base name for HTML help builder.
htmlhelp_basename = "developerskatelescopeorgdoc"


# -- Options for LaTeX output ---------------------------------------------

latex_elements = {
    # The paper size ('letterpaper' or 'a4paper').
    #
    # 'papersize': 'letterpaper',
    # The font size ('10pt', '11pt' or '12pt').
    #
    # 'pointsize': '10pt',
    # Additional stuff for the LaTeX preamble.
    #
    # 'preamble': '',
    # Latex figure (float) alignment
    #
    # 'figure_align': 'htbp',
}

# Grouping the document tree into LaTeX files. List of tuples
# (source start file, target name, title,
#  author, documentclass [howto, manual, or own class]).
latex_documents = [
    (
        master_doc,
        "developerskatelescopeorg.tex",
        "developer.skao.int Documentation",
        "Marco Bartolini",
        "manual",
    ),
]


# -- Options for manual page output ---------------------------------------

# One entry per manual page. List of tuples
# (source start file, name, description, authors, manual section).
man_pages = [
    (
        master_doc,
        "developerskatelescopeorg",
        "developer.skao.int Documentation",
        [author],
        1,
    )
]


# -- Options for Texinfo output -------------------------------------------

# Grouping the document tree into Texinfo files. List of tuples
# (source start file, target name, title, author,
#  dir menu entry, description, category)
texinfo_documents = [
    (
        master_doc,
        "developerskatelescopeorg",
        "developer.skao.int Documentation",
        author,
        "developerskatelescopeorg",
        "One line description of project.",
        "Miscellaneous",
    ),
]


# -- Options for Epub output ----------------------------------------------

# Bibliographic Dublin Core info.
epub_title = project
epub_author = author
epub_publisher = author
epub_copyright = copyright

# The unique identifier of the text. This can be a ISBN number
# or the project homepage.
#
# epub_identifier = ''

# A unique identification for the text.
#
# epub_uid = ''

# A list of files that should not be packed into the epub file.
epub_exclude_files = ["search.html"]


# Example configuration for intersphinx: refer to the Python standard library.
intersphinx_mapping = {'python': ('https://docs.python.org/3', None)}

# %%
