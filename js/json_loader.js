function transport () {
	if (XMLHttpRequest) var requestVar = new XMLHttpRequest ();
	else var requestVar = new ActiveXObject ( "Microsoft.XMLHTTP" );
	return requestVar;
};

function getTemplates () {
	var templatesRequest = transport ();
	templatesRequest.onreadystatechange = function () {
		if ( templatesRequest.readyState == 4 ) {
			if ( templatesRequest.status == 200 )  templates = JSON.parse ( templatesRequest.responseText );
			else console.warn ( 'Templates is not avaliable. Request status: ' + templatesRequest.status );
		}
	}
	templatesRequest.open ( "GET", "json/templates.json" );
	templatesRequest.send ();
}

this.addEventListener( 'message', function ( e ) {
	var sourceURL = e.data;
	var perspective = sourceURL.indexOf ( 'perspective' ) >= 0;
	if ( perspective ) getTemplates ();
	var $request = transport ();
	$request.onreadystatechange = function () {
		if ( $request.readyState == 4 ) {
			if ( $request.status == 200 ) {
				var answer = JSON.parse ( $request.responseText);
				if ( perspective ) {
					for ( var i = 0; i < answer.levels; i++ ) {
						if ( answer.levels [i].template ) {
							answer.levels [i] = templates [ answer.levels [i].template ];
						}
					}
				}
				postMessage ( answer );
			}
			else { console.warn ( 'request.status: ' + $request.status ); postMessage(null); }
		}
	}
	$request.open ( "GET", sourceURL );
	$request.send ();
	
} );
