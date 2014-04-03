$( document ).ready( function(){


	function Lens( img, opt ) {

		// parameters
		this.img = img;
		this.zoom = opt.zoom ? opt.zoom : 2

		// create the loupe
		this.div = $("<div id='lens-container'><div id='lens'></div></div>").appendTo( "#the-container" );

		// wait for the image to load or we'll have problems...
		this.img.onload = function(){

			// make it draggable
			this.div.draggable({

				containment : "parent",
				create : this.create.bind( this ),
				drag : this.drag.bind( this )

			}).css("position", "absolute");

		}.bind(this)
	};

	Lens.prototype = {

		/**
		 *
		 *
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
		 *
		 * @param e - event object 
		 * @param ui - 
		 */
		drag : function ( e, ui ) {

			$( '#lens-image' ).offset({
				top : - ( ui.offset.top * this.zoom - ui.offset.top ),
				left : - ( ui.offset.left * this.zoom - ui.offset.left ) 
			});
 
		}
	};


	/**
	 *
	 * Convex Lens magnifier
	 *
	 *
	 * @param json array opt - array of options
	 *
	 */
	$.fn.convex = function ( opt ) {

		return $( this ).each( function ( ) {

			// first check if 'this' is an image tag
			if ( this.tagName === "IMG" && this.nodeName === "IMG" ) {

				// determine if the lens already exists
				if ( !$("#lens").length ) {
					var lens = new Lens( this, opt );
				}

			}
			// TODO background image

		});
	}

	$("#the-image").convex({
		zoom : 1.5
	});


});