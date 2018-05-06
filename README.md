# XML to Diploma

## Installation
------

First clone the project

```bash
git clone <repo_name>
```

We use [Create React App](https://github.com/facebookincubator/create-react-app) to build this really simple app, so all you need to do for now is just install all libraries:

```bash
npm install
```

or 

```bash
yarn install
```

and then just run:

```bash
npm start
```

## BASIC SETUP
------

> This app uses [Firebase](https://firebase.google.com/) as a BaaS platform. You'll need to have a firebase app running
> to be able to use this app.

In order to have everything working you'll need to have an already defined schema (db) that looks like: 

```javascript
{
  "events": [
    {
      "id": "<SomeID>",
      "name": "<NiceName>",
      "users": [
        { 
          "id": "<userId>",
          "name": "<userName>",
          "lastname": "<userLastName>"
        },
        .
        .
        .
      ]
    }
  ]
}
```

The application is meant to work with __ONLY__ this data structure. Feel free to fork it and 
making it bigger.

This repo already contains a json file with some fake data under `config/database.local.json`.

You can use that data to create a basic db on __Firebase__.

First you have to create a `.env` file with the following:

```
FIREBASE_URL=<YOU_FIREBASE_URL>
```

after that you can just run the app and should be working.

## Deploy
------

Coming Soon....