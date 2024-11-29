# Role-Based Access Control (RBAC) System

## Overview
This project is an implementation of **Authentication**, **Authorization**, and **Role-Based Access Control (RBAC)**, designed to fulfill the requirements of the VRV Security Backend Developer Intern assignment. The system enables secure user registration, login, and access control based on roles such as Admin, User, and Moderator.

## Note
Because the frontend and backend are hosted on completely different domains, cookies may not work as expected due to cross-origin restrictions. To access the full functionality, either avoid refreshing the page after login or run the application locally with both frontend and backend on the same domain.

## Implementations
1. **Authentication**:
   - Secure user registration and login.
   - Passwords hashed using `bcrypt` for enhanced security.
   - Session management with **JWT**.

2. **Authorization**:
   - Role-based access to resources (e.g., Admin, User, Moderator).
   - Middleware for access control at the route level.

3. **RBAC**:
   - Flexible role and permission assignment.
   - Access control integrated into API endpoints.

4. **Security Best Practices**:
   - CORS enabled with restrictions.
   - HTTP headers hardened with `helmet`.

## Role Hierarchy

1. **ADMIN**: Full access to manage the system, users, roles, and content.
2. **MODERATOR**: Can moderate content (remove comments), but cannot manage users.
3. **USER**: Basic access to interact with content (create posts, comment).


## Roles & Permissions

| **Permission**                    | **USER** | **MODERATOR** | **ADMIN** |
|------------------------------------|----------|---------------|-----------|
| **Create Posts**                   | ✔        | ✔             | ✔         |
| **View Posts**                     | ✔        | ✔             | ✔         |
| **Comment on Posts**               | ✔        | ✔             | ✔         |
| **Delete Own Posts/Comments**      | ❌        | ✔             | ✔         |
| **Remove Comments**                | ❌        | ✔             | ✔         |
| **Delete Posts (Others' Posts)**   | ❌        | ✔             | ✔         |
| **View Admin Dashboard**           | ❌        | ❌            | ✔         |
| **Manage Users**                   | ❌        | ❌            | ✔         |
| **Change User Roles**              | ❌        | ❌            | ✔         |
| **Delete Users**                   | ❌        | ❌            | ✔         |

---

## RBAC Middleware
### `accessALL`
- **Description**: Grants access to users with any of the following roles: `ADMIN`, `MODERATOR`, or `USER`. 
- **Used In**: 
  - Routes that are open to all authenticated users, like viewing the dashboard, creating posts, etc.

### `accessAdminAndMods`
- **Description**: Grants access to users with either the `ADMIN` or `MODERATOR` role.
- **Used In**: 
  - Routes that require higher privileges, such as deleting comments.

### `accessAdmin`
- **Description**: Grants access only to users with the `ADMIN` role.
- **Used In**: 
  - Routes that are restricted to admins, such as deleting users, changing user roles, or deleting posts.

## Role-Based Access Control (RBAC) Flow
- **User Sends Request**: The user sends a request to a protected route with a JWT token in the Authorization header (Bearer token).
- **JWT Authentication**: The authenticate middleware verifies the JWT's validity and decodes the user’s details (id and role).
- **Role Verification**: The authorize middleware fetches the user's role from the database to check if it matches the role in the JWT.
- **Token Renegrate**: If the roles in the JWT and database don't match, or if the user's role has been updated in the database, a new JWT is generated with the correct role and set as a cookie.
- **Role Access Check**: The authorize middleware checks if the user’s role is authorized to access the requested route.
- **Access Granted/Denied**: If the user’s role is authorized, the request proceeds. If the role is not authorized, a 403 Forbidden response is sent.
  
## Links
- Deplyments
   - Backend - https://rbac-sys.onrender.com 
   - Frontend - https://rbac-vrv-sys.vercel.app
- Repo
   - Backend - https://github.com/rajyavardhanbithale/rbac-sys 
   - Frontend - https://github.com/rajyavardhanbithale/rbac-frontend


## Setup Instructions

1. Clone the Project
```
    git clone https://github.com/rajyavardhanbithale/rbac-frontend
```
2. Install dependecies 
```
    npm i 
```
3. Run the server
```
    npm run dev
```


