#!/bin/bash

echo "Running Release Tasks"

python manage.py migrate --no-input
