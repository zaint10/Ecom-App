#!/bin/bash
# Activate the virtual environment
. /opt/venv/bin/activate

echo "Collecting static files"
python manage.py collectstatic --noinput

echo "Starting Server"
gunicorn app.wsgi:application bind "0.0.0.0:$PORT" --workers 4