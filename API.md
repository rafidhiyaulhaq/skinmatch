# SkinMatch API Documentation

## Base URL
```
https://skinmatch.up.railway.app
```

## API Overview
- **URL**: `/`
- **Method**: `GET`
- **Auth Required**: No
- **Success Response**:
  - **Code**: 200
  - **Content**:
```json
{
  "status": "success",
  "message": "Welcome to SkinMatch API",
  "timestamp": "string (ISO 8601)",
  "endpoints": {
    "auth": [
      "/api/auth/register",
      "/api/auth/login"
    ],
    "quiz": [
      "/api/quiz/submit",
      "/api/quiz/history"
    ],
    "products": [
      "/api/products/recommendations",
      "/api/products"
    ]
  }
}
```

## Authentication
SkinMatch API menggunakan JWT (JSON Web Token) untuk authentication. Token harus disertakan di header setiap request yang membutuhkan authentication.

Format header:
```
Authorization: Bearer <token>
```

## API Endpoints

### Authentication

#### Register User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
- **Success Response**:
  - **Code**: 201
  - **Content**:
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}
```
- **Error Response**:
  - **Code**: 400
  - **Content**:
```json
{
  "message": "Email sudah terdaftar"
}
```

#### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
- **Success Response**:
  - **Code**: 200
  - **Content**:
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}
```
- **Error Response**:
  - **Code**: 400
  - **Content**:
```json
{
  "message": "Email atau password salah"
}
```

#### Get Profile
- **URL**: `/api/auth/profile`
- **Method**: `GET`
- **Auth Required**: Yes
- **Success Response**:
  - **Code**: 200
  - **Content**:
```json
{
  "id": "string",
  "username": "string",
  "email": "string"
}
```

#### Update Profile
- **URL**: `/api/auth/profile`
- **Method**: `PUT`
- **Auth Required**: Yes
- **Request Body**:
```json
{
  "username": "string",
  "email": "string",
  "currentPassword": "string",
  "newPassword": "string"
}
```
- **Success Response**:
  - **Code**: 200
  - **Content**:
```json
{
  "id": "string",
  "username": "string",
  "email": "string"
}
```

### Quiz

#### Submit Quiz
- **URL**: `/api/quiz/submit`
- **Method**: `POST`
- **Auth Required**: Yes
- **Request Body**:
```json
{
  "answers": {
    "oiliness": "string",
    "dryness": "string",
    "sensitivity": "string",
    "pores": "string",
    "acne": "string"
  }
}
```
- **Success Response**:
  - **Code**: 200
  - **Content**:
```json
{
  "skinType": "string",
  "recommendations": [
    {
      "id": "string",
      "name": "string",
      "brand": "string",
      "category": "string",
      "price": "number",
      "description": "string",
      "imageUrl": "string",
      "ingredients": ["string"],
      "rating": "number"
    }
  ],
  "message": "string",
  "tips": ["string"]
}
```

#### Get Quiz History
- **URL**: `/api/quiz/history`
- **Method**: `GET`
- **Auth Required**: Yes
- **Success Response**:
  - **Code**: 200
  - **Content**:
```json
[
  {
    "id": "string",
    "skinType": "string",
    "answers": {
      "oiliness": "string",
      "dryness": "string",
      "sensitivity": "string",
      "pores": "string",
      "acne": "string"
    },
    "createdAt": "string"
  }
]
```

### Products

#### Get Product Recommendations
- **URL**: `/api/products/recommendations`
- **Method**: `GET`
- **Auth Required**: Yes
- **Query Parameters**:
  - `skinType`: string (required)
- **Success Response**:
  - **Code**: 200
  - **Content**:
```json
[
  {
    "id": "string",
    "name": "string",
    "brand": "string",
    "category": "string",
    "price": "number",
    "description": "string",
    "imageUrl": "string",
    "ingredients": ["string"],
    "rating": "number"
  }
]
```

#### Get All Products
- **URL**: `/api/products`
- **Method**: `GET`
- **Auth Required**: No
- **Query Parameters**:
  - `category`: string (optional)
  - `brand`: string (optional)
  - `minPrice`: number (optional)
  - `maxPrice`: number (optional)
- **Success Response**:
  - **Code**: 200
  - **Content**:
```json
[
  {
    "id": "string",
    "name": "string",
    "brand": "string",
    "category": "string",
    "price": "number",
    "description": "string",
    "imageUrl": "string",
    "ingredients": ["string"],
    "rating": "number"
  }
]
```

## Error Responses

Semua endpoint bisa mengembalikan error response berikut:

### 401 Unauthorized
```json
{
  "message": "Please authenticate"
}
```

### 500 Internal Server Error
```json
{
  "message": "Terjadi kesalahan pada server"
}
```

## Rate Limiting
API ini memiliki rate limiting untuk mencegah abuse:
- 100 requests per IP address per 15 menit

## CORS
API mengizinkan request dari origin berikut:
- https://skinmatch-five.vercel.app
- http://localhost:5173 (development)