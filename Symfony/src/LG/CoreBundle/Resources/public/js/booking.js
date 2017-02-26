/**
 * Created by leo on 02/02/17.
 * We generate a form for client entity. We send data with ajax request.
 */
$(function($) {
    var $formContainerStepTwo = $('#booking-form-container-step-two');
    var $formContainerStepTwoUrl = $formContainerStepTwo.data('create-url');
    var clientsMap = {
        lastname : 'Nom',
        firstname: 'Prénom',
        country : 'Pays de résidence',
        birthdate :'Date de naissance (dd-mm-yyyy)'
    };
    var clients = [];

    
    /**
     * Function that retrieves the number of ordered tickets
     * Then, it's generate form in a for loop
     *
     * Return the correct number of form in twig view
     */
    var numberTicketsGenerate = function()
    {
        //Get number of tickets in order to generate form in a loop
        var $numberTicketsNormal = $('#numberTicketsNormal').text();
        var $numberTicketsChild = $('#numberTicketsChild').text();
        var $numberTicketsReduce = $('#numberTicketsReduce').text();
        var $numberTicketsSenior = $('#numberTicketsSenior').text();
        //Get the current date in order to validate birthdate (child and senior price)
        var $now = new Date();
        var $currentDay = $now.getDate();
        var $currentMonth = $now.getMonth()+1;
        if ($currentMonth < 10){
            $currentMonth = '0' + $currentMonth;
        }
        var $currentYear = $now.getFullYear();
        var $fourYearsOld = $currentDay + '-' + $currentMonth + '-' + ($currentYear - 4);
        var $twelveYearsOld = $currentDay + '-' + $currentMonth + '-' + ($currentYear - 12);
        var $sixtyYearsOld = $currentDay + '-' + $currentMonth + '-' + ($currentYear - 60);
        //In order to increase visitor in a loop
        var $visitor = 0;
        //In order to increase form id in a loop
        var $number = 0;
        
        //Generate forms for normal tickets
        for (i=0; i<$numberTicketsNormal; i++){
            $visitor++;
            $number++;
            generateForm($number);
            $('#form_'+$number).prepend('<div class="visitor normalPriceVisitor">Visiteur n°'+$visitor+'<br/>Tarif Normal</div>');
        }
        
        //Generate forms for reduce tickets
        for (i=0; i<$numberTicketsReduce; i++){
            $visitor++;
            $number++;
            generateForm($number);
            $('#form_'+$number)
                .prepend('<div class="visitor reducePriceVisitor">Visiteur n°'+$visitor+'<br/>Tarif Réduit</div>')
                .append('<div class="radioReducePrice">' +
                            '<input type="radio" name="yes" id="reducePriceYes" required><label for="Yes">Confirmation Tarif Réduit</label>' +
                            '<p id="reduceText">Votre carte d\'étudiant, militaire ou équivalent vous sera demandé à l\'entrée du Musée.</p></div>');
        }
        
        //Generate forms for child tickets
        for (i=0; i<$numberTicketsChild; i++){
            $visitor++;
            $number++;
            generateForm($number);
            $('#form_'+$number)
                .prepend('<div class="visitor childPriceVisitor">Visiteur n°'+$visitor+'<br/>Tarif Enfant</div>')
                .append('<div class="textChildPrice">Le visiteur doit être né entre le ' + $twelveYearsOld + ' et le ' + $fourYearsOld +'</div>');

        }
        
        //Generate forms for senior tickets
        for (i=0; i<$numberTicketsSenior; i++){
            $visitor++;
            $number++;
            generateForm($number);
            $('#form_'+$number)
                .prepend('<div class="visitor seniorPriceVisitor">Visiteur n°'+$visitor+'<br/>Tarif Senior</div>')
                .append('<div class="textSeniorPrice">Le visiteur doit être né avant le '+$sixtyYearsOld+'</div>');
        }
    };

    /**
     * Generates a form depending on a map form
     * Attaches submit event to call an ajax request
     *      - should send an ajax request to allowing client persisting data
     *      - should display success message
     */
    var generateForm = function ($number) {
        var $form = $("<div class='booking-form-container' id='form_"+$number+"'>");
        $formContainerStepTwo.append($form);
        $.each(clientsMap, function (key, value) {
            $form.append(generateFormFields(key, value));
        });
    };

    /**
     * Front validation of client
     */
    var submitClientButton = function () {
        var isValid = false;
        
        var $form = $('<div class="col-md-offset-4">');
        $formContainerStepTwo.after($form);
        $form.append($('<button class="btn btn-primary booking-client__validate">').text('Confirmer la commande'));
        
        $form.on('click', '.booking-client__validate', function() {
            var $visitor = 0;
            var $number = 1;
            $('div.alert.alert-danger').remove();
            $('.booking-form-container').each(function() {
                $visitor++;
                $number++;
                var $lastNameValue = $(this).find('.lastname').val();
                if ($lastNameValue == "" || $lastNameValue.length < 3){
                    isValid = false;
                    return $form.append($('<div class="alert alert-danger messageErrorClient">Visiteur n°'+$visitor+' : Le nom n\'est pas valide</div>'));
                } else {
                    var $firstNameValue = $(this).find('.firstname').val();
                    if ($firstNameValue == "" || $firstNameValue.length < 3){
                        isValid = false;
                        return $form.append($('<div class="alert alert-danger messageErrorClient">Visiteur n°'+$visitor+' : Le prénom n\'est pas valide</div>'));
                    } else {
                        var $countryValue = $(this).find('.country').val();
                        if($countryValue == "" || $countryValue.length < 3) {
                            isValid = false;
                            return $form.append($('<div class="alert alert-danger messageErrorClient">Visiteur n°'+$visitor+' : Le pays de résidence n\'est pas valide</div>'));
                        } else {
                            var $birthDateValue = $(this).find('.birthdate').val();
                            if(!$birthDateValue.match(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)){
                                isValid = false;
                                return $form.append($('<div class="alert alert-danger messageErrorClient">Visiteur n°'+$visitor+' : La date de naissance n\'est pas valide</div>'));
                            } else {
                                isValid = true;
                            }
                        }
                    }
                }
            });
            if( isValid === true )
            {
                var dataForm = getDataForm();
                $.each(dataForm, function(index, value) {
                    createClientModel(value.firstname, value.lastname, value.country, value.birthdate);
                });
                submitClient();
                onSuccessSubmit();
                $('#buttonToStepThree').attr('disabled', false);
            }
        });

    };

    /**
     * Creates a client model
     * @param firstname
     * @param lastname
     * @param country
     * @param birthdate
     */
    var createClientModel = function(firstname, lastname, country, birthdate) {
        var client =  new lg.ClientModel(firstname, lastname, country, birthdate);
        clients.push(client);
    };

    /**
     * Gets the data of the form
     * @returns {{firstame: (*|jQuery), lastname: (*|jQuery), country: (*|jQuery), birthdate: (*|jQuery)}}
     */
    var getDataForm = function() {
        var clients = [];
        $('.booking-form-container').each(function() {
            clients.push({lastname: $(this).find('.lastname').val(), firstname: $(this).find('.firstname').val(), country: $(this).find('.country').val(), birthdate: $(this).find('.birthdate').val() });
        });
        return clients;
    };

    /**
     * Generates form fields depending on a map
     * @param label
     * @param key
     * @returns {*|jQuery|HTMLElement}
     */
    var generateFormFields = function(key, label) {
        var $formGroup = $('<div class="form-group">');
        var $label = $('<label class="control-label required">').text(label);
        var $input = $('<input type="text" class="form-control required '+key+'">');
        $formGroup.append($label, $input);
        return $formGroup;
    };

    /**
     * Send via ajax, clients ARRAY, stringified
     * @returns {*}
     */
    var submitClient = function() {
        return $.ajax({
            method: 'POST',
            url: $formContainerStepTwoUrl,
            data: {data : JSON.stringify(clients)}
        })
    };

    /**
     * Success handler
     * Append a success message
     */
   var onSuccessSubmit = function () {
        $('.booking-client__validate').after('<div class="alert alert-success" id="persistSuccessMessage">Merci, <br/>Informations enregistrées</div>');
    };

    /**
     * Orchestral master
     */
    var render = function () {
        numberTicketsGenerate();
        submitClientButton();
    };

    /**
     * Inits the script
     * @type {function(this:*)}
     */
    var init = function() {
        render();
    }.bind(this);

    init();

});