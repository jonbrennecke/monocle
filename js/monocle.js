/**
 *
 *                                  | |     
 *  _ __ ___   ___  _ __   ___   ___| | ___ 
 * | '_ ` _ \ / _ \| '_ \ / _ \ / __| |/ _ \
 * | | | | | | (_) | | | | (_) | (__| |  __/
 * |_| |_| |_|\___/|_| |_|\___/ \___|_|\___|
 *                                         
 * 
 * MONOCLE jQuery plugin
 * 
 * Copyright 2014, Brett Berry and Jonathan Brennecke, all rights reserved
 * 
 *
 */



/**
 * Magnification loupe object
 *
 * @param img - DOM image node upon which to place the loupe
 * @param opt - (optional) json array of options
 * 
 * parameters = {
 * 	zoom: <int> level of magnification ( default is 2 )
 *	size: <string> or <int> width/height of the loupe (eg "100px") 
 *	className: <string> name of the CSS class to give the containing element ( defaults to 'glossy' )
 * }
 * 
 */
function Loupe( img, opt ) {

	// merge the json objects with an object of default options
	this.opt = $.extend({
		zoom : 1.5,
		className : "glossy",
		size : "150px"
	}, opt );

	this.img = img;
	this.zoom = this.opt.zoom;

	// create the loupe
	this.div = $("<div id='lens-container' class='" +  this.opt.className + "'><div id='lens'></div></div>")
		.appendTo( this.img.parentNode );

	this.div.width( this.opt.size ).height( this.opt.size );

	// after setting the size (which may be in px, em, or other units) get the computed size (in px)
	this.size = +window.getComputedStyle( this.div[0], null ).width.replace( 'px', '' );

	// attach the mouseover/out callbacks
	this.div.hover( this.mouseenter.bind( this ), this.mouseleave.bind( this ) );

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

		// align the loupe
		this.drag( e, { offset : { top : 0, left : 0 } } );

		// animate zooming in (height is auto)
		loupe.animate({ width : ( $(this.img).width() * this.zoom ) + "px" }, { duration : 1000, easing : "easeInOutQuad" });
	
	},


	/**
	 * called on each drag event
	 *
	 * the user-provided drag callback function is called if one has been provided
	 *
	 * @param e - event object 
	 * @param ui - drag properties
	 */
	drag : function ( e, ui ) {

		$( '#lens-image' ).offset({
			top : - ( ui.offset.top * this.zoom - ui.offset.top + ( this.size * ( this.zoom - 1 ) / 2 ) ),
			left : - ( ui.offset.left * this.zoom - ui.offset.left + ( this.size * ( this.zoom - 1 ) / 2 ) )
		});

		// fire the user-provided callback function
		if ( this.opt.drag ) {
			this.opt.drag.call( this.div, e, ui );
		}

	},

	/**
	 * called on mouseenter event over the loupe
	 * 
	 * the user-provided mouseenter callback function is called if one has been provided
	 *
	 * @param e - event object 
	 */
	mouseenter : function ( e ) {

		// fire the user-provided callback function
		if ( this.opt.mouseenter ) {
			this.opt.mouseenter.call( this.div, e );
		}
	},

	/**
	 * called on mouseleave event over the loupe
	 *
	 * the user-provided mouseleave callback function is called if one has been provided
	 *
	 * @param e - event object 
	 */
	mouseleave : function ( e ) {

		// fire the user-provided callback function
		if ( this.opt.mouseleave ) {
			this.opt.mouseleave.call( this.div, e );
		}
	}
};


/**
 *
 * magnifier loupe jQuery plugin
 *
 *
 * @param json array opt - array of options
 * @return jQuery object from selector
 */
$.fn.monocle = function ( opt ) {

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
