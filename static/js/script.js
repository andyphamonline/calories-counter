$(function(){

	$("#modal_trigger").leanModal({top : 100, overlay : 0.6, closeButton: ".modal_close" });
	$(".user_register").show();

	$('#test').on('click', function() {
		$('#test2').trigger('submit');
	});

	//set today date when clicked on page
	// $( "#datepicker" ).datepicker().datepicker('setDate', new Date());
	// var currentDate = $( "#datepicker" ).datepicker( "getDate" );

	$('#datepicker').datepicker({
        showOtherMonths: true,
        appendText:"(i.e. mm-dd-yy)",
        dateFormat: "mm-dd-yy",
        onSelect: function (dateText, inst) {
            console.log('dateText ' + dateText);
        }
    });

    
	
	


})