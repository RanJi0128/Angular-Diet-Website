// var services = angular.module('services',['ngResource']);

app.factory('ProdutosFactory',function($resource){

	return $resource('http://localhost::port/api/Alimento/',{port:58839},{
		query: { method: 'GET', isArray: true},
		create: {method: 'POST'}
	})

});

app.factory('ProdutoFactory',function($resource){

	return $resource('http://localhost::port/api/Alimento?id=:id/',{port:'58839'},{
		show: {method: 'GET'},
		update: { method: 'PUT', isArray: true},
		delete: {method: 'DELETE'}
	})
});
