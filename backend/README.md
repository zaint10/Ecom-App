
# Django Project Boilerplate

This repository is a boilerplate Django project for quickly getting started.

## Getting started

Steps:

1. Clone/pull/download this repository
2. Create a virtualenv with `python -m venv venv` and install dependencies with `pip install -r requirements.txt`
3. Configure your .env variables
4. Rename your project with `python manage.py rename <yourprojectname> <newprojectname>`

This project includes:

1. Django commands for renaming your project and creating a superuser
2.  VSCode Launch.json for running in Debugging mode and Pre lanch tasks for make migrationn and migrating in Debug Mode.
3. Using django-environ for handling environment variables
    1. After renaming the project, please make sure to edit file `core/management/makesuper.py` and change the import
    ```
    from demo import env
    from <your_project_name> import env
    ```
    2. Also, when running in debug mode using VsCode launcher, change the env var DJANGO_SETTINGS_MODULE=<your_project_name>.settings
---
