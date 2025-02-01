// apply strict coding
"use strict";

import "https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js";

import * as validation from "./validation.js";

$( () => {

    $( "#createForm" ).on( "submit", ( jqEvent ) => {
        // stop the default processing of submit
        jqEvent.preventDefault();

        // call the sign up validation function
        const result = validateForm();
    });

    $( "#password" ).on( "input", ( jqEvent ) => {
        updatePasswordStrength( $( "#password" ) );
    });

    $( "#confirm" ).on( "blur", ( jqEvent ) => {
        // clear any existing error message
        $( `label[for="confirm"] span` ).remove();

        // validate matching passwords
        validation.passwordsMatch( $( "#password" ), $( "#confirm" ) )
            // catch a validation exception
            .catch( ( error ) => addError( $( "#confirm" ), error ) )
            // catch the second exception from addError
            //      ignore it
            .catch( () => { } );
    });

});

// add an error message to the field
async function addError( element, error ) {
    
    // add a span to the related label
    const id = element.attr( "id" );
    $( `label[for="${id}"]` ).append( `<span> **${error.message}**</span>`);

    // rethrow the error
    //      do this so the Promise.all method
    //      can distinguish between all validation promises
    //      successfully completing or at least
    //      one validtion promise having an error
    throw error;

}

// validate theform
async function validateForm() {

    // remove error messages
    $( "label span" ).remove();

    // create an array to hold all validation
    //      promises
    const promises = [ ];

    // the current count of promises
    //      used to add promises to the array
    let count = 0;

    // validate the input fields

    // username
    //      add to the promises array
    promises[ count ] = 
            // enforce required
            validation.isEmpty( $( "#username" ) )
                // handle any exceptions from validations
                //      update the form with the error message 
                .catch( ( error ) => addError( $( "#username" ), error ) );
    // update the promise count
    count++;

    // email
    promises[ count ] =
            validation.isEmpty( $( "#email" ) )
                .then( () => validation.isEmail( $( "#email" ) ) )
                .catch( ( error ) => addError( $( "#email" ), error ) );
    count++;            

    // password
    promises[ count ] = 
            validation.isEmpty( $( "#password" ) )
                .catch( ( error ) => addError( $( "#password" ), error ) );
    count++;

    // confirm password
    promises[ count ] = 
            validation.isEmpty( $( "#confirm" ) )
                .then( () => validation.passwordsMatch( $( "#password" ), $( "#confirm" ) ) )
                .catch( ( error ) => addError( $( "#confirm" ), error ) );
    count++;

    // wait until all the promises resolve (finish)
    //      Promise.all will return if all complete successfully
    //      or one promise has an error
    await Promise.all( promises )
            // if no errors, submit the form
            .then( () => document.forms.createForm.submit() )
            // if there is an error, do nothing here
            //      the form has been updated with the
            //      error message in addError
            .catch( ( error ) => {} );

}

// update the password strength
function updatePasswordStrength( element ) {

    // get the elements and password length
    const strength = $( "#strength" );
    const passwordLength = element.val().length;

    // if it is empty, don't show anything
    if ( passwordLength === 0 ) return strength.text( "Password Strength:" ).removeClass( "weak", "ok", "strong" );

    // passwords < 5 characters are weak
    if ( passwordLength < 5 ) return strength.text( "Password Strength: Weak" ).removeClass( "weak", "ok", "strong" ).addClass( "weak" );

    // passwords between 5 and 10 characters are ok
    if ( passwordLength < 10 ) return strength.text( "Password Strength: OK" ).removeClass( "weak", "ok", "strong" ).addClass( "ok" );

    // passwords over 10 characters are strong
    return strength.text( "Password Strength: Strong" ).removeClass( "weak", "ok", "strong" ).addClass( "strong" );
   
}