#!/bin/bash
# Activate the virtual environment
. /opt/venv/bin/activate

python manage.py makemigrations --noinput
python manage.py migrate --noinput
echo "Database Migration Complete"

python manage.py makesuper || true
echo "makesuper command complete"
