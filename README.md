# AuthServer

Authentication, Authorization with JSON Web Token

Client - <https://github.com/josephttran/auth-client>  
Server - <https://github.com/josephttran/auth-server>

## Tech Stack  
**Client:** Angular 7, Bootstrap  
**Server:** Node.js, Koa.js, MySQL, TypeScript, Json Web Token  
**Database:** MySQL

## Getting Started

#### Required Software
[Node.js/npm](https://nodejs.org/en/)  
[MySQL](https://www.mysql.com/)

#### Installing and configure

* Rename file example.env to .env  
* Edit variables value for database in .env file  
* In your MySQL database create table name users
```sql
CREATE TABLE IF NOT EXISTS users(
  user_id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  firstName VARCHAR(40) NOT NULL,
  lastName VARCHAR(40) NOT NULL,
  email VARCHAR(90) NOT NULL UNIQUE KEY, 
  password VARCHAR(64) NOT NULL);
```

* Install dependencies  
```npm install```

#### Run the server
To start dev  
```npm run dev```

To run test  
```npm t```