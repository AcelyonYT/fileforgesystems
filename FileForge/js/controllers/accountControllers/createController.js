// apply strict coding
"use strict";

import Controller from "../controller.js";

export default class CreateController extends Controller {
    constructor() {
        super();
        this.file = "pages/create.ejs";
        this.router.get( "/", this.render.bind( this ) );
        this.router.post( "/add-user", this.createAccount.bind( this ) );
    }

    async createAccount( req, res ) {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const accountModel = this.db.user;
        let account = new accountModel({
            username: username,
            password: password,
            email: email,
            locked: false
        });
        account = await account.save();
        return res.redirect( "/login" );
    }
}