// apply strict coding
"use strict";

import "https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js";

$( () => {
    const error = new URLSearchParams( window.location.search ).get( "error" );
    if( error ) $( "#error" ).text( error );
});