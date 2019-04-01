# MDHS Blog Backend
Hi all and welcome to the GitHub Repo for the MDHS Blog back end.
This project is a blog comment where users are able to log in, post, and comment.
This repo is for the API and back end of this project. For the front end please visit <https://github.com/m-d-h-s/mdhs-blog-frontend>
The deployed api is available at <https://mdhs-blog-backend.herokuapp.com/>
The deployed site is available at <https://m-d-h-s.github.io/mdhs-blog-frontend/>

## Description
Its 1999. Myspace is the rage. Enter, the MDHS Blog. Can this new blogging platform make a dent?
Probably not but it was fun to make.

## Technology
### Front End
- [HTML 5](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [jQuery](https://api.jquery.com/)
- [Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/introduction/)
- [Handlebars JS](https://handlebarsjs.com/)

### Back End
- [MongoDB](https://docs.mongodb.com/)
- [Mongoose](https://mongoosejs.com/docs/api.html)
- [Express](https://expressjs.com/en/4x/api.html)

## How it works
Front end makes ajax requests to the API.
the API is a RESTful API built using Express.Js. The API then queries a non-relational database built in MongoDB.
JavaScript parses the JSON and renders pieces of it on the page using Handlebars. That HTML is stylized using bootstrap and custom SASS. Event listeners are attached with JQuery and page manipulation is handled by JavaScript

## Planning
Planning was handled in a series of meetings guided by the requirements document, the prompt for our group and users stories. These were broken out into a list of necessary steps to achieve MVP in our [planning document](https://docs.google.com/document/d/1TxQ9B5Qk-sSy-RYfSC8yyhHI-wttremlUV2TkMCKOP0/edit?usp=sharing).
To keep on track we've had two stand ups per day and

## Problem solving
- Check that the problem is a requirment
- Double check that its actually a requirement
- Read the error message
- Check for plurlalization/capitalization
- Check syntax
- Check if the code thats giving you trouble works somewhere else
- Simplify the code/process
- Console log paramaters
- Console log output
- Try running code again
- Try do do it differently if none of the above worked and you still get the same error message


## Entity Relationship Diagram
[Initial ERD is located in the planning doc](https://docs.google.com/document/d/1TxQ9B5Qk-sSy-RYfSC8yyhHI-wttremlUV2TkMCKOP0/edit?usp=sharing)

Current ERD
```
user|-has many<|Blogs|-has many<|Comments|-owned by-|user
```

## Known Issues
Site is not pretty (in progress)

## Wireframes
Wireframe is available at the bottom of the [planning document](https://docs.google.com/document/d/1TxQ9B5Qk-sSy-RYfSC8yyhHI-wttremlUV2TkMCKOP0/edit?usp=sharing)

## User stories
As a unregistered user, I would like to sign up with email and password.
As a registered user, I would like to sign in with email and password.
As a signed in user, I would like to change password.
As a signed in user, I would like to sign out.
As a unregistered user, I would like to see all users blog posts.
As a unregistered user, I would like to see comments on those blog posts.
As a signed in user, I would to create blog posts.
As a signed in user, I would to comment on other users' blog posts.
As a signed in user, I would to update my blog posts and comments.
As a signed in user, I would to delete my blog posts and comments.


## Potential Future Improvements
- Meta
  - find a better way to identify and catalog necessary UX improvements

- UI Improvements
  - Improve color scheme (in progress)
  - Create a visual hierarchy (in progress)
  - move buttons to more intuative locations (complete)
  - create a dropdown for user actions (complete)
  - create a user profile page

- Features
  - Tagging
  - Search Bar (complete)
  - Add a gps pin to a post
  - Allow users to upload photos
  - Give users display names (complete)
  - Likes feature (complete)

-DB Changes
  - Require users to create a display name (complete)
  - Add tagging features


## API

Scripts are included in [`curl-scripts`](curl-scripts) to test built-in actions. Add your
own scripts to test your custom API. As an alternative, you can write automated
tests in RSpec to test your API.

### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users.post(/sign-up)`    |
| POST   | `/sign-in`             | `users.post(/sign-in)`    |
| PATCH  | `/change-password`     | `users.patch(/change-password)`  |
| DELETE | `/sign-out`            | `users.delete(/sign-out)`   |

#### POST /sign-up

Request:

```sh
curl http://localhost:4741/sign-up \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'",
      "password_confirmation": "'"${PASSWORD}"'"
    }
  }'
```

```sh
EMAIL=ava@bob.com PASSWORD=hannah curl-scripts/auth/sign-up.sh
```

Response:

```md
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "ava@bob.com"
  }
}
```

#### POST /sign-in

Request:

```sh
curl http://localhost:4741/sign-in \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
    }
  }'
```

```sh
EMAIL=ava@bob.com PASSWORD=hannah curl-scripts/auth/sign-in.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "ava@bob.com",
    "token": "BAhJIiVlZDIwZTMzMzQzODg5NTBmYjZlNjRlZDZlNzYxYzU2ZAY6BkVG--7e7f77f974edcf5e4887b56918f34cd9fe293b9f"
  }
}
```

#### PATCH /change-password

Request:

```sh
curl --include --request PATCH "http://localhost:4741/change-password" \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "'"${OLDPW}"'",
      "new": "'"${NEWPW}"'"
    }
  }'
```

```sh
OLDPW='hannah' NEWPW='elle' TOKEN='BAhJIiVlZDIwZTMzMzQzODg5NTBmYjZlNjRlZDZlNzYxYzU2ZAY6BkVG--7e7f77f974edcf5e4887b56918f34cd9fe293b9f' sh curl-scripts/auth/change-password.sh
```

Response:

```md
HTTP/1.1 204 No Content
```

#### DELETE /sign-out

Request:

```sh
curl http://localhost:4741/sign-out \
  --include \
  --request DELETE \
  --header "Authorization: Token token=$TOKEN"
```

```sh
TOKEN='BAhJIiVlZDIwZTMzMzQzODg5NTBmYjZlNjRlZDZlNzYxYzU2ZAY6BkVG--7e7f77f974edcf5e4887b56918f34cd9fe293b9f' sh curl-scripts/auth/sign-out.sh
```

Response:

```md
HTTP/1.1 204 No Content
```


### Blog
| Verb    | URI Pattern           | Route Action  |
|---------|-----------------------|-------------------|
| POST    | `/blogs`             | `create`    |
| GET     | `/blogs`             | `blogs#index`    |
| GET     | `/blogs/:id`         | `blogs#show`     |
| PATCH   | `/blogs/:id`         | `blogs#update`   |
| DELETE  | `/blogs/:id`         | `blogs#destroy`  |
| PATCH   |  `/likes/:id`        | `blogs#update`   |
#### POST /blogs
Request:

```sh
curl "http://localhost:4741/blogs" \
  --include \
  --request POST \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "blog": {
      "title": "'"${TITLE}"'",
      "body": "'"${BODY}"'"
    }
  }'
```

Response:
#### GET /blogs
Request:
```sh
curl "http://localhost:4741/blogs" \
  --include \
  --request GET \
  ```

#### GET /my-blogs
Request:
```sh
curl "http://localhost:4741/my-blogs" \
  --include \
  --request GET \
  --header "Authorization: Token token=${TOKEN}"
  ```
Response:
#### GET /blogs/:id
Request:
```sh
curl "http://localhost:4741/blogs/${ID}" \
  --include \
  --request GET \
  ```

#### PATCH /blogs/:id
Request:
```sh
curl "http://localhost:4741/blogs/${ID}" \
  --include \
  --header "Authorization: Token token=${TOKEN}" \
  --request PATCH \
  --header "Content-Type: application/json" \
  --data '{
    "blog": {
      "title": "'"${TITLE}"'",
      "body": "'"${BODY}"'"
    }
  }'
```

#### DELETE  /blogs/:id
Request:
```sh
curl "http://localhost:4741/blogs/${ID}" \
  --include \
  --header "Authorization: Token token=${TOKEN}" \
  --request DELETE \
```

### comments
| Verb    | URI Pattern           | Route Action  |
|---------|-----------------------|-------------------|
| POST    | `/comments`             | `router.create(/comments)`    |
| GET     | `/comments`             | `router.index(/comments)`    |
| GET     | `/comments/:id`         | `router.show(/comments/:id)`     |
| PATCH   | `/comments/:id`         | `router.patch(/comments/:id)`   |
| DELETE  | `/comments/:id`         | `router.delete(/comments/:id)`  |


#### POST /comments
Request:

```sh
curl "http://localhost:4741/comments" \
  --include \
  --request POST \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "comment": {
      "text": "'"${TEXT}"'"
    }
  }'
```

Response:
#### GET /comments
Request:
```sh
curl "http://localhost:4741/comments" \
  --include \
  --request GET \
  ```

#### GET /my-comments
Request:
```sh
curl "http://localhost:4741/my-comments" \
  --include \
  --request GET \
  --header "Authorization: Token token=${TOKEN}"
  ```
Response:
#### GET /comments/:id
Request:
```sh
curl "http://localhost:4741/comments/${ID}" \
  --include \
  --request GET \
  ```

#### PATCH /comments/:id
Request:
```sh
curl "http://localhost:4741/comments/${ID}" \
  --include \
  --header "Authorization: Token token=${TOKEN}" \
  --request PATCH \
  --header "Content-Type: application/json" \
  --data '{
    "comment": {
      "text": "'"${TEXT}"'"
    }
  }'
```

#### DELETE  /comments/:id
Request:
```sh
curl "http://localhost:4741/comments/${ID}" \
  --include \
  --header "Authorization: Token token=${TOKEN}" \
  --request DELETE \
```
