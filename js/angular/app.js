

var app = angular.module('myApp',['ngRoute','ngResource','LocalStorageModule']);

app.config(function($routeProvider)
{
   // remove o # da url
 //  $locationProvider.html5Mode(true);
  // $locationProvider.hashPrefix = '!';

  
  //$httpProvider.interceptors.push('authInterceptorService');

  $routeProvider

   // para a rota '/', carregaremos o template home.html e o controller 'HomeCtrl'
   .when('/', {
    templateUrl : '/login/login.html',
    controller     : 'loginController',
  })
   .when('/login/:msgError', {
    templateUrl : '/login/login.html',
    controller     : 'loginController',
  })

   .when('/login', {
    templateUrl : '/login/login.html',
    controller     : 'loginController',
  })

   // para a rota '/sobre', carregaremos o template sobre.html e o controller 'SobreCtrl'
   .when('/home', {
    templateUrl : '/home/home.html'
     ,controller  : 'HomeCtrl',
     showHeader : true
  })
  .when('/alimento/listar', {
    templateUrl : '/alimento/listar.html',
    controller  : 'AlimentoCtrl',
  })
  .when('/listarProdutos', {
    templateUrl : '/produto/listar.html',
    controller  : 'ProdutoCtrl',
  })
   .when('/adicionarProduto', {
    templateUrl : '/produto/adicionar.html',
    controller  : 'ProdutoCtrl',
  })
   .when('/adicionarProduto/:id', {
    templateUrl : '/produto/adicionar.html',
    controller  : 'ProdutoCtrl',
  })
   .when('/register', {
    templateUrl : '/usuario/register.html',
    controller  : 'UsuarioCtrl',
  })
   .when('/registerPaciente/:id', {
    templateUrl : '/usuario/register.html',
    controller  : 'UsuarioCtrl',
  })
   .when('/cadastrarPaciente', {
    templateUrl : '/usuario/cadastrarPaciente.html',
    controller  : 'UsuarioCtrl',
  })
   .when('/cadastrarPaciente/:id', {
    templateUrl : '/usuario/cadastrarPaciente.html',
    controller  : 'UsuarioCtrl',
  })
   .when('/listarPacientes', {
    templateUrl : '/usuario/listar.html',
    controller  : 'UsuarioCtrl',
  })
   // para a rota '/contato', carregaremos o template contato.html e o controller 'ContatoCtrl'
   .when('/contato', {
    templateUrl : 'app/views/contato.html',
    controller  : 'ContatoCtrl',
  })
  
   // caso não seja nenhum desses, redirecione para a rota '/'
   .otherwise ({ redirectTo: '/' })
 })
 .run(['$rootScope', function($rootScope) {
     $rootScope.$on("$routeChangeSuccess", function(event, next, current) {
         $rootScope.showHeader = next.$$route.showHeader;
     });
 }]);