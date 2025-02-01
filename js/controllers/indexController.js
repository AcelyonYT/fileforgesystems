// apply strict coding
"use strict";

import Controller from "./controller.js";

export default class IndexController extends Controller {
    constructor() {
        super();
        this.file = "pages/index.ejs";
        this.router.get( "/", this.render.bind( this ) );
    }
}