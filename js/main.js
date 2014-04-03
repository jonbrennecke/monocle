$(document.body).ready( function(){


	function Lens( img ) {

		// 
		var div = $("<div id='lens-container'><div id='lens'></div></div>").appendTo( "#the-container" );


		div.draggable({

			containment : "parent",

			create : function ( e, ui ) {

				// create the magnified image
				div.append( "<div id='lens-image-container'><img id='lens-image' src='" + img.src + "' /></div>" );
			
			},

			drag : function ( e, ui ) {

				$( '#lens-image' ).offset({
					top : -ui.offset.top - 50,
					left : -ui.offset.left - 100 
				});

			}
		});
	};

	Lens.prototype = {

	};


	/**
	 *
	 * Convex Lens magnifier
	 *
	 */
	$.fn.convex = function ( ) {

		return $( this ).each( function () {

			// first check if 'this' is an image tag
			if ( this.tagName === "IMG" && this.nodeName === "IMG" ) {

				// determine if the lens already exists
				if ( !$("#lens").length ) {
					var lens = new Lens( this );
				}

			}
			// TODO background image


			// document.body.append()
		});
	}

	$("#the-image").convex();


});