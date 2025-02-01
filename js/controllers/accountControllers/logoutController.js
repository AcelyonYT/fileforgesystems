// apply strict coding
"use strict";

import Controller from "../controller.js";

export default class LogoutController extends Controller {
    constructor() {
        super();
        this.router.get( "/", this.logout.bind( this ) );
    }

    async logout( req, res ) {
        req.session.destroy();
        return res.redirect( "/index" );
    }
}