-include .make/base.mk
-include .make/docs.mk

DOCS_SOURCEDIR=src
DOCS_BUILDDIR=build

# This is needed as long as the templates have pip install in before_script
docs-pre-build:
ifneq ($(strip $(CI_JOB_ID)),)
	poetry config virtualenvs.create false && poetry install --only docs
endif

docs-post-build:
ifneq ($(strip $(CI_JOB_ID)),)
	rm -rf public/$(CI_COMMIT_REF_SLUG) && mkdir -p public/$(CI_COMMIT_REF_SLUG) && cp -r build/html/* public/$(CI_COMMIT_REF_SLUG)/
endif