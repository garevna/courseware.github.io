function transport () {
	if (XMLHttpRequest) var requestVar = new XMLHttpRequest ();
	else var requestVar = new ActiveXObject ( "Microsoft.XMLHTTP" );
	return requestVar;
};

function getTemplates () {
	var templatesRequest = transport ();
	templatesRequest.onreadystatechange = function () {
		if ( templatesRequest.readyState == 4 ) {
			if ( templatesRequest.status == 200 )  {
				self.templates = JSON.parse ( templatesRequest.responseText );
				setAnswer ();
			} else console.warn ( 'Templates is not avaliable. Request status: ' + templatesRequest.status );
		}
	}
	templatesRequest.open ( "GET", "../json/templates.json" );
	templatesRequest.send ();
}
function setAnswer () {
	if ( !self.templates || !self.answer ) return;
	for ( var i = 0; i < self.answer.levels.length; i++ ) {
		if ( self.answer.levels [i].template ) 
			self.answer.levels [i] = self.templates [ self.answer.levels [i].template ];
	}
	postMessage ( self.answer );
}

this.addEventListener( 'message', function ( e ) {
	var sourceURL = e.data;
	var perspective = sourceURL.indexOf ( 'perspective' ) >= 0;
	if ( perspective ) getTemplates ();
	var $request = transport ();
	$request.onreadystatechange = function () {
		if ( $request.readyState == 4 ) {
			if ( $request.status == 200 ) {
				self.answer = JSON.parse ( $request.responseText);
				if ( perspective ) setAnswer();
				else postMessage ( self.answer );
			}
			else { console.warn ( 'request.status: ' + $request.status ); postMessage(null); }
		}
	}
	$request.open ( "GET", sourceURL );
	$request.send ();
	
} );
