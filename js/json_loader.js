function transport () {
	if (XMLHttpRequest) var requestVar = new XMLHttpRequest ();
	else var requestVar = new ActiveXObject ( "Microsoft.XMLHTTP" );
	return requestVar;
};
var templates = [];
var templatesRequest = transport ();
templatesRequest.onreadystatechange = function () {
	if ( templatesRequest.readyState == 4 ) {
		if ( templatesRequest.status == 200 ) {
			templates = JSON.parse ( templatesRequest.responseText );
			console.log ( templates );
		}
		else { console.warn ( 'Templates is not avaliable. Request status: ' + templatesRequest.status ); postMessage(null); }
	}
}
templatesRequest.open ( "GET", "../json/templates.json" );
templatesRequest.send ();

this.addEventListener( 'message', function ( e ) {
	var sourceURL = e.data;
	var $request = transport ();
	$request.onreadystatechange = function () {
		if ( $request.readyState == 4 ) {
			if ( $request.status == 200 ) postMessage ( JSON.parse ( $request.responseText) );
			else { console.warn ( 'request.status: ' + $request.status ); postMessage(null); }
		}
	}
	$request.open ( "GET", sourceURL );
	$request.send ();
	
} );
