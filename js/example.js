
$( document ).ready( function(){

	// call the loupe
	$("#the-image").monocle({

		// parameters
		zoom : 1.5,
		size : "10em",
		className : "smooth",

		// callbacks
		mouseenter : function ( e ) {}, 
		mouseleave : function ( e ) {},
		drag : function ( e ) {}
	});

});