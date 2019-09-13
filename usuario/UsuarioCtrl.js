app.controller('UsuarioCtrl',['$scope','$location','UsuariosFactory','UsuarioFactory','$routeParams','RolesFactory','UsuariosPessoaFactory','UsuariosPacienteFactory',
	function($scope,$location,UsuariosFactory,UsuarioFactory,$routeParams,RolesFactory,UsuariosPessoaFactory,UsuariosPacienteFactory){


		$scope.initListaPacientes = function(){
			$scope.usuarios = UsuariosFactory.getUsuariosByUserLogado();	
		}

		
		var isCadastroDePaciente = false;

		var url = $location.$$url;
		var id = undefined; 
		//debugger;
		$scope.perfis = RolesFactory.query();

		if(url.indexOf("cadastrarPaciente") > 0){
			id = $routeParams.id;
			isCadastroDePaciente = true;
			//debugger;
			if(id){
				UsuarioFactory.show({id:id}).$promise.then(function(data){
					$scope.usuario = data;
					$scope.confirmacaoSenha = data.Senha;
				});
			}
		}

		//var url = $location.$$url;

		$scope.salvarUsuario = function(){

			if(id == undefined){
				adicionarUsuario();
			}else{
				alterarUsuario();
			}
		};

		$scope.desassociarPaciente = function(){
			debugger;
			UsuarioFactory.desassociarPaciente({id:$scope.usuario.Id},$scope.usuario)
			.$promise.then(function(usuario){
				$scope.msgSucesso = "Paciente desassociado com sucesso!";
			}).catch(trataException);
		}

		$scope.alterarPaciente = function(id){
			$location.path("/cadastrarPaciente/" + id);
		}

		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			$("#dataTable").DataTable();
		});

		$scope.convertToObject = function(role){
			$scope.selectedRole = angular.fromJson(role);
		}
		
		function adicionarUsuario(){
			if(!isCadastroDePaciente){

				if($scope.usuario.Senha != $scope.confirmacaoSenha){
					$scope.msgError = "As senhas não conferem!";
					$scope.usuario.Senha = "";
					$scope.confirmacaoSenha = "";
					return;
				}

				$scope.usuario.Roles = new Array();

				var customUserRole = {
					RoleId: $scope.selectedRole.Id
				};

				$scope.usuario.Roles.push(customUserRole);

				UsuariosPessoaFactory.create($scope.usuario)
				.$promise.then(usuarioAdicionadoComSucesso)
				.catch(trataException);
			}else{
				UsuariosPacienteFactory.cadastrarPaciente($scope.usuario)
				.$promise.then(usuarioAdicionadoComSucesso)
				.catch(trataException);
			}
		}

		function alterarUsuario() {
			UsuarioFactory.update({id:$scope.usuario.Id},$scope.usuario)
			.$promise.then(function(usuario){
				$scope.msgSucesso = "Paciente salvo com sucesso!";
			}).catch(trataException);
		}
		
		function usuarioAdicionadoComSucesso(usuario){
			$scope.msgSucesso = $scope.usuario.Nome + " salvo com sucesso!";
			delete $scope.usuario;
			$scope.confirmacaoSenha = "";
			$scope.msgError = "";
		}


		function parseErrors(response) {
			var errors = "";
			for (var key in response.ModelState) {
				for (var i = 0; i < response.ModelState[key].length; i++) {
					errors += response.ModelState[key][i] + ";";
				}
			}
			return errors;
		}

	}]);



	// function trataException(errorResponse) {
		// 	if(errorResponse.data){
		// 		if(errorResponse.data.ExceptionMessage){
		// 			$scope.msgError = "Ocorreu um erro: " + 
		// 			errorResponse.data.ExceptionMessage;
		// 		}else if(errorResponse.data.Message){
		// 			$scope.msgError = errorResponse.data.Message;
		// 		}else{
		// 			$scope.msgError = parseErrors(errorResponse.data);
		// 		}
		// 	}else if(errorResponse.Exception)
		// 	$scope.msgError = "Ocorreu um erro: " + errorResponse.Exception;
		// 	else
		// 		$scope.msgError = "Ocorreu um erro!"
		// 	$scope.msgSucesso = "";
		// }
