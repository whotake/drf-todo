var todoApp = angular.module('todoApp', [
    'ngRoute',
    'ngCookies'
]);

todoApp.factory('tokenInterceptor', function ($cookies) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            console.log($cookies.get('token'));
            if ($cookies.get('token')) {
                config.headers["Authorization"] = 'Token ' + $cookies.get('token');
            }
            return config;
        },
        responseError: function () {
            // location.href = '/login/';
        }
    }
});

todoApp.config(function ($httpProvider) {
    // $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    // $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.interceptors.push('tokenInterceptor');
});

todoApp.controller('TaskController',
    function TaskController($scope, $http) {
        $scope.tasks = null;
        $http({
            method: 'GET',
            url: '/api/tasks/'
        }).then(function (response) {
            $scope.tasks = response.data;
            console.log($scope.tasks)
        });
    });

todoApp.controller('LoginController',
    function LoginController($scope, $http) {
        $scope.user = {
            'username': $scope.username,
            'password': $scope.password
        };

        $scope.login = function () {
            $http({
                method: 'POST',
                url: '/api-token-auth/',
                params: $scope.user
            }).then(function successCallback(response) {
                console.log(response);
                console.log(user);
                $scope.token = response["token"];
                document.cookie = 'token=' + $scope.token + ";path=/";
                // location.href = "/";
            });
        }

    });


angular.module('todoApp').config(['$routeProvider',
    function config($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/static/templates/login.html',
            controller: 'LoginController'
        }).when('/login/', {
            templateUrl: '/static/templates/login.html',
            controller: 'LoginController'
        // $routeProvider.when('/', {
        //     templateUrl: '/static/templates/index.html',
        //     controller: 'TaskController'
        // }).when('/login/', {
        //     templateUrl: '/static/templates/login.html',
        //     controller: 'LoginController'
        }).otherwise('/api/tasks/');
    }
]);
