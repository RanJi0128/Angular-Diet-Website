function trataException(errorResponse) {

	var divMsgErro = $('.msgError');
	var divMsgSucesso =  $('.msgSucesso');

	if(errorResponse.data){
		if(errorResponse.data.ExceptionMessage){
			divMsgErro.html("Ocorreu um erro: " + 
				errorResponse.data.ExceptionMessage);
		}else if(errorResponse.data.Message){
			divMsgErro.html(errorResponse.data.Message);
			if (errorResponse.data.InnerException){
				divMsgErro.html(errorResponse.data.InnerException.Message);
				if (errorResponse.data.InnerException.InnerException){
					divMsgErro.html(errorResponse.data.InnerException.InnerException.Message);
				}
			}
		}else{
			divMsgErro.html(parseErrors(errorResponse.data));
		}
	}else if(errorResponse.Exception){
		divMsgErro.html("Ocorreu um erro: " + errorResponse.Exception);
	}else{
		divMsgErro.html("Ocorreu um erro!");
	}

	divMsgSucesso.html('');
}