//                                 C O N S T R U C T O R
// -----------------------------------------------------------------------------------------------------
function CoursewarePerspectiveConstructor ( params ) {
	
	this.parentNode = params.parentObject || document.body[0];
	
	this.nestedObject = params.nestedObject || null;
	this.nestedFunction = params.nestedFunction || null;
	
	this.parentNode.appendChild ( this.container );
	
	// this.container.onmouseover = function ( event ) { this.parentObject.mc_perspective ( event ); }
	this.container.parentObject = this;
	
	this.container.appendChild ( this.leftSide );
	this.container.appendChild ( this.rightSide );
	this.container.appendChild ( this.topSide );
	this.container.appendChild ( this.bottomSide );
	this.container.appendChild ( this.centralSide );
	this.container.style.cursor = 'not-allowed';
	
	// ================================================================================== setImages
	this.setImages = function ( _images ) {
		var l = _images.left || this.defaultSideImage;
		var r = _images.right || this.defaultSideImage;
		var t = _images.top || this.defaultSideImage;
		var b = _images.bottom || this.defaultSideImage;
		var c = _images.center || this.defaultCentralImage;
		
		this.leftSide.style.backgroundImage = 'url(' + l + ')';
		this.rightSide.style.backgroundImage = 'url(' + r + ')';
		this.topSide.style.backgroundImage = 'url(' + t + ')';
		this.bottomSide.style.backgroundImage = 'url(' + b + ')';
		this.centralSide.style.backgroundImage = 'url(' + c + ')';
	}
	// ---------------------------------------------------------------------------------------
	this.parentNode.style.cursor = 'none';
	this.setParentNode = function ( parent ) { this.parentNode = parent; }
	this.setNestedObject = function ( nestedObj ) { this.nestedObject = nestedObj; }
	this.setNestedFunction = function ( nestedFunc ) { this.nestedFunction = nestedFunc; }
	// ======================================================================================== setMouseOverCallback
	this.setMouseOverCallback = function () {
		
		var objects = [ this.leftSide, this.rightSide, this.topSide, this.bottomSide, this.centralSide ];
		
		for ( var j = 0; j < objects.length; j++ ) {
			objects[j].parentObject = this;
			
			objects[j].addEventListener('mouseover', function () {
				this.style.opacity = '1';
				var container = this.parentObject.container;
				var _class = this.className;
				TweenLite.to( container, 2, {
					marginTop:  container.coords[_class][0],
					marginLeft: container.coords[_class][1],
					width:      container.coords[_class][2],
					height:     container.coords[_class][2]
				});
			});
			if ( j < objects.length-1 ) {
				objects[j].style.opacity = "0.5";
				objects[j].addEventListener('mouseout', function () { this.style.opacity = "0.5"; });
				objects[j].style.cursor = 'wait';
			}
		}
	}
	
	// ================================================================================== centralSide.onclick
	this.centralSide.addEventListener("mouseover", function() { this.style.cursor = 'pointer'; });
	this.centralSide.addEventListener("click", function (event) {
		var _continue = true;
		if ( this.parentObject.nestedFunction ) {
			_continue = this.parentObject.nestedFunction();
			if ( !_continue ) { return; }
		}
		var perspective_container = this.parentNode;
		var main_container = perspective_container.parentNode;
		if ( this.parentObject.nestedObject ) {
			main_container.replaceChild(this.parentObject.nestedObject, perspective_container);
			var new_container = main_container.children[0];
			new_container.parentObject.initialPosition (new_container);
			new_container.parentObject.perspectiveObjectSize();
		}
		
	}, true);
	
	this.initialPosition = function (obj) {
		obj.style.marginTop = Math.round(window.innerHeight*0.45) + 'px';
		obj.style.marginleft = Math.round(window.innerWidth*0.45) + 'px';
		obj.style.width = Math.round(window.innerWidth*0.1) + 'px';
		obj.style.height = Math.round(window.innerHeight*0.1) + 'px';
	};
	// ================================================================================================= animatedObjectSize
	this.perspectiveObjectSize = function () {
		
		var parentSize = this.parentNode.getBoundingClientRect();
		
		this.container.normalSize = Math.round ( Math.min ( parentSize.width, parentSize.height ) * 0.2 );
		this.container.largeSize = this.container.normalSize * 3;
		this.container.largeSizeTop = Math.round ( ( parentSize.height - this.container.largeSize )/2 );
		this.container.largeSizeLeft = Math.round ( ( parentSize.width - this.container.largeSize )/2 );
		this.container.top = Math.round ( ( parentSize.height - this.container.normalSize )/2 );
		var dy = Math.round ( this.container.top*0.5 );
		this.container.left = Math.round ( ( parentSize.width - this.container.normalSize )/2 );
		var dx = Math.round ( this.container.left*0.5 );
		this.container.coords = {
			garevna_perspectiveCenterSide: [
			    this.container.largeSizeTop + 'px',
				this.container.largeSizeLeft + 'px',
				this.container.largeSize + 'px'
			],
			garevna_perspectiveTopSide:    [
			    this.container.top - dy + 'px',
				this.container.left + 'px',
				this.container.normalSize + 'px'
			],
			garevna_perspectiveRightSide:  [
			    this.container.top + 'px',
				this.container.left + dx + 'px',
				this.container.normalSize + 'px'
			],
			garevna_perspectiveBottomSide: [
			    this.container.top + dy + 'px',
				this.container.right + 'px',
				this.container.normalSize + 'px'
			],
			garevna_perspectiveLeftSide:   [
			    this.container.top + 'px',
				this.container.left - dx + 'px',
				this.container.normalSize + 'px'
			]
		};
		TweenLite.to ( this.container, 2, {
			marginTop:  this.container.top,
			marginLeft: this.container.left,
			width:      this.container.normalSize + 'px',
			height:     this.container.normalSize + 'px'
		} );
	};
	// this.loadData( sourceURL );
	this.perspectiveObjectSize ();
	this.setMouseOverCallback ();
}
CoursewarePerspectiveConstructor.prototype.defaultCentralImage = 'images/object-02.gif';
CoursewarePerspectiveConstructor.prototype.defaultSideImage = 'images/stars-1.gif';

CoursewarePerspectiveConstructor.prototype.container = document.createElement('div');
CoursewarePerspectiveConstructor.prototype.leftSide = document.createElement('div');
CoursewarePerspectiveConstructor.prototype.rightSide = document.createElement('div');
CoursewarePerspectiveConstructor.prototype.topSide = document.createElement('div');
CoursewarePerspectiveConstructor.prototype.bottomSide = document.createElement('div');
CoursewarePerspectiveConstructor.prototype.centralSide = document.createElement('div');

CoursewarePerspectiveConstructor.prototype.container.className = 'garevna_perspectiveContainer';
CoursewarePerspectiveConstructor.prototype.leftSide.className = 'garevna_perspectiveLeftSide';
CoursewarePerspectiveConstructor.prototype.rightSide.className = 'garevna_perspectiveRightSide';
CoursewarePerspectiveConstructor.prototype.topSide.className = 'garevna_perspectiveTopSide';
CoursewarePerspectiveConstructor.prototype.bottomSide.className = 'garevna_perspectiveBottomSide';
CoursewarePerspectiveConstructor.prototype.centralSide.className = 'garevna_perspectiveCenterSide';