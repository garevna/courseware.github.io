function transport () {
	if (XMLHttpRequest) var requestVar = new XMLHttpRequest ();
	else var requestVar = new ActiveXObject ( "Microsoft.XMLHTTP" );
	return requestVar;
};

this.addEventListener( 'message', function ( e ) {
	var sourceURL = e.data;
	var $request = transport ();
	$request.onreadystatechange = function () {
		if ( $request.readyState == 4 ) {
			if ( $request.status == 200 ) { console.log ($request.responseText); postMessage ( JSON.parse ( $request.responseText) ); }
			else { console.warn ( 'request.status: ' + $request.status ); postMessage(null); }
		}
	}
	$request.open ( "GET", sourceURL );
	$request.send ();
	
} );
