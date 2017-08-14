var app = angular.module('myApp', ['ui.router','ngSanitize']);
app.config(['$stateProvider','$locationProvider','$urlRouterProvider','$provide',function ($stateProvider,$locationProvider,$urlRouterProvider,$provide) {
    $urlRouterProvider.otherwise('/help');
    $locationProvider.hashPrefix("");
    $stateProvider
        .state('help',{ //主页
            url:'/help',
            controller:'help.ctrl',
            template:'<div ng-bind-html="homePage" id="homePage"></div>'
        })
    //创建动态路由
    var menuTwo = [];
    //利用服务请求数据
    $provide.service('docMenu', function () {
        this.menuOne=function(url){
            return $.ajax({
                url: url,
                method:'GET',
                async:false,
                dataType:'json',
                success: function (data) {
                    //创建动态路由
                    var menu = [];
                    if (Array.isArray(data) == true) {
                        menu = data;
                    } else {
                        menu = data.menu;
                    }
                    //获取所有二级目录放入menuTwo数组中
                    for (var i= 0; i < menu.length; i++) {
                        menuTwo.push(menu[i].secondMenu);
                    }
                    for (var j= 0; j < menuTwo.length; j++ ) {
                        for (var k = 0; k < menuTwo[j].length; k++) {
                            $stateProvider.state(
                                menuTwo[j][k].templateUrl, {
                                    url: '/' + menuTwo[j][k].templateUrl,
                                    template: '<div ng-bind-html="textInfo" id="htmlText"></div>'
                            })
                        }
                    }
                }
            });
        }
    });
}]);

app.run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$locationChangeSuccess', function (event,current,prev) {
        $rootScope.path=current.substring(current.lastIndexOf("#"));
    });
}]);
