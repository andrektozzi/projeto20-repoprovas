# projeto20-repoprovas

## Features

- Create and Signin user
- Create tests
- View tests by discipline
- View tests by teachers

</br>

## API Reference

### Create user

```http
POST /signup
```

#### Request:

| Body              | Type     | Description                |
| :---------------- | :------- | :------------------------- |
| `email`           | `string` | **Required** user email    |
| `password`        | `string` | **Required** user password |
| `confirmPassword` | `string` | **Required** user password |

`Password with at least 4 characters`

####

### Signin user

```http
POST /signin
```

#### Request:

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. user email    |
| `password` | `string` | **Required**. user password |

`Token generated at login`

####

</br>

### Create tests

```http
POST /tests
```

#### Request:

| Headers        | Type     | Description         |
| :------------- | :------- | :------------------ |
| `Bearer token` | `string` | **Required**. token |

####

| Body           | Type      | Description                 |
| :------------- | :-------- | :-------------------------- |
| `name`         | `integer` | **Required**. test name     |
| `pdfUrl`       | `string`  | **Required**. test url      |
| `categoryId`   | `string`  | **Required**. category id   |
| `disciplineId` | `string`  | **Required**. discipline id |
| `teacherId`    | `string`  | **Required**. teacher id    |

#

### Get tests by discipline

```http
GET /tests/disciplines
```

#### Request:

| Headers        | Type     | Description         |
| :------------- | :------- | :------------------ |
| `Bearer token` | `string` | **Required**. token |

#

### Get tests by teacher

```http
GET /tests/teacher
```

#### Request:

| Headers        | Type     | Description         |
| :------------- | :------- | :------------------ |
| `Bearer token` | `string` | **Required**. token |

#
