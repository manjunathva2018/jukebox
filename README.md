# JukeBox backend

### Nodejs version 13+ and mongodb above version 4.6 is required to run the project

## run `npm install` at the root folder

### Steps for running the project

Step 1 : Add the following environment variables in root folder inside .env file
NODE_ENV = production

### Monogo DB Connection

MONGODB_URI = 'Mongo DB Connection URL'

### Port number for Node Server

NODE_PORT= Node port number

The project folder is based on component architecture.

Step 2 : run `npm start` at the root folder

---

### To import initial data to the database

Step 1: set MIGRATE_dbConnectionUri='Mongo DB Connection URL' variable inside .env file

Step 2 : run `npm run-script db_init` to import the initial data / existing data into the database

## Step 3 : select `1611946125929-initial_data.js` by pressing the spacebar key followed by enter key.

## import Jukebox.postman_collection.json file into postman application if required or find the APIs documentation below-

## API end points

## 1. API to create/update music album records

### create

| End point       | Method |
| --------------- | ------ |
| /api/musicalbum | POST   |

Body:
{
"albumName":String,
"dateOfRelease":Date,
"genre":[String],
"price":Number,
"description":String
}

### update

| End point                     | Route Path Params | Method |
| ----------------------------- | ----------------- | ------ |
| /api/musicalbum/:musicAlbumId | `musicAlbumId`    | PUT    |

Body:
{
"albumName":String,
"dateOfRelease":Date,
"genre":[String],
"price":Number,
"description":String,
"sungOrPlayedByMusicians":[ObjectId]
}

### get all list of music album

| End point       | Method |
| --------------- | ------ |
| /api/musicalbum | GET    |

## 3. API to retrieve the list of Music albums sorted by Date of release in ascending order

| End point                             | Query params        | Method |
| ------------------------------------- | ------------------- | ------ |
| /api/musicalbum?sortDateOfRelease=ASC | `sortDateOfRelease` | GET    |

## 2. API to create/update musician records

### create

| End point     | Method |
| ------------- | ------ |
| /api/musician | POST   |

Body:
{
"name":String,
"musicianType":String
}
musicianType must be either "Vocalist" or "Instrumentalist"

### update

| End point                 | Route Path Params | Method |
| ------------------------- | ----------------- | ------ |
| /api/musician/:musicianId | `musicianId`      | PUT    |

Body:
{
"name":String,
"musicianType":String
"sungOrPlayedAlbums":[ObjectId]
}
musicianType must be either "Vocalist" or "Instrumentalist"

## 4. API to retrieve the list of Music albums for a specified musician sorted by Price in ascending order (i.e Lowest first)

| End point                              | Query params   | Method |
| -------------------------------------- | -------------- | ------ |
| /api/musician/search?musicianname=name | `musicianname` | GET    |

## 5. API to retrieve the list of musicians for a specified music album sorted by musician's Name in ascending order.

| End point                             | Query params | Method |
| ------------------------------------- | ------------ | ------ |
| /api/musicalbum/search?albumname=name | `albumname`  | GET    |
