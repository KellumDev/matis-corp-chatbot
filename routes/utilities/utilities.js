const utilities = {

    regexMyWizard: input => {
        var regex = /my wizard/gi;
        return result = input.replace(regex, 'mywizard'); 
       // console.log(input.replace(regex, 'mywizard'));
    }
}

module.exports = utilities;