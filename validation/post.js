const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validatePostInput(data){

    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';
   
    if( !Validator.isLength(data.text,{min:2,max:300})){
        errors.text  = "post must be at least between 2 to 300 characters"
    }
    if( Validator.isEmpty(data.text)){
        errors.text  = "Text field is required"
    }
    
    
    // console.log( isEmpty(errors));
    return {
        errors,
        isValid: isEmpty(errors)
    }
}