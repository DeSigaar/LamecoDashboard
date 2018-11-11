![De Sigaar Logo](https://i.gyazo.com/bd001381f989b9443f4769f72c938ca5.png)

# Laméco Dashboard System by De Sigaar

## Table of Contents

- [About](#about)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Clone](#clone)
  - [Setup](#setup)
  - [Running](#running)
- [API documentation](#api-documentation)
- [Built with](#built-with)
- [Creators](#creators)

## About

This project was made by some students from the [Fontys Hogeschool ICT](https://fontys.nl/hbo-ict/) on behalf of [Laméco](https://www.lameco.nl/).

## Prerequisites

- [Node.js](https://nodejs.org/)

## Installation

Make sure you have Node.js installed. If you are unsure if node is installed, run `$ node -v` within terminal/command prompt.

### Clone

Clone this repository to your local machine and move to the new folder.

```
$ git clone https://github.com/MaxAltena/LamecoDashboard.git
$ cd LamecoDashboard
```

### Setup

Install all needed node modules for both frontend and backend.

```
$ npm run install-all
```

If that doens't work for whatever reason or errors are shown. Copy the following lines and run them:

```
$ npm uninstall axios bcryptjs body-parser concurrently express gravatar jsonwebtoken jwt-decode mongoose node-sass-chokidar nodemailer passport passport-jwt react-scripts validator nodemon

$ npm install --save axios bcryptjs body-parser concurrently express gravatar jsonwebtoken jwt-decode mongoose node-sass-chokidar nodemailer passport passport-jwt react-scripts validator && npm install --save-dev nodemon

$ npm uninstall axios classnames jwt-decode moment react react-copy-to-clipboard react-dom react-dropdown react-grid-layout react-live-clock react-moment react-open-weather react-redux react-router-dom react-scripts react-select react-transition-group redux redux-thunk node-sass-chokidar npm-run-all --prefix client

$ npm install --save axios classnames jwt-decode moment react react-copy-to-clipboard react-dom react-dropdown react-grid-layout react-live-clock react-moment react-open-weather react-redux react-router-dom react-scripts react-select react-transition-group redux redux-thunk --prefix client && npm install --save-dev node-sass-chokidar npm-run-all --prefix client
```

### Running

For the application to be able to function as normal, it needs to run both the frontend and backend.

```
$ npm run dev
```

This starts the backend on port 5000 and the frontend on port 3000 concurrently.

## API documentation

The API documentation for the API used within the application can be found on Postman [here](https://documenter.getpostman.com/view/5448152/RWgxtZy1).

## Built with

### Most important stuff

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Node.js](https://nodejs.org/)
- [SASS](https://sass-lang.com/)

### Additional stuff

- [React-Grid-Layout](https://github.com/STRML/react-grid-layout/)  
  Some more stuff here :)

## Creators

- Max Altena - [GitHub](https://github.com/MaxAltena)
- Dylano Hartman - [GitHub](https://github.com/DylanoH)
- Mark Hendriks - [GitHub](https://github.com/MariusHendriks)
- Mike Hendriks - [GitHub](https://github.com/mike-hendriks)
- Bart van de Klundert - [GitHub](https://github.com/Bartvdklu)

See the whole list of [contributors](https://github.com/MaxAltena/LamecoDashboard/contributors) who participated in this project.
