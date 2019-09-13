app.controller('ProdutoCtrl',['$scope','$location','ProdutosFactory','ProdutoFactory','$routeParams',
	function($scope,$location,ProdutosFactory,ProdutoFactory,$routeParams){

		$scope.produtos = ProdutosFactory.query();
		var url = $location.$$url;

		var id = undefined; 
		if(url.indexOf("adicionarProduto") > 0){
			id = $routeParams.id;
			//debugger;
			if(id){
				ProdutoFactory.show({id:id}).$promise.then(function(data){
					$scope.alimento = data;
				});
			}
		}

		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			$("#dataTable").DataTable();
		});
		
		$scope.salvar = function(){

			if(id == undefined){
				adicionarAlimento();
			}else{
				alterarAlimento();
			}

			
		};

		function adicionarAlimento(){
			var teste = ProdutosFactory.create($scope.alimento).
			$promise.then(function(teste) {
				$scope.msgSucesso = "Alimento adicionado com sucesso!";
				$scope.reset();
			}).catch( function(errorResponse) {
				if(errorResponse.data){
					$scope.msgError = "Ocorreu um erro ao adicionar: " + errorResponse.data.ExceptionMessage;
				}else if(errorResponse.Exception)
				$scope.msgError = "Ocorreu um erro ao adicionar: " + errorResponse.Exception;
				else
					$scope.msgError = "Ocorreu um erro ao adicionar!"

				$scope.msgSucesso = "";

			});
		}

		function alterarAlimento(){
			debugger;
			ProdutoFactory.update({id:$scope.alimento.Id},$scope.alimento)
			.$promise.then(function(produto){
				$scope.msgSucesso = "Alimento salvo com sucesso!";
			}).catch( function(errorResponse) {
				if(errorResponse.data){
					if(errorResponse.data.ExceptionMessage){
						$scope.msgError = "Ocorreu um erro ao salvar: " + 
						errorResponse.data.ExceptionMessage;
					}else{
						debugger;
						$scope.msgError = parseErrors(errorResponse.data);
					}
				}else if(errorResponse.Exception){
					$scope.msgError = "Ocorreu um erro ao salvar: " + errorResponse.Exception;
				}
				else
					$scope.msgError = "Ocorreu um erro ao salvar!"

				$scope.msgSucesso = "";
			});
		}

		$scope.alterarAlimento = function(id){
			$location.path("/adicionarProduto/" + id);
		}

		$scope.reset = function(form){

			$scope.msgError = "";

			$scope.alimento = {Descricao: '', QtdCarboidrato: ''};
		};

	}]);