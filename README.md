# Liangzi Car Rental Webapp

Car rental webapp built for Liangzi Group.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Latest version Node.js and Npm

### Installing

Clone this repo
```
$ git clone <repo-url-here>
```

Install dependencies
```
$ cd lz-carrental-webapp
$ npm install
```

## Develop the app 

Follow Component Driven Development: https://blog.hichroma.com/component-driven-development-ce1109d56c8e

### Running the app

Running the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
```
$ npm start
```

### Running storybook

Running storybook server on [localhost:9009](localhost:9009).
```
$ npm run storybook
```

### Running the tests

Launches the test runner in the interactive watch mode.
Runing unit tests
```
$ npm test
```

## Deployment

- The app will be automatically deployed on Netlify at https://lz-carrental-webapp.netlify.com.<br>
- Storybook will be automatically deployed on Netlify at https://lz-carrental-storybook.netlify.com.<br>
- Every pull request will also have a deployed preview.
