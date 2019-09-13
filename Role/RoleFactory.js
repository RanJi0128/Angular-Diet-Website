


var urlBase = "http://localhost::port/api/";

app.factory('RolesFactory', function($resource){

	return $resource(urlBase + '/Role',{port:'58839'},{
		query: {method: 'GET', isArray: true},
		create: {method: 'POST'}
	})

});

app.factory('RoleFactory',function($resource){


	return $resource(urlBase + '/Role?id=@Id',{port:'58839'},{

		show: {method: 'GET'},
		update: { method: 'PUT', isArray: true},
		delete: {method: 'DELETE'}

	})

});

