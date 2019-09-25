app.controller('HomeCtrl',function($scope,$rootScope,$location,localStorageService){


	const MEDIC_ROLE = 2
	const ADMIN_ROLE = 3

	 var authData = localStorageService.get('authorizationData');
        if (!authData) {
        	var url = $location.$$url;
			if(url.indexOf("home") > 0){
				$location.path('/login')
			}
		}else{
			$scope.NomeUsuario = authData.NomeUsuario;
			$scope.Roles = authData.Roles;
		}

		$scope.getLoggedUser = () => {
			let user = undefined
			user = localStorageService.get('authorizationData');
			
			return user
		}

		$scope.loggedUserIsMedicOrAdmin = _ => {
			user = localStorageService.get('authorizationData');
			if(user && user.Roles){
				const roles = user.Roles
				return roles.includes(MEDIC_ROLE) && !roles.includes(ADMIN_ROLE)
			}
		}
		
		// $scope.getRoles() =	 _ =>{ 
		// 	return authData.Roles;
		// }

});