'use strict'

class Sprite {
	constructor( img ) {
		this.img = new Image();
		this.img.src = img;
		this.x = this.y = 0;
	}

	update( canvas ) {
		this.render( canvas );
	}

	render( canvas ) {
		const _ctx = canvas.getContext( '2d' );
		_ctx.drawImage( this.img, this.x, this.y );
	}
}