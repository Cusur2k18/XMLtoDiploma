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


## Hard Fixes! (Not sure who's fault)

In order to do a succesfull build this libraries need to be pre-compiled first to ES5 (again, not sure who's fault).

This is how you pre-compile the files with babel:

#### [Precompile Files with Babel](https://booker.codes/how-to-build-and-publish-es6-npm-modules-today-with-babel/)


- canvg
  * jsdom - [Use this repo to fix this issue](https://github.com/CrystalStream/jsdom-lib-folder-pre-compiled-version)
  * webidl-conversions - [Use this repo to fix this issue](https://github.com/CrystalStream/webidl-conversions)
  * whatwg-url (weird version)

- symbol-tree [Use this repo to fix the issue](https://github.com/CrystalStream/js-symbol-tree)

We also need to pre-compile the file under `node_modules/canvg/node_modules/jsdom/jsdom.js`.

Just go to that file, copy all and use the [Babel REPL](https://babeljs.io/repl/) to pre compile the file, and paste the result again in the same file`(node_modules/canvg/node_modules/jsdom/jsdom.js)`



## TODO

Due to the problems of the production build, will be better if we could ship the canvg library but pre compiled. This repo will contain that simple logic

##### [Canvg pre-compiled](https://github.com/CrystalStream/canvg)