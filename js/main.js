$( document ).ready( function(){


	/**
	* Magnification loupe object
	*
	* @param img - DOM image node upon which to place the loupe
	* @param opt - (optional) json array of options
	* 
	* parameters = {
	* 	zoom: <int> level of magnification ( default is 2 )
	*	size: <string> or <int> width/height of the loupe (eg "100px") 
	*	class: <string> name of the CSS class to give the containing element ( defaults to 'glossy' )
	* }
	* 
	* 
	*/
	function Loupe( img, opt ) {

		// parameters
		this.img = img;
		this.zoom = opt.zoom || 2;

		var className =  opt.class || "glossy";

		// create the loupe
		this.div = $("<div id='lens-container' class='" + className + "'><div id='lens'></div></div>").appendTo( "#the-container" );

		this.div.width( opt.size ).height( opt.size );

		// after setting the size (which may be in px, em, or other units) get the computed size (in px)
		this.size = +window.getComputedStyle( this.div[0], null ).width.replace( 'px', '' );

		// this.div.hover( 
		// 	// mouseover
		// 	function () {
		// 		$( this )
		// 			.animate({ width : "+=10px", height : "+=10px" },{ duration : 10, easing : "easeInQuad" })
		// 			.promise()
		// 			.done( function () {
		// 				// $( this ).animate({ width : "-=10px", height : "-=10px" },{ duration : 10, easing : "easeInQuad" });
		// 			});
		// 	}, 

		// 	// mouseout
		// 	function () {
		// 		// $( this ).animate({ width : "-=10px", height : "-=10px" },{ duration : 10, easing : "easeInQuad" });
		// 	}
		// );

		// wait for the image to load or we'll have problems...
		this.img.onload = function(){

			// make it draggable
			this.div.draggable({

				containment : "parent",
				create : this.create.bind( this ),
				drag : this.drag.bind( this )

			});

		}.bind(this)
	};

	Loupe.prototype = {

		/**
		 * called on creation of the loupe
		 *
		 * @param e - event object 
		 * @param ui - drag properties
		 */
		create : function ( e, ui ) {

			// create the loupe image
			var loupe = $( "<div id='lens-image-container'><img id='lens-image' src='" + this.img.src + "' /></div>" )
				.appendTo( this.div )
				.find('img#lens-image')

			// set the width to 1x magnification
			loupe.width( $( this.img ).width() + "px" );

			// animate zooming in (height is auto)
			loupe.animate({ width : ( $(this.img).width() * this.zoom ) + "px" }, { duration : 1000, easing : "easeInOutQuad" });
		
		},


		/**
		 * called on each drag event
		 *
		 * @param e - event object 
		 * @param ui - drag properties
		 */
		drag : function ( e, ui ) {

			$( '#lens-image' ).offset({
				top : - ( ui.offset.top * this.zoom - ui.offset.top ) + this.size / 2,
				left : - ( ui.offset.left * this.zoom - ui.offset.left ) + this.size / 2
			});
 
		}
	};


	/**
	 *
	 * Magnifier Loupe as a jQuery plugin
	 *
	 *
	 * @param json array opt - array of options
	 *
	 */
	$.fn.loupe = function ( opt ) {

		return $( this ).each( function ( ) {

			// first check if 'this' is an image tag
			if ( this.tagName === "IMG" && this.nodeName === "IMG" ) {

				// determine if the lens already exists
				if ( !$("#lens").length ) {
					var lens = new Loupe( this, opt );
				}

			}

		});
	}

	$("#the-image").loupe({
		zoom : 1.5,
		size : "10em",
		class : "flat" // "Flat", "Metro"
	});


});