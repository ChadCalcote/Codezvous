# Schema for PostgresQL using SQLAlchemy ORM

## `Users`

| column name       | data type | details                   |
|:------------------|:---------:|:--------------------------|
| `id`              | integer   | not null, primary key     |
| `username`        | string(40)    | not null, unique          |
| `image_url`       | string(1000)    | not null, unique          |
| `zip_code`        | string(10)    | not null, unique          |
| `email`           | string(255)    | not null, unique          |
| `hashed_password` | string(255)    | not null                  |
| `created_at`      | datetime  | not null                  |
| `updated_at`      | datetime  | not null                  |

- unique constraint on `username`
- unique constraint on `email`
- SQLAlchemy `Groups` `relationship` via `Users_Groups` table
- SQLAlchemy `Events` `relationship` via `RSVPs` table
  
## `Groups`

| column name          | data type | details                        |
|:---------------------|:---------:|:-------------------------------|
| `id`                 | integer   | not null, primary key          |
| `group_name`         | string(100)    | not null, unique               |
| `description`        | text      | not null                       |
| `city`               | string(50)    | not null                       |
| `state`              | string(30)    | not null                       |
| `zip_code`           | integer   | not null                       |
| `is_active`           | boolean   | not null                       |
| `image_url`       | string(1000)    | not null, unique          |
| `leader_id`          | integer   | not null, foreign key          |
| `created_at`         | datetime  | not null                       |
| `updated_at`         | datetime  | not null                       |

- `leader_id` references `Users` table as a `foreign key`
- unique constraint on `group_name`
- SQLAlchemy `Users` `relationship` via `Users_Groups` table
- SQLAlchemy `Events` `relationship`
  
## `Events`

| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, primary key          |
| `event_name`      | string(100)    | not null, unique               |
| `description`     | text      | not null                       |
| `address`         | string(100)    | not null                       |
| `city`            | string(50)    | not null                       |
| `state`           | string(2)    | not null                       |
| `zip_code`        | integer   | not null                       |
| `virtual`         | boolean   | defaultValue=false             |
| `type`            | string(50)    | not null                       |
| `status`          | string(30)    | defaultValue='pending'         |
| `image_url`       | string(1000)    | not null, unique          |
| `group_id`        | integer   | not null, foreign key          |
| `start_time`      | datetime  |                                |
| `end_time`        | datetime  |                                |
| `createdAt`       | datetime  | not null                       |
| `updatedAt`       | datetime  | not null                       |

- `group_id` references `Groups` table as a `foreign key`
- unique constraint on `event_name`
- SQLAlchemy `Groups` `relationship`
- SQLAlchemy `Comments``relationship`
- SQLAlchemy `Users` `relationship` via `RSVPs` table

## `RSVPs` (USERS_EVENTS)

| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, primary key          |
| `user_id`         | integer   | not null, foreign key          |
| `event_id`        | integer   | not null, foreign key          |
| `createdAt`       | datetime  | not null                       |
| `updatedAt`       | datetime  | not null                       |

- `user_id` references `Users` table as a `foreign key`
- `event_id` references `Events` table as a `foreign key`
- SQLAlchemy `Users` `relationship`
- SQLAlchemy `Events` `relationship`

## `Comments`

| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, primary key          |
| `user_id`         | integer   | not null, foreign key          |
| `event_id`        | integer   | not null, foreign key          |
| `body`            | text      | not null                       |
| `createdAt`       | datetime  | not null                       |
| `updatedAt`       | datetime  | not null                       |

- `user_id` references `Users` table as a `foreign key`
- `event_id` references `Events` table as a `foreign key`
- SQLAlchemy `Users` `relationship`
- SQLAlchemy `Events` `relationship`

## `Users_Groups`

| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, primary key          |
| `user_id`         | integer   | not null, foreign key          |
| `group_id`        | integer   | not null, foreign key          |
| `createdAt`       | datetime  | not null                       |
| `updatedAt`       | datetime  | not null                       |

- `user_id` references `Users` table as a `foreign key`
- `group_id` references `Groups` table as a `foreign key`
- SQLAlchemy `Users` `relationship`
- SQLAlchemy `Groups` `relationship`

## `Visual Representation of Schema`
![Database schema visual](https://www.dropbox.com/s/0pyh6xbil8f56jw/Screen%20Shot%202021-01-25%20at%204.10.13%20PM.png?raw=1)
