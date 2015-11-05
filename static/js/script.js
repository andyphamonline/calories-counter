$(function(){

	$("#modal_trigger").leanModal({top : 100, overlay : 0.6, closeButton: ".modal_close" });
	$(".user_register").show();

	$('#test').on('click', function() {
		$('#test2').trigger('submit');
	});

	$( "#datepicker" ).datepicker();
	
})