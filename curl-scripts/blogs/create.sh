#!/bin/bash

API="http://localhost:4741"
URL_PATH="/blogs"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "blog": {
      "body": "'"${BODY}"'",
      "title": "'"${TITLE}"'"
    }
  }'

echo
