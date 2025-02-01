// apply strict coding
"use strict";

import express from "express";
import Database from "../database/database.js";

export default class Controller {
    constructor() {
        this.router = express.Router();
        this.db = new Database();
        this.file = "";
        this.data = {
            username: "",
            error: "",
        };
    }

    render( req, res ) {
        switch( this.file ) {
            case "pages/index.ejs":
                this.data.username = req.session.username == undefined ? "" : req.session.username;
                break;
            case "pages/login.ejs":
                this.data.username = req.cookies.username == undefined ? "" : req.cookies.username;
                break;
        }
        res.render( this.file, this.data );
        this.data.error = "";
    }
}