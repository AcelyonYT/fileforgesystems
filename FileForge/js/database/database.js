// apply strict coding
"use strict";

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userSchema from './schemas/users.js';
dotenv.config();

export default class Database { 
    constructor() {
        this.db = mongoose.connection;
        this.user = this.db.model( 'user', userSchema );
    }

    connectDB() {
        mongoose.set( "strictQuery", true );
        this.db.once( "open", () => {
            console.log( "Database connected!" );
        } );
        this.db.on( "error", ( error ) => {
            console.log( `Error connecting to the database: ${error}` );
        } );
        mongoose.connect( process.env.DBURL );
    }
}