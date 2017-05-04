var todoApp = angular.module('todoApp', [
    // 'ngRoute',
    'ngCookies',
    'ui.router'
]);

todoApp.factory('tokenInterceptor', function ($window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.localStorage.getItem('token')) {
                config.headers["Authorization"] = 'Token ' + $window.localStorage.getItem('token');
            }
            return config;
        },
        responseError: function () {
            location.href = '/#!/login';
        }
    }
});

todoApp.config(function ($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
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

        $scope.deleteTask = function (id) {
            $http({
                method: 'DELETE',
                url: '/api/tasks/' + id + '/'
            }).then(function successCallback() {
                window.location.reload();
            });
        };

        $scope.completeTask = function (id) {
            $scope.status = {
                'is_completed': true
            };

            $http({
                method: 'PATCH',
                url: '/api/tasks/' + id + '/',
                data: $scope.status
            }).then(function successCallback() {
                window.location.reload();
            });
        }
    });

todoApp.controller('LoginController',
    function LoginController($scope, $http, $window) {
        if ($window.localStorage.getItem('token')) {
            $window.localStorage.removeItem('token')
        }

        $scope.user = {
            'username': $scope.username,
            'password': $scope.password
        };

        $scope.login = function () {
            $http({
                method: 'POST',
                url: '/api-token-auth/',
                data: $scope.user
            }).then(function successCallback(response) {
                $scope.token = response.data['token'];
                $window.localStorage.setItem('token', $scope.token);
                console.log($window.localStorage.getItem('token'));
                window.location.href = "/#!/";
            });
        }

    });

todoApp.controller('RegisterController',
    function RegisterController($scope, $http, $window) {
        $scope.user = {
            'username': $scope.username,
            'email': $scope.email,
            'password': $scope.password
        };

        $scope.register = function () {
            $http({
                method: 'POST',
                url: '/api/users/',
                data: $scope.user
            }).then(function successCallback(response) {
                window.location.href = "/#!/login";
            });
        }

    });

todoApp.controller('NewTaskController',
    function NewTaskController($scope, $http) {
        $scope.task = {
            'text': $scope.text
        };

        $scope.createTask = function () {
            $http({
                method: 'POST',
                url: '/api/tasks/',
                data: $scope.task
            }).then(function successCallback() {
                window.location.href = "/#!/";
            });
        }
    });


todoApp.config(function ($stateProvider, $locationProvider) {
    var tasksState = {
        name: 'tasks',
        url: '/',
        templateUrl: '/static/templates/index.html',
        controller: 'TaskController'
    };

    var loginState = {
        name: 'login',
        url: '/login',
        templateUrl: '/static/templates/login.html',
        controller: 'LoginController'
    };

    var registerState = {
        name: 'register',
        url: '/register',
        templateUrl: '/static/templates/register.html',
        controller: 'RegisterController'
    };

    var newTaskState = {
        name: 'newTask',
        url: '/task/new',
        templateUrl: '/static/templates/create_task.html',
        controller: 'NewTaskController'
    };

    $stateProvider.state(tasksState);
    $stateProvider.state(loginState);
    $stateProvider.state(registerState);
    $stateProvider.state(newTaskState);
    $locationProvider.html5Mode(false).hashPrefix('!');
});

