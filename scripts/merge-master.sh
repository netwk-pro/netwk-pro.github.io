#!/bin/bash
git checkout audit-netlify
git pull origin audit-netlify
git merge master --no-edit
git push origin audit-netlify
