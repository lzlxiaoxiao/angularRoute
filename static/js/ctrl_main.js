app.controller('main.ctrl',['$scope','$rootScope','$sce','docMenu', function ($scope,$rootScope,$sce,docMenu) {
    $scope.menuTwo = [];
    $scope.textInfo ='';
    $rootScope.exUrl = '././data/';
    //调用服务
    docMenu.menuOne($rootScope.exUrl+'menu.json').then(function (xhr) {
        if (Array.isArray(xhr) == true) {
            $rootScope.menu = xhr;
        } else {
            $rootScope.menu = xhr.menu;
        }
        //获取所有二级目录放入$scope.menuTwo数组中
        for (var i= 0; i < $rootScope.menu.length; i++ ) {
            $scope.menuTwo.push($rootScope.menu[i].secondMenu);
        }
    });
    //每个二级菜单对应的页面内容$scope.textInfo
    $scope.secTool = function (router) {
        window.scrollTo(0,0); //切换时滚动条置顶
        for (var i = 0; i < $scope.menuTwo.length; i++) {
            for (var j = 0; j < $scope.menuTwo[i].length; j++) {
                if ($scope.menuTwo[i][j].templateUrl == router ){
                    var urlInfo = $scope.menuTwo[i][j].urlInfo;
                    readJson(urlInfo); //调用二级菜单内容函数
                }
            }
        }
    }
    //请求二级菜单内容json地址
    function readJson(jsonUrl) {
        $.ajax({
            url: $rootScope.exUrl + jsonUrl,
            type:'GET',
            dataType:'json',
            success: function (res) {
                $scope.textInfo = $sce.trustAsHtml(res.textInfo);
                $scope.$apply();
            }
        });
    }
    //左侧导航根据窗口大小适应
    $scope.load = function () {
        //初始化高度
        var height = $(window).height() +'px';
        $("#sidebar").height(height);
        //当文档窗口发生改变时触发
        $(window).resize(function(){
            height = $(window).height() +'px';
            $("#sidebar").height(height);
        });
    }
}]);
//请求帮助首页数据
app.controller('help.ctrl',['$scope','$sce','$rootScope', function ($scope,$sce,$rootScope) {
    $.ajax({
        url: $rootScope.exUrl + 'index.json',
        method:'GET',
        dataType:'json',
        success: function (data) {
            //首页的内容$rootScope.homePage
            $rootScope.homePage = $sce.trustAsHtml(data.textInfo);
            $scope.$apply();
        }
    });
}]);
//处理点击二级菜单样式切换
app.filter('matchPath', function () {
    return function (data,path) {
        if(data != undefined && data != null && data.indexOf(path) != -1){
            return true;
        }else{
            return false;
        }
    }
});