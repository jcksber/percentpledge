function adjust_content() 
{
	if ($(window).width() < 768) {
		// LANDING
		$('#landing-mock-lg').addClass('dn');
		$('#landing-mock-sm').removeClass('dn');
		// HOW IT WORKS
		$('#hiw-no-owl').addClass('dn');
		$('#hiw-owl').removeClass('dn');
	}
	else {
		// LANDING
		$('#landing-mock-lg').removeClass('dn');
		$('#landing-mock-sm').addClass('dn');
		// HOW IT WORKS
		$('#hiw-no-owl').removeClass('dn');
		$('#hiw-owl').addClass('dn');
	}
}


$('.hiw-text').click(function(){
	var nexttxt = $(this);
	var currenttxt = $('.hiw-text.active');

	var onum = currenttxt.attr('data-text');
	var oimg = $("#img" + onum);

	var nnum = nexttxt.attr('data-text');
	var nimg = $("#img" + nnum);

	currenttxt.removeClass('active');
	oimg.removeClass('active');

	nexttxt.addClass('active');
	nimg.addClass('active');

});














