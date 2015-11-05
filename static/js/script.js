$(function(){

	$("#modal_trigger").leanModal({top : 100, overlay : 0.6, closeButton: ".modal_close" });
	$(".user_register").show();

	$('#test').on('click', function() {
		$('#test2').trigger('submit');
	});

	$( "#datepicker" ).datepicker().datepicker('setDate', new Date());
	// var currentDate = $( "#datepicker" ).datepicker( "getDate" );
	// var date = $("#datepicker").datepicker({ dateFormat: 'dd,MM,yyyy' }).val();
	// console.log(date);



	    $('#calendar').datepicker({
	        showOtherMonths: true,
	        appendText:"(yy-mm-dd)",
	        dateFormat: "yy-mm-dd",
	        onSelect: function (dateText, inst) {
	            console.log(dateText);
	        }
	    });
	




	$('.date1').on('click', function() {
		$('.date2').trigger('submit');
	})
	
})