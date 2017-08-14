$(function(){
    $(document).on('click','.panelHeading',function(){
        var heading = $(".panelHeading");
        var secondNav = $(".secondNav");
        /*切换折叠指示图标*/
        var panelSpan = $(this).find("span");
        panelSpan.toggleClass("glyphicon glyphicon-minus");
        panelSpan.toggleClass("glyphicon glyphicon-plus");
        $(this).toggleClass('titleActive'); //点击当前一级目录的背景色变化
        var index = this.getAttribute('index') - 1; //点击当前一级目录索引值
        secondNav.eq(index).slideDown(); //展开当前目录
        for (var k = 0; k < secondNav.length; k++) {
            if ( index != k) { //非点击状态的一级目录样式
                secondNav.eq(k).slideUp();
                heading.eq(k).removeClass('titleActive');
                if (heading.eq(k).find("span").hasClass('glyphicon-minus')) {
                    heading.eq(k).find("span").attr('class','glyphicon glyphicon-plus glyPlus');
                }
            }
        }
        //点击当前一级目录，二级目录的显隐
        if (panelSpan.hasClass('glyphicon-plus')) {
            secondNav.eq(index).slideUp();
        }
    });
    $(".listBtn").on('click', function () {
        var leftWidth = $(".sidebar").width();
        if (leftWidth != 0) {
            $(".sidebar").animate({width:'0'},200,'linear');
            $(".showList").animate({left:'0'},200,'linear');
            $("#homePage").animate({left:'26px'},200,'linear');
            $("#viewArea").animate({left:'26px'},200,'linear');
        } else {
            $(".sidebar").animate({width:'240'},200,'linear');
            $(".showList").animate({left:'240'},200,'linear');
            $("#homePage").animate({left:'260'},200,'linear');
            $("#viewArea").animate({left:'270'},200,'linear');
        }
    })

});
