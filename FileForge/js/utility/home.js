// apply strict coding
"use strict";

import "https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js";

$( () => {
    $( ".dropDownButton" ).on( "click", function() {
        $( "#userDropDown" ).toggleClass( "show" );
    });

    // Close the dropdown if the user clicks outside of it
    $( window ).on("click", function(event) {
        if( !$( event.target ).closest( '.dropDownButton' ).length ) {
            $( ".dropdown-content" ).removeClass( "show" );
        }
    });

});