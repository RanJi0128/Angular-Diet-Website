// Call the dataTables jQuery plugin
$(document).ready(function() {

	//window.setTimeout(esperarEchamar,2000);
	//chamarFunctionDataTable();
	function esperarEchamar(){
		chamarFunctionDataTable();
	};


	function chamarFunctionDataTable(){
		$("#dataTable").DataTable();
	}
});
