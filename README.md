# Node.js E-Commerce API

- This full E-Commerce API build using Express and MongoDb, and other Npm Packages listed below , for learning purposes. Here it contains all the required functionalities of a full-fledged E-commerce API like User registration, User Login, Reviews Add, Edit & Delete, Product Add, Edit, Delete, Add product feature image & Add product images, Order creation and etc...,

## Setup

    git clone https://github.com/1Farz1/Ecommerce-Api-NodeJs.git
    cd Ecommerce-Api-NodeJs
    npm install

### create the .env file and fill it with your own credentials

## Run The Service

    nodemon app.js

## API Endpoints

### Auth Routes

- Create a new User (first used flagged as admin)
  - ```POST |  /api/v1/auth/register```
- Login User
  - ```POST |  /api/v1/auth/login```

### User Routes

- Get Users (only for admin)
  - ```GET |  /api/v1/users```
- Get Single Users
  - ```GET |  /api/v1/users/{id}```
- Update current User
  - ```PUT |  /api/v1/users/me```
- Update Current User Password
  - ```PUT |  /api/v1/users/me/updatepassword```
- Get current User signed In
  - ```GET |  /api/v1/users/me```
- Get Users Count
  - ```GET |  /api/v1/users/get/count```

## Review Routes

- Create Review
  - ```POST |  /api/v1/reviews```
- Get Reviews
  - ```GET |  /api/v1/reviews```

- Get Single Review
  - ```GET |  /api/v1/reviews/{id}```

- Update Review
  - ```PUT |  /api/v1/reviews/{id}```

- Delete Review
  - ```DELETE |  /api/v1/reviews/{id}```

## Product Routes

- Create Product
  - ```POST |  /api/v1/products```
- Get Products
  - ```GET |  /api/v1/products```
- Get Single Product
  - ```GET |  /api/v1/products/{id}```
- Upload Product Images
  - ```PUT |  /api/v1/products/gallery-images/{id}```
- Update Product
  - ```PUT |  /api/v1/products/{id}```
- Delete Product
  - ```DELETE |  /api/v1/products/{id}```

## Orders Routes

- Create Order
  - ```POST |  /api/v1/orders```
- Get Orders
  - ```GET |  /api/v1/orders```
- Get Single Order
  - ```GET |  /api/v1/orders/{id}```
- Get Total Order Count
  - ```GET |  /api/v1/orders/get/count```
- Get Total Sales
  - ```GET |  /api/v1/orders/get/totalsales```
- Get User Order
  - ```GET |  /api/v1/orders/get/userorders/{userid}```
- Update Single Order
  - ```PUT |  /api/v1/orders/{id}```
- Delete Single Order
  - ```DELETE |  /api/v1/orders/{id}```

## links 
 - postman link : https://bold-star-484214.postman.co/workspace/Team-Workspace~c069bf4c-0db1-4e9a-875e-5dd4df65a669/collection/21855039-e1fd0f5e-943b-4ff6-a16b-34f62af44b65?action=share&creator=21855039

## Tech used

- Nodejs
- express
- mongoDb
- mongoose
- dotenv
- cookie-parser
- json-web-token
- validator
- express-rate-limit
- helmet
- bcryptjs
- xss-clean
- morgna
- cors
- express-file-upload
- Postman

## Features of Code

- Maintainble and Scalable
- following best Practises and Clean Code Concepts
- Easy To Follow and Read
- Follow The View-Controller-Repository Architecture
- Feature First layer

## Author

- Fares Bekkouche

## Contrubution

- for any contrubution you re more then Welcomed

```Enjoy it While it Lasts```
