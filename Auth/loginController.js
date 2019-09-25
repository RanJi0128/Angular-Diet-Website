'use strict';

app.controller('loginController', ['$scope', '$location', 'authService','UsuariosFactory',
'UsuariosPessoaFactory','$filter','$routeParams','localStorageService', function ($scope, $location, authService,UsuariosFactory,UsuariosPessoaFactory,$filter,$routeParams,localStorageService) {

    $scope.loginData = {
        userName: "",
        password: "",
        senhaTemporaria: false,
        senhaAtual: ""
    };

    $scope.cadastroNovaSenhaData = {
        email: "",
        senhaAnterior: "",
        novaSenha: ""
    };
    if($routeParams.msgError)
		$scope.msgError = $routeParams.msgError;

	var authData = localStorageService.get('authorizationData');
	if (authData) {
		var url = $location.$$url;

		if(url === "/"){
			$location.path('/home')
		}
	}	

	console.log('entru')

	$scope.logOut = function () {
		authService.logOut();
		$location.path('/login/');
		$scope.msgError = "Logout efetuado."
	}

	$scope.authentication = authService.authentication;

    $scope.init = function(){
        $scope.senhaTemporaria = true;
        $scope.isNovaSenha = false;
        $scope.pacientesSenhaTemporaria = UsuariosFactory.queryPacientesSenhaTemporaria();
        $scope.message = "";
    };


    $scope.atualizaSenha = function(){

        $scope.cadastroNovaSenhaData.email = $scope.loginData.userName;

        if($scope.cadastroNovaSenhaData.novaSenha != $scope.confirmarSenha){
            $scope.loginMsgError = "As senhas não conferem!";
            return;
        }

        $scope.loginData.userName = $scope.cadastroNovaSenhaData.email;
        $scope.loginData.password = $scope.cadastroNovaSenhaData.novaSenha;

        UsuariosPessoaFactory.cadastrarNovaSenha($scope.cadastroNovaSenhaData).$promise.then($scope.login).catch(trataException);

    };


    $scope.verificaSenhaTemporaria = function(){

        if($scope.loginData.userName){

            var user = $filter('filter')($scope.pacientesSenhaTemporaria, { Email: $scope.loginData.userName });
            if(user.length == 0){
                $scope.senhaTemporaria = false;    
                $scope.isNovaSenha = false;
            }else{
                $scope.senhaTemporaria = true;    
                $scope.isNovaSenha = true;
            }

        }else
        {
            $scope.senhaTemporaria = true;    
        }
    }

    
    
    $scope.login = function () {
        
       // authService.login($scope.loginData).then(function (response) {
        //    $scope.msgError = "";
            $location.path('/alimento/listar'); //*********/alimento/listar
       // },
       // function (err) {
       //    $scope.loginMsgError = "Usuario ou senha não encontrado!";
      // });
    };

}]);