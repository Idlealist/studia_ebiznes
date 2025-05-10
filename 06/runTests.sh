#!/bin/bash

npx cypress run --headless

echo -e "\n==========================="
echo "Unit tests"
echo -e "===========================\n"

cd client && npm run test

echo -e "\n==========================="
echo "Go unit tests and api tests"
echo -e "===========================\n"

cd .. && cd server && go test
