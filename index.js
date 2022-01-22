"use strict";

/**
 * Gather dependencies
 */
const express = require("express");
const fileUpload = require('express-fileupload');
const env = require('dotenv');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const http = require('http');
const socketIO = require('./config/socket');
const addToJSONToError = require('./config/jsonable-error');
const fs = require('fs');
const loadModules = require("./config/module-loader");


function buildApp(io = null) {

  /**
   * Add serializability to error
   */
  addToJSONToError();

  /**
   * Read from dotenv
   */
  env.config();

  /**
   * Import all routers
   */
  const routerProvider = require('./config/routes');

  /**
   * Enable global helpers
   */
  require('./config/global');

  /**
   * Initialize the database
   */
  const db = require("./config/database")();

  /**
   * Enable cron
   */
  const cron = require('./config/cron');

  /**
   * Initialize the application
   */
  const app = express();

  /**
   * Create HTTP server.
   */
  const server = http.createServer(app);

  /**
   * Initiate Socket
   */
  const socket = socketIO(server);

  /**
   * Initiate the port
   */
  const port = process.env.PORT || 1000;

  /**
   * Initialize webpush
   */
  // const webpush = require('web-push');

  /**
   * Initialize Logger
   */
  if (process.env.NODE_ENV !== "test") {
    app.use(logger('dev'));
  }

  // Set EJS as templating engine 
  app.set('view engine', 'ejs');
  app.set('views', 'views');

  /**
   * Static Path
   */
  app.use(express.static(path.join(__dirname, 'public')));

  /**
   * Frontend Static files to be served if directory exists
   */
  if (typeof process.env.FRONTEND_APP_BUILD_LOCATION === "string" && fs.existsSync(process.env.FRONTEND_APP_BUILD_LOCATION)) {
    app.use(express.static(process.env.FRONTEND_APP_BUILD_LOCATION));
  }

  /**
   * Use body parser and form and web push
   */

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(fileUpload({
    useTempFiles: true,
    debug: process.env.APP_ENV === "development"
  }));

  /**
   * Enable cors
   */
  app.use(cors());

  /**
   * Load modules
   */
  loadModules(app);

  /**
   * Use All Routes
   */
  app.use('/', routerProvider(socket));

  /**
   * default path
   */
  app.use("*", (req, res) => {
    res.status(404).json({ message: "You might be lost!" });
  });

  app.use(require('./config/errorhandler'));

  return [server, app];
}

module.exports = buildApp;
