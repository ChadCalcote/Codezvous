The Codezvous API is organized around REST. The API has predictable resource
oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded
responses, and uses standard HTTP response codes and verbs.

API routes are not user-facing and should only be used by developers.

Resources:

- [Users](#users)
- [Groups](#groups)
- [Events](#events)
- [RSVPs](#rsvps)
- [Comments](#comments)

---

## Users

Endpoints for the `Users` resource:

- [Log In](#log-in) - `POST /api/auth/login`
- [Sign Up](#sign-up) - `POST /api/auth/signup`
- [Log Out](#log-out) - `GET /api/auth/logout`
- [Authenticate](#authenticate) - `GET /api/auth`
- [Unauthorized](#unauthorized) - `GET /api/auth/unauthorized`
- [Retrieve All Users](#retrieve-all-users) - `GET /api/users`
- [Retrieve Single User](#retrieve-single-user) - `GET /api/users/<int:id>`
- [Retrieve User Groups](#retrieve-user-groups) - `GET /api/users/<int:id/groups>`
- [Retrieve User Events](#retrieve-user-events) - `GET /api/users/<int:id/events>`
- [Retrieve User RSVPs](#retrieve-user-rsvps) - `GET /api/users/<int:id/rsvps>`
---

### Log In

_Logs an existing user into the application_

#### `POST /api/auth/login`

#### Body Parameters

| Parameter    | Type     | Description                                  | Notes    |
| :----------- | :------- | :------------------------------------------- | :------- |
| `email`      | `string` | `email` of the user logging in               | required |
| `password`   | `string` | `password` of the user logging in            | required |

#### Returns

Returns a [current user object](#current-user-object) if successful and sets an
HTTP-only auth cookie, and returns an [errors object](#errors-object) otherwise.

---

### Sign Up

_Creates a new user and logs them into the application_

#### `POST /api/auth/signup`

#### Body Parameters

| Parameter         | Type     | Description                         | Notes                        |
| :---------------- | :------- | :---------------------------------- | :--------------------------- |
| `username`        | `string40` | Desired `username` of the new user  | required, unique                     |
| `email`           | `string` | Desired `email` of the new user     | required, unique                    |
| `password`        | `string` | Desired `password` of the new user  | required                     |
| `zipcode`        | `string` | Desired `password` of the new user  | required                     |
| `inage_url`        | `string` | Url path to desired image of the new user  | required                     |


#### Returns

Returns a [current user object](#current-user-object) if successful and sets an
HTTP-only auth cookie, and returns an [errors object](#errors-object) otherwise.

---

### Log Out

_Logs out the current user_

#### `GET /api/auth/logout`

#### Returns

Returns a [logged out](#logged-out-message) message.

---

### Authenticate

_Authenticates a user_

#### `GET /api/auth/`

#### Path Parameters

| Parameter | Type | Description      | Notes    |
| :-------- | :--- | :--------------- | :------- |
| `id`      | `ID` | `id` of the user | required |


#### Returns

Returns a [current user object](#current-user-object) if successful, and returns an [errors object](#errors-object)
otherwise.

---

### Unauthorized

_Returns unauthorized JSON when flask-login authentication fails_

#### `GET /api/auth/unauthorized`

#### Returns

Returns an [errors object](#errors-object).

---

### Retrieve All Users

_Returns all users stored in the database._

#### `GET /api/users`

#### Returns

Returns an array of [user object](#user-object)s.

---

### Retrieve Single User

_Returns user specified by id provided in URL_

#### `GET /api/users/:id`

#### Path Parameters

| Parameter | Type | Description      | Notes    |
| :-------- | :--- | :--------------- | :------- |
| `id`      | `ID` | `id` of the user | required |

#### Returns

Returns a [user object](#user-object).


---

### Retrieve User Groups

_Returns groups specified by user id provided in URL_

#### `GET /api/users/:id/groups`

#### Path Parameters

| Parameter | Type | Description      | Notes    |
| :-------- | :--- | :--------------- | :------- |
| `id`      | `ID` | `id` of the user | required |

#### Returns

Returns an array of [group object](#group-object)s.

---

### Retrieve User Events

_Returns events specified by user id provided in URL_

#### `GET /api/users/:id/events`

#### Path Parameters

| Parameter | Type | Description      | Notes    |
| :-------- | :--- | :--------------- | :------- |
| `id`      | `ID` | `id` of the user | required |

#### Returns

Returns an array of [event object](#event-object)s.

---

### Retrieve User RSVPs

_Returns rsvps specified by user id provided in URL_

#### `GET /api/users/:id/rsvps`

#### Path Parameters

| Parameter | Type | Description      | Notes    |
| :-------- | :--- | :--------------- | :------- |
| `id`      | `ID` | `id` of the user | required |

#### Returns

Returns an array of [event object](#event-object)s.

---

## Groups

Endpoints for the `Groups` resource:

- [Retrieve All Groups](#retrieve-all-groups) - `GET /api/groups`
- [Retrieve a Single Group](#retrieve-a-single-group) - `GET /api/groups/:id`
- [Retrieve all events for a Single Group](#retrieve-all-events-for-a-single-group) - `GET /api/groups/:id/events`
- [Retrieve the leader of a Single Group](#retrieve-the-leader-of-a-single-group) - `GET /api/groups/:id/leader`
- [Retrieve all members of a Single Group](#retrieve-all-members-of-a-single-group) - `GET /api/groups/:id/members`
- [Create a Group](#create-a-group) - `POST /api/groups`
- [Edit a Group](#edit-a-group) - `PUT /api/groups/:id`
- [Delete a Group](#delete-a-group) - `DELETE /api/groups/:id`
- [Create a Users_Group](#join-a-group) - `POST /api/groups/new-user`

---

### Retrieve All Groups

_Retrieves all the groups_

#### `GET /api/groups`

#### Returns

Returns an array of [group object](#group-object)s if successful, and returns
an [errors object](#errors-object) otherwise

---

### Retrieve a Single Group

_Retrieves a single group with the specified id_

#### `GET /api/groups/:id`

#### Path Parameters

| Parameter | Type | Description                   | Notes    |
| :-------- | :--- | :---------------------------- | :------- |
| `id`      | `ID` | `id` of the group to retrieve | required |

#### Returns

Returns a [group object](#group-object) if successful, and returns an [errors object](#errors-object) otherwise.

---

### Retrieve all Events for a Single Group

_Retrieves an array of all Events associated with a group with the specified id_

#### `GET /api/groups/:id/events`

#### Path Parameters

| Parameter | Type | Description                   | Notes    |
| :-------- | :--- | :---------------------------- | :------- |
| `id`      | `ID` | `id` of the group to retrieve | required |

#### Returns

Returns an array of [event object](#event-object)s if successful, and returns
an [errors object](#errors-object) otherwise

---

### Retrieve the leader for a Single Group

_Retrieves a user object with the user who owns the group with the specified id_

#### `GET /api/groups/:id/leader`

#### Path Parameters

| Parameter | Type | Description                   | Notes    |
| :-------- | :--- | :---------------------------- | :------- |
| `id`      | `ID` | `id` of the group to retrieve | required |

#### Returns

Returns a [user object](#user-object)s if successful, and returns
an [errors object](#errors-object) otherwise

---

### Retrieve all Members for a Single Group

_Retrieves an array of all Members associated with a group with the specified id_

#### `GET /api/groups/:id/members`

#### Path Parameters

| Parameter | Type | Description                   | Notes    |
| :-------- | :--- | :---------------------------- | :------- |
| `id`      | `ID` | `id` of the group to retrieve | required |

#### Returns

Returns an array of [user object](#user-object)s if successful, and returns
an [errors object](#errors-object) otherwise

---

### Create a Group

_Creates a new group_

#### `POST /api/groups`

#### Body Parameters

| Parameter        |        Type        | Description                               | Notes    |
| :--------        | :----------------: | :---------------------------------------- | :------- |
| `group_name`     |     `string`       | `group_name` of the group being created   | required |
| `description`    |     `text`         | `description` of the group being created  | required |
| `city`       |     `string`       | `city` of the group being created     | required |
| `state`       |     `string`       | `state` of the group being created     | required |
| `zip_code`       |     `string`       | `zip_code` of the group being created     | required |
| `is_active`       |     `string`       | `is_active` of the group being created     | required |
| `image_url`       |     `string`       | `image_url` of the group being created     | required |
| `leader_id`      |     `integer`      | `leader_id` of the group being created    | required |

#### Returns

Returns the created [group object](#group-object) if successful, and returns an [errors object](#errors-object) otherwise.

---

### Edit a Group

_Edits an existing group of that the current user is the leader of, **requires authentication with a_
_cookie**_

#### `PUT /api/groups/:id`

#### Path Parameters

| Parameter | Type | Description               | Notes    |
| :-------- | :--- | :------------------------ | :------- |
| `id`      | `ID` | `id` of the group to edit | required |

#### Body Parameters

| Parameter       |        Type        | Description                              | Notes    |
| :--------       | :----------------: | :--------------------------------------- | :------- |
| `group_name`    |     `string`       | `group_name` of the group being edited   | required |
| `description`   |     `text`         | `description` of the group being edited  | required |
| `city`       |     `string`       | `city` of the group being created     | required |
| `state`       |     `string`       | `state` of the group being created     | required |
| `zip_code`       |     `string`       | `zip_code` of the group being created     | required |
| `is_active`       |     `string`       | `is_active` of the group being created     | required |
| `image_url`       |     `string`       | `image_url` of the group being created     | required |
| `leader_id`      |     `integer`      | `leader_id` of the group being created    | required |

#### Returns

Returns the edited [group object](#group-object) if successful, and returns an [errors object](#errors-object) otherwise.

---

### Delete a Group

_Deletes an existing group of that the current user is the leader of, **requires authentication with a_
_cookie**_

#### `DELETE /api/groups/:id`

#### Path Parameters

| Parameter | Type | Description               | Notes    |
| :-------- | :--- | :------------------------ | :------- |
| `id`      | `ID` | `id` of the group to edit | required |

#### Returns

Returns a [success message](#success-message) if successful, and returns an [errors object](#errors-object) otherwise.

---

## Events

Endpoints for the `Events` resource:

- `Events`
  - [Retrieve All Events](#retrieve-all-events) - `GET /api/events`
  - [Retrieve a Single Event](#retrieve-a-single-event) - `GET /api/events/:id`
  - [Create an Event](#create-an-event) - `POST /api/events`
  - [Edit an Event](#edit-an-event) - `PUT /api/events/:id`
  - [Delete an Event](#delete-an-event) - `DELETE /api/events/:id`
- `Comments`
  - [Retrieve all Comments for a Single Event](#retrieve-all-comments-for-a-single-event) - `GET /api/events/:id/comments`
  - [Create a Comment](#create-a-comment) - `POST /api/events/comments`

---

### Retrieve All Events

_Retrieves all the events_

#### `GET /api/events`

#### Returns

Returns an array of [event object](#event-object)s if successful, and returns an [errors object](#errors-object) otherwise

---

### Retrieve a Single Event

_Retrieves a single event with the specified id_

#### `GET /api/events/:id`

#### Path Parameters

| Parameter | Type | Description                   | Notes    |
| :-------- | :--- | :---------------------------- | :------- |
| `id`      | `ID` | `id` of the event to retrieve | required |

#### Returns

Returns an [event object](#event-object) if successful, and returns an [errors object](#errors-object) otherwise.

---

### Create an Event

_Create a new event_

#### `POST /api/events`

#### Body Parameters

| Parameter        |        Type        | Description                               | Notes    |
| :--------        | :----------------: | :---------------------------------------- | :------- |
| `event_name`     |     `string`       | `event_name` of the event being created   | required |
| `description`    |     `text`         | `description` of the event being created  | required |
| `city`       |     `string`       | `city` of the event being created     | required |
| `state`       |     `string`       | `state` of the event being created     | required |
| `zip_code`       |     `string`       | `zip_code` of the event being created     | required |
| `virtual`       |     `string`       | `virtual` of the event being created     | required |
| `type`       |     `string`       | `type` of the event being created     | required |
| `status`       |     `string`       | `status` of the event being created     | required |
| `image_url`       |     `string`       | `image_url` of the event being created     | required |
| `group_id`       |     `integer`      | `group_id` of the event being created     | required |
| `start_time`     |     `datetime`     | `start_time` of the event being created   | required |
| `end_time`       |     `datetime`     | `end_time` of the event being created     | required |

#### Returns

Returns the created [event object](#event-object) if successful, and returns an [errors object](#errors-object) otherwise.

---

### Edit an Event

_Edits an existing event of that the current user is the leader of the group that is hosting the event, **requires authentication with a_
_cookie**_

#### `PUT /api/events/:id`

#### Path Parameters

| Parameter | Type | Description               | Notes    |
| :-------- | :--- | :------------------------ | :------- |
| `id`      | `ID` | `id` of the event to edit | required |

#### Body Parameters

| Parameter        |        Type        | Description                               | Notes    |
| :--------        | :----------------: | :---------------------------------------- | :------- |
| `event_name`     |     `string`       | `event_name` of the event being created   | required |
| `description`    |     `text`         | `description` of the event being created  | required |
| `city`       |     `string`       | `city` of the event being created     | required |
| `state`       |     `string`       | `state` of the event being created     | required |
| `zip_code`       |     `string`       | `zip_code` of the event being created     | required |
| `virtual`       |     `string`       | `virtual` of the event being created     | required |
| `type`       |     `string`       | `type` of the event being created     | required |
| `status`       |     `string`       | `status` of the event being created     | required |
| `image_url`       |     `string`       | `image_url` of the event being created     | required |
| `group_id`       |     `integer`      | `group_id` of the event being created     | required |
| `start_time`     |     `datetime`     | `start_time` of the event being created   | required |
| `end_time`       |     `datetime`     | `end_time` of the event being created     | required |

#### Returns

Returns the edited [event object](#event-object) if successful, and returns an [errors object](#errors-object) otherwise.

---

### Delete an Event

_Deletes an existing event of that the current user is the leader of the group that is hosting the event, **requires authentication with a_
_cookie**_

#### `DELETE /api/events/:id`

#### Path Parameters

| Parameter | Type | Description                 | Notes    |
| :-------- | :--- | :------------------------   | :------- |
| `id`      | `ID` | `id` of the event to delete | required |

#### Returns

Returns a [success message](#success-message) if successful, and returns an [errors object](#errors-object) otherwise.

---

## RSVPs

Endpoints for the `RSVPs` resource:

- [Retrieve all users attending an event](#retrieve-all-users-attending-an-event) - `GET /api/events/:id/attendees`
- [RSVP for an Event](#rsvp-for-an-event) - `POST /api/events/:id/rsvps`
- [Remove RSVP for an Event](#remove-rsvp-for-an-event) - `DELETE /api/events/:id/rsvps`

---

### Retrieve all users attending an event

_Returns rsvps for all users attending an event_

#### `GET /api/events/:id/attendees`

#### Returns

Returns an array of [rsvp object](#rsvp-object)s if successful, and returns an [errors object](#errors-object) otherwise.

---

### RSVP for an Event

_Creates an rsvp between the current user and the specified event that the user_
_has not rsvp'd for yet_

#### `POST /api/events/:id/rsvps`

#### Path Parameters

| Parameter | Type | Description                    | Notes    |
| :-------- | :--- | :------------------------      | :------- |
| `id`      | `ID` | `id` of the event to rsvp for  | required |

#### Returns

Returns the rsvp as a [rsvp object](#rsvp-object) with the `attending` key
set to `true` if successful, and returns an [errors object](#errors-object) otherwise.

---

### Remove RSVP from an Event

_Deletes a RSVP between the current user and the specified event that the user_
_has RSVP'd for previously_

#### `DELETE /api/events/:id/rsvps`

#### Path Parameters

| Parameter | Type | Description                      | Notes    |
| :-------- | :--- | :--------------------------      | :------- |
| `id`      | `ID` | `id` of the event to delete rsvp | required |

#### Returns

Returns the rsvp as a [rsvp object](#rsvp-object) with the `attending`
key set to `false` if successful, and returns an [errors object](#errors-object) otherwise.

---

## Comments

Endpoints for the `Comments` resource:

- [Create a Comment for an Event](#create-a-comment-for-an-event) - `POST /api/events/:id/comments`
- [Remove Comment for an Event](#remove-comment-for-an-event) - `DELETE /api/events/:id/comments`
- [Edit a Comment for an Event](#edit-a-comment-for-an-event) - `PUT /api/events/:id/comments`

---

### Comment on an Event

_Creates a comment from the current user on the specified event_

#### `POST /api/events/:id/comments`

#### Path Parameters

| Parameter | Type | Description                     | Notes    |
| :-------- | :--- | :------------------------       | :------- |
| `id`      | `ID` | `id` of the event to comment on | required |

#### Returns

Returns the comment as a [comment object](#comment-object), and returns an [errors object](#errors-object) otherwise.

---

### Remove Comment from an Event

_Deletes a Comment from the current user on the specified event_

#### `DELETE /api/events/:id/comments`

#### Path Parameters

| Parameter | Type | Description                              | Notes    |
| :-------- | :--- | :--------------------------              | :------- |
| `id`      | `ID` | `id` of the event to delete comment from | required |

#### Returns

Returns a [success message](#success-message).

---

## Objects

### Current User Object

```json
{
  "id": 1,
  "username": "zagreus",
  "email": "zagreus@codezvous.com"
}
```

### User Object

```json
{
  "id": 1,
  "username": "zagreus",
  "email": "zagreus@codezvous.com"
}
```

### Success Message

```json
{
  "message": "success"
}
```

### Logged Out Message

```json
{
  "message": "User logged out"
}
```

### Errors Object

```json
{
  "errors": "errors message here"
}
```

### Group Object

```json
{
  "id": 41,
  "group_name": "Super Duper Javascript Group of Austin",
  "description": "We are passionate about Javascript and coming together as a group!",
  "city": "Austin",
  "state": "TX",
  "zip_code": 78704,
  "is_active": "active", 
  "image_url": "https://picsum.photos/id/{img_num}/600/337",
  "leader_id": 1,
  "createdAt": "2020-10-18T20:26:34.256Z",
  "updatedAt": "2020-10-18T20:26:34.256Z",
}
```

### Event Object

```json
{
  "id": 23,
  "event_name": "Showing of The Social Network",
  "description": "Come join us to watch The Social Network starring Jesse Eisenberg depicting Mark Zuckerberg and the triumphs and trials of starting Facebook",
  "address": "275 Easton Town Center",
  "city": "Austin",
  "state": "TX",
  "zip_code": 78704,
  "group_id": 41,
  "type": "Workshop",
  "start_time": "2021-04-12 12:05:00",
  "end_time": "2021-04-12 14:50:00",
  "createdAt": "2020-10-18T20:26:34.256Z",
  "updatedAt": "2020-10-18T20:26:34.256Z",
}
```

### RSVP Object

```json
{
  "id": 17,
  "user_id": 41,
  "event_id": 23,
  "createdAt": "2020-10-18T20:26:34.256Z",
  "updatedAt": "2020-10-18T20:26:34.256Z",
}
```

### Comment Object

```json
{
  "id": 87,
  "user_id": 41,
  "event_id": 23,
  "description": "My favorite movie! Can't wait to meetup with everyone again.",
  "createdAt": "2020-10-18T20:26:34.256Z",
  "updatedAt": "2020-10-18T20:26:34.256Z",
}
```
