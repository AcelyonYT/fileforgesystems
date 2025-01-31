// apply strict coding
"use strict";

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import Controller from './controllers/controller.js';
import IndexController from './controllers/indexController.js';
import CreateController from './controllers/accountControllers/createController.js';
import LoginController from './controllers/accountControllers/loginController.js';
import LogoutController from './controllers/accountControllers/logoutController.js';

export default class App {
    constructor() {}

    init() {
        this.app = express();
        this.port = 8080;

        this.useMiddleware();
        this.loadControllers();
        this.loadDB();
        this.addRoutes();
        this.listenToServer();
    }
    
    useMiddleware() {
        this.app.get( "/", ( _req, res ) => {
            res.redirect( "/index" );
        });
        this.app.set( "view engine", "ejs" );
        this.app.use( cookieParser( "secret" ) );
        this.app.use( session( { 
            saveUninitialized: true,
            resave: "true",
            secret: "secret"
        } ) );
        this.app.use( bodyParser.json() );
        this.app.use( bodyParser.urlencoded( { extended: true } ) );
        this.app.use( express.json() );
        this.app.use( express.urlencoded( { extended: true } ) );
        this.app.use( cors() );
        this.app.use( express.static( "C:\\Users\\Epicg\\Desktop\\FileForge" ) );
    }

    loadControllers() {
        this.controller = new Controller();
        this.indexController = new IndexController();
        this.createController = new CreateController();
        this.loginController = new LoginController();
        this.logoutController = new LogoutController();
    }

    loadDB() {
        this.controller.db.connectDB();
    }

    addRoutes() {
        this.app.use( "/index", this.indexController.router );
        this.app.use( "/create", this.createController.router );
        this.app.use( "/login", this.loginController.router );
        this.app.use( "/logout", this.logoutController.router );
    }

    listenToServer() {
        this.app.listen( this.port, () => {
            console.log( `Server is running on port ${ this.port }` );
        });
    }
}