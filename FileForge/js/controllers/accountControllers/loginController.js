// apply strict coding
"use strict";

import Controller from "../controller.js";

export default class LoginController extends Controller {
    constructor() {
        super();
        this.file = "pages/login.ejs";
        this.router.get( "/", this.render.bind( this ) );
        this.router.post( "/check-login", this.login.bind( this ) );
    }

    async login( req, res ) {
        const username = req.body.user;
        const password = req.body.password;
        const accountModel = this.db.user;
        const account = await accountModel.findOne({ username: username, password: password });
        if( !account ) {
            this.data.error = "Account Not Found";
            return res.redirect( "/login" );
        }
        if( req.body.remember === undefined ) {
            res.clearCookie( "username" );
        } else {
            res.cookie( "username", username, { maxAge: 3600000 } );
        }
        req.session.username = username;
        return res.redirect( "/index" );
    }
}