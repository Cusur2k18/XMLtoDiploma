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
  {
  "data": {
    "congressmen": [
      {
        "name": "Some name",
        "code": "some code"
      },
      .
      .
      .
    ],
    "events": [
      {
        "id": "ID_UNIQUE_FOR_EVENT",
        "name": "Nice name",
        "diploma_url": "This should be the image you want to print on the pdf",
        "users": [
          {
            "id": "some code",
            "name": "the name."
          },
          .
          .
          .
        ]
      },
      .
      .
      .
    ]
  }
}
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

Since we use firebase, first you need have an account in firebase.

All you need to do is

```
firebase login
```

This will login with firebase, then

```
firebase init
```

and choose hosting, then attach o create a new app to this hosting.

Finally

```
firebase deploy
```

Enjoy it!