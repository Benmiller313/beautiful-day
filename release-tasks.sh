#!/bin/bash

echo "Running Release Tasks"

python manage.py migrate --no-input

cd client && yarn build
python manage.py collectstatic --noinput