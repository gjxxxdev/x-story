"use strict";

const { AppRegistry } = require('react-native');
const App = require('./App').default;
const appName = require('./app.json').name;

AppRegistry.registerComponent(appName, () => App);
