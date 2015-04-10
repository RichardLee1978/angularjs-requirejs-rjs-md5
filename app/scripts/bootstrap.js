require.config( {
    paths : {
        angular : '../vendor/angular/angular' ,
        angularUIRouter : '../vendor/angular/angular-ui-router'
    } ,
    shim : {
        angular : {
            exports : 'angular' ,
            init : function () {
                // ---------------------��Ҫ����Σ�------------------------------
                // Ӧ����������ֱ���� module.controller �ȷ���������ᱨ������δ����Ĵ���
                // �� http://stackoverflow.com/questions/20909525/load-controller-dynamically-based-on-route-group
                // ����ο���https://github.com/Treri/angular-require/blob/master/angular-require.js#L44
                var _module = angular.module;
                angular.module = function () {
                    var newModule = _module.apply( angular , arguments );
                    if ( arguments.length >= 2 ) {
                        newModule.config( [
                            '$controllerProvider' ,
                            '$compileProvider' ,
                            '$filterProvider' ,
                            '$provide' ,
                            function ( $controllerProvider , $compileProvider , $filterProvider , $provide ) {
                                newModule.controller = $controllerProvider.register;
                                newModule.directive = $compileProvider.directive;
                                newModule.filter = $filterProvider.register;
                                newModule.factory = $provide.factory;
                                newModule.service = $provide.service;
                                newModule.provider = $provide.provider;
                                newModule.value = $provide.value;
                                newModule.constant = $provide.constant;
                                newModule.decorator = $provide.decorator;
                            }
                        ] );
                    }
                    return newModule;
                };
            }
        } ,
        angularUIRouter : [ 'angular' ]
    } ,
    map : {
        '*' : {
            'css' : '../vendor/require/css'
        }
    }
} );

define( [
    'angular' ,
    'angularUIRouter' ,
    './app' ,

    // ���õķ����ָ����������
    'services/UserLoginService' ,
    'directives/focus-me'
] , function ( angular ) {
    angular.module( 'bootstrap' , [ 'ui.router' , 'app' ] );
    angular.bootstrap( document , [ 'bootstrap' ] );
} );


