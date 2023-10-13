# Salon Marketplace API Documentation

Welcome to the Salon Marketplace API documentation. This API provides endpoints
to manage various aspects of a salon marketplace, including user authentication,
file management, category management, blog posts, services, reviews, workers,
schedules, and appointments. Below, you'll find detailed information on how to
use each of these endpoints.

## Table of Contents

- [Authentication](#authentication)
- [User Management](#user-management)
- [File Management](#file-management)
- [Category Management](#category-management)
- [Blog Posts](#blog-posts)
- [Services](#services)
- [Reviews](#reviews)
- [Workers](#workers)
- [Schedules](#schedules)
- [Appointments](#appointments)

### Authentication <a name="authentication"></a>

#### Sign Up

- Endpoint: `POST /auth/signup`
- Description: Create a new user account.
- Request Body: User information.
- Required Roles: None
- Example:

```http
POST /auth/signup
```

#### Sign In

- Endpoint: `POST /auth/signin`
- Description: Authenticate and log in a user.
- Request Body: User credentials.
- Required Roles: None
- Example:

```http
POST /auth/signin
```

#### Refresh Token

- Endpoint: `POST /auth/refresh-token`
- Description: Refresh the authentication token.
- Request Body: Refresh token.
- Required Roles: None
- Example:

```http
POST /auth/refresh-token
```

### User Management <a name="user-management"></a>

#### Get All Users

- Endpoint: `GET /user`
- Description: Get a list of all users.
- Required Roles: Admin, Super Admin
- Example:

```http
GET /user
```

#### Get User Profile

- Endpoint: `GET /user/profile`
- Description: Get the profile of the authenticated user.
- Required Roles: Admin, Customer, Super Admin, Worker
- Example:

```http
GET /user/profile
```

#### Get User Details

- Endpoint: `GET /user/:id`
- Description: Get the details of a specific user.
- Required Roles: Admin, Super Admin
- Example:

```http
GET /user/:id
```

#### Update User

- Endpoint: `PATCH /user/:id`
- Description: Update user information.
- Required Roles: Admin, Customer, Super Admin, Worker
- Example:

```http
PATCH /user/:id
```

#### Delete User

- Endpoint: `DELETE /user/:id`
- Description: Delete a user account.
- Required Roles: Admin, Super Admin, Customer
- Example:

```http
DELETE /user/:id
```

### File Management <a name="file-management"></a>

#### Upload File

- Endpoint: `POST /file/upload`
- Description: Upload a file.
- Request Body: File to be uploaded.
- Required Roles: Admin, Super Admin, Worker, Customer
- Example:

```http
POST /file/upload
```

#### Get All Files

- Endpoint: `GET /file`
- Description: Get a list of all files.
- Required Roles: Admin, Super Admin, Worker, Customer
- Example:

```http
GET /file
```

### Category Management <a name="category-management"></a>

#### Get All Categories

- Endpoint: `GET /category`
- Description: Get a list of all categories.
- Required Roles: Admin, Super Admin
- Example:

```http
GET /category
```

#### Get Category Details

- Endpoint: `GET /category/:id`
- Description: Get the details of a specific category.
- Required Roles: Admin, Super Admin
- Example:

```http
GET /category/:id
```

#### Create Category

- Endpoint: `POST /category`
- Description: Create a new category.
- Request Body: Category information.
- Required Roles: Admin, Super Admin
- Example:

```http
POST /category
```

#### Update Category

- Endpoint: `PATCH /category/:id`
- Description: Update category information.
- Required Roles: Admin, Super Admin
- Example:

```http
PATCH /category/:id
```

#### Delete Category

- Endpoint: `DELETE /category/:id`
- Description: Delete a category.
- Required Roles: Admin, Super Admin
- Example:

```http
DELETE /category/:id
```

### Blog Posts <a name="blog-posts"></a>

#### Create Blog Post

- Endpoint: `POST /blog/create`
- Description: Create a new blog post.
- Request Body: Blog post information.
- Required Roles: Admin, Super Admin, Worker, Customer
- Example:

```http
POST /blog/create
```

#### Get All Blog Posts

- Endpoint: `GET /blog`
- Description: Get a list of all blog posts.
- Required Roles: None
- Example:

```http
GET /blog
```

#### Get Blog Posts by Service

- Endpoint: `GET /blog/service/:serviceID`
- Description: Get blog posts related to a specific service.
- Required Roles: None
- Example:

```http
GET /blog/service/:serviceID
```

#### Get Blog Post Details

- Endpoint: `GET /blog/:id`
- Description: Get the details of a specific blog post.
- Required Roles: Admin, Super Admin
- Example:

```http
GET /blog/:id
```

#### Update Blog Post

- Endpoint: `PATCH /blog/:id`
- Description: Update a blog post.
- Required Roles: Admin, Super Admin, Worker
- Example:

```http
PATCH /blog/:id
```

#### Delete Blog Post

- Endpoint: `DELETE /blog/:id`
- Description: Delete a blog post.
- Required Roles: Admin, Super Admin, Worker
- Example:

```http
DELETE /blog/:id
```

### Services <a name="services"></a>

#### Create Service

- Endpoint: `POST /service/create`
- Description: Create a new service.
- Request Body: Service information.
- Required Roles: Admin, Super Admin
- Example:

```http
POST /service/create
```

#### Get All Services

- Endpoint: `GET /service`
- Description: Get a list of all services.
- Required Roles: None
- Example:

```http
GET /service
```

#### Get Services by Category

- Endpoint: `GET /service/:categoryID/category`
- Description: Get services within a specific category.
- Required Roles: None
- Example:

```http
GET /service/:categoryID/category
```

#### Get Service Details

- Endpoint: `GET /service/:id`
- Description: Get the details of a specific service.
- Required Roles: None
- Example:

```http
GET /service/:id
```

#### Update Service

- Endpoint: `PATCH /service/:id`
- Description: Update service information.
- Required Roles: Admin, Super Admin
- Example:

```http
PATCH /service/:id
```

#### Delete Service

- Endpoint: `DELETE /service/:id`
- Description: Delete a service.
- Required Roles: Admin, Super Admin
- Example:

```http
DELETE /service/:id
```

### Reviews <a name="reviews"></a>

#### Create Review

- Endpoint:

`POST /review/create`

- Description: Create a new review.
- Request Body: Review information.
- Required Roles: Admin, Super Admin, Customer
- Example:

```http
POST /review/create
```

#### Get All Reviews

- Endpoint: `GET /review`
- Description: Get a list of all reviews.
- Required Roles: None
- Example:

```http
GET /review
```

#### Get Review Details

- Endpoint: `GET /review/:id`
- Description: Get the details of a specific review.
- Required Roles: Admin, Super Admin, Customer
- Example:

```http
GET /review/:id
```

#### Update Review

- Endpoint: `PATCH /review/:id`
- Description: Update a review.
- Required Roles: Admin, Super Admin, Customer
- Example:

```http
PATCH /review/:id
```

#### Delete Review

- Endpoint: `DELETE /review/:id`
- Description: Delete a review.
- Required Roles: Admin, Super Admin, Customer
- Example:

```http
DELETE /review/:id
```

### Workers <a name="workers"></a>

#### Create Worker

- Endpoint: `POST /worker/create`
- Description: Create a new worker profile.
- Request Body: Worker information.
- Required Roles: Admin, Super Admin, Worker
- Example:

```http
POST /worker/create
```

#### Get All Workers

- Endpoint: `GET /worker`
- Description: Get a list of all workers.
- Required Roles: None
- Example:

```http
GET /worker
```

#### Get Worker Details

- Endpoint: `GET /worker/:id`
- Description: Get the details of a specific worker.
- Required Roles: None
- Example:

```http
GET /worker/:id
```

#### Update Worker

- Endpoint: `PATCH /worker/:id`
- Description: Update worker information.
- Required Roles: Admin, Super Admin, Worker
- Example:

```http
PATCH /worker/:id
```

#### Delete Worker

- Endpoint: `DELETE /worker/:id`
- Description: Delete a worker profile.
- Required Roles: Admin, Super Admin
- Example:

```http
DELETE /worker/:id
```

### Schedules <a name="schedules"></a>

#### Create Schedule

- Endpoint: `POST /schedule/create`
- Description: Create a new schedule.
- Request Body: Schedule information.
- Required Roles: Super Admin, Admin
- Example:

```http
POST /schedule/create
```

#### Get All Schedules

- Endpoint: `GET /schedule`
- Description: Get a list of all schedules.
- Required Roles: None
- Example:

```http
GET /schedule
```

#### Get Schedule Details

- Endpoint: `GET /schedule/:id`
- Description: Get the details of a specific schedule.
- Required Roles: None
- Example:

```http
GET /schedule/:id
```

#### Update Schedule

- Endpoint: `PATCH /schedule/:id`
- Description: Update a schedule.
- Required Roles: Admin, Super Admin
- Example:

```http
PATCH /schedule/:id
```

#### Delete Schedule

- Endpoint: `DELETE /schedule/:id`
- Description: Delete a schedule.
- Required Roles: Admin, Super Admin
- Example:

```http
DELETE /schedule/:id
```

### Appointments <a name="appointments"></a>

#### Create Appointment

- Endpoint: `POST /appointment/create`
- Description: Create a new appointment.
- Request Body: Appointment information.
- Required Roles: Customer, Admin
- Example:

```http
POST /appointment/create
```

#### Get All Appointments

- Endpoint: `GET /appointment`
- Description: Get a list of all appointments.
- Required Roles: Customer, Admin, Super Admin
- Example:

```http
GET /appointment
```

#### Get Appointments by Worker

- Endpoint: `GET /appointment/worker`
- Description: Get appointments assigned to workers.
- Required Roles: Admin, Super Admin, Worker
- Example:

```http
GET /appointment/worker
```

#### Get Appointment Details

- Endpoint: `GET /appointment/:id`
- Description: Get the details of a specific appointment.
- Required Roles: Customer, Admin, Super Admin, Worker
- Example:

```http
GET /appointment/:id
```

#### Update Appointment

- Endpoint: `PATCH /appointment/:id`
- Description: Update appointment information.
- Required Roles: Customer, Admin, Super Admin, Worker
- Example:

```http
PATCH /appointment/:id
```

#### Delete Appointment

- Endpoint: `DELETE /appointment/:id`
- Description: Delete an appointment.
- Required Roles: Customer, Admin, Super Admin
- Example:

```http
DELETE /appointment/:id
```

## Conclusion

This API documentation provides information on how to interact with the Salon
Marketplace API. Each endpoint has specific requirements and functionalities,
and it is essential to ensure you have the necessary roles and permissions when
making requests. If you have any questions or need further assistance, please
refer to the API's documentation or contact the API administrator.
