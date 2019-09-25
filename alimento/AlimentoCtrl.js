
app.controller('AlimentoCtrl',function($scope,$http){

	 $http.get('produto/alimentos.json').then(function(response) {
		$scope.foods = response.data;
		
    });
		$scope.selectCount = 0;
		$scope.selectFoodEvent = function(element,num){
	
			var $input = angular.element(element.currentTarget);
			$scope.selectFoodTitle = $input.children()[0].innerText;
			$scope.selectFoodCalory = $input.children()[1].innerText;
	
			$scope.selFoodCalory = num; 
			$scope.selectCount = $scope.selectCount+1;
	
		};
		$scope.delSelectFood = function(){
	
			$scope.selectFoodTitle ="";
			$scope.selectFoodCalory ="";
			$scope.selectCount = $scope.selectCount-1 > 0 ? $scope.selectCount-1 : 0;
		}
	
		$scope.calInput = "";
		$scope.calOutput= function(){
	
			return $scope.calInput * $scope.selFoodCalory / 15;
	
		};

		$scope.selClear = function()
		{
			$scope.selectCount = 0;
			$scope.calInput = 0;
			$scope.selFoodCalory=0;
			$scope.delSelectFood();

		}	

	});