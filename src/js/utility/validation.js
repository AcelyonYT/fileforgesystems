// apply strict coding
"use strict";

export { isEmpty, isEmail, passwordsMatch };

// check to see if a field is empty
async function isEmpty( element ) {

    // check for empty
    if ( element.val() == "" )
        throw new Error( "Required" );

}

// check that the email address is in the form
//      of an email address
async function isEmail( element ) {

    // use regular expressions to check the email
    //      a regular expression that checks for:
    //          One @
    //          a period after the @
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if( ! emailCheck.test( element.val() ) )
        throw new Error( "Not an Email" );

}

// check for matching passwords
async function passwordsMatch( element1, element2 ) {

    // check the match
    if ( element1.val() != element2.val() )
        throw new Error( "Passwords do not match" );

}
