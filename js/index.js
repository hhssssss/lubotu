$(function () {
    function show(){
        $(".show_list li").each(function(index, element) {
        var bili= 1080/1920;
        var width = $(element).width();
        $(element).css("height",width*bili);
        });
    };
    function introduce(){
        $(".introduce_list li").each(function(index, element) {
            var bili= 1080/1920;
            var width = $(element).width();
            $(element).css("height",width*bili);
        });
    };
    show();
    introduce();
    window.onresize=function () {
        show();
        introduce();
    };
    var timeFlag=setInterval(function () {
        next()
    },5000);
    $(".next").click(function () {
        clearInterval(timeFlag);
        next();
        timeFlag=setInterval(function () {
            next()
        },5000);
    })
    $(".pre").click(function () {
        clearInterval(timeFlag);
        pre();
        timeFlag=setInterval(function () {
            next()
        },5000);
    })
    var xBefor;
    var xAfter;
    var change;
    $(".slide").off("click dblclick")
    $(".slide").mousedown(function(e){
        change=0;
        if(!$("div.show_list").is(":animated") ) {
            clearInterval(timeFlag);
            var $show = $(".show");
            var $showList = $show.find("div.show_list");
            var showWidth = $show.width();
            if (!$showList.is(":animated")) {
                $(".show_list ul li:last").prependTo($(".show_list ul"));
                $showList.css("left", "-=" + showWidth)
            }
            xBefor = e.pageX - parseInt($("div.show_list").css("left")) - showWidth;
            $(".slide").on("mousemove", function (e) {
                var $show = $(".show");
                var showWidth = $show.width();
                change = e.pageX - xBefor;
                $("div.show_list").css({left: (change - showWidth)});
            })
            $(".slide").on("mouseup mouseleave", function (e) {
                xAfter = e.pageX;
                $(".slide").off("mousemove");
                console.log(change)
                if (change<=0) {
                    var $show = $(".show");
                    var $showList = $show.find("div.show_list");
                    var showWidth = $show.width();
                    if (!$showList.is(":animated")) {
                        $showList.animate({"left": '-=' + (showWidth + change)}, function () {
                            $(".show_list ul li:first").appendTo($(".show_list ul"));
                            $(".show_list ul li:first").appendTo($(".show_list ul"));
                            $showList.css({"left": 0})
                            var page = $(".show_list ul li:first").attr("data-flag")
                            $show.find(".pointer span").eq(page - 1).addClass("blue").siblings().removeClass("blue");
                            var $introduce = $(".introduce");
                            var $introduceList = $(".introduce_list");
                            var introduceWidth = $introduce.find("li").width();
                            if (!$introduceList.is(":animated")) {
                                $introduceList.animate({"left": '-=' + introduceWidth}, function () {
                                    $(".introduce_list ul li:first").appendTo($(".introduce_list ul"))
                                    $introduceList.css({"left": 0})
                                })
                            }
                            $(".slide").off("mouseup mouseleave")
                            timeFlag=setInterval(function () {
                                next()
                            },5000);
                        })
                    }
                } else if (change>0) {
                    var $show = $(".show");
                    var $showList = $show.find("div.show_list");
                    var showWidth = $show.width();
                    if (!$showList.is(":animated")) {
                        $showList.css("left", '-=' - (change)).animate({"left": '+=' + (showWidth - change)}, function () {
                            var page = $(".show_list ul li:first").attr("data-flag")
                            $show.find(".pointer span").eq(page - 1).addClass("blue").siblings().removeClass("blue");
                            var $introduce = $(".introduce");
                            var $introduceList = $(".introduce_list");
                            var introduceWidth = $introduce.find("li").width();
                            if (!$introduceList.is(":animated")) {
                                $(".introduce_list ul li:last").prependTo($(".introduce_list ul"));
                                $introduceList.css("left", '-=' + introduceWidth).animate({"left": '+=' + introduceWidth})
                            }
                            $(".slide").off("mouseup mouseleave")
                            timeFlag=setInterval(function () {
                                next()
                            },5000);
                        })
                    }
                }
            })
        }
    });
    $(".pointer span").click(function () {
        clearInterval(timeFlag);
        var bspanId=$(".pointer span").index($("div.pointer .blue"))+1;
        var spanId=$(".pointer span").index(this)+1;
        if(bspanId==spanId){
            timeFlag=setInterval(function () {
                next()
            },5000);
            return
        }else if(bspanId<spanId){
            $(this).addClass("blue").siblings().removeClass("blue");
            var id=$("div.show_list li").index($("[data-flag="+spanId+"]"));
            var $show = $(".show");
            var $showList = $show.find("div.show_list");
            var showWidth = $show.width() ;
            if( !$showList.is(":animated") ) {
                $showList.animate({"left": '-=' + showWidth*id}, function () {
                    for(var i=0;i<id;i++){
                        $(".show_list ul li:first").appendTo($(".show_list ul"))
                        $showList.css({"left": 0})
                    }
                    var $introduce=$(".introduce");
                    var $introduceList=$(".introduce_list");
                    var introduceWidth=$introduce.find("li").width();
                    if(!$introduceList.is(":animated")){
                        $introduceList.animate({"left": '-=' + introduceWidth*id},200, function () {
                            for(var i=0;i<id;i++) {
                            $(".introduce_list ul li:first").appendTo($(".introduce_list ul"))
                            $introduceList.css({"left": 0})
                            }
                        })
                    }
                })
            }
        }
        else {
            $(this).addClass("blue").siblings().removeClass("blue");
            var id=10-$("div.show_list li").index($("[data-flag="+spanId+"]"));
            // console.log(id)
            var $show = $(".show");
            var $showList = $show.find("div.show_list");
            var showWidth = $show.width();
            if( !$showList.is(":animated") ) {
                for(var i=0;i<id;i++) {
                    $(".show_list ul li:last").prependTo($(".show_list ul"));
                }
                $showList.css("left",'-=' + showWidth*id).animate({"left": '+=' + showWidth*id}, function () {
                    var $introduce=$(".introduce");
                    var $introduceList=$(".introduce_list");
                    var introduceWidth=$introduce.find("li").width();
                    if(!$introduceList.is(":animated")){
                        for(var i=0;i<id;i++) {
                            $(".introduce_list ul li:last").prependTo($(".introduce_list ul"));
                        }
                        $introduceList.css("left","-="+introduceWidth*id).animate({"left": '+=' + introduceWidth*id},200)
                    }
                })
            }
        }
        timeFlag=setInterval(function () {
            next()
        },5000);
    })
    $("div.introduce_list li").click(function () {
        clearInterval(timeFlag);
        var id=$("div.introduce_list li").index(this)+1-3;
        var dataId=$(this).attr("data-flag-i");
        $("div.pointer span").eq(dataId-1).addClass("blue").siblings().removeClass("blue");
        if(id==0){
            timeFlag=setInterval(function () {
                next()
            },5000);
            return;
        }else if(id<0){
            var $introduce=$(".introduce");
            var $introduceList=$(".introduce_list");
            var introduceWidth=$introduce.find("li").width();
            if(!$introduceList.is(":animated")){
                $introduceList.css({"left":"-="+introduceWidth*Math.abs(id)})
                for(var i=0;i<Math.abs(id);i++) {
                    $(".introduce_list ul li:last").prependTo($(".introduce_list ul"));
                    $introduceList.animate({"left": '+=' + introduceWidth})
                }
                var $show = $(".show");
                var $showList = $show.find("div.show_list");
                var showWidth = $show.width();
                if( !$showList.is(":animated") ) {
                    for (var i = 0; i < Math.abs(id); i++) {
                        $(".show_list ul li:last").prependTo($(".show_list ul"));
                    }
                    $showList.css("left", '-=' + showWidth * Math.abs(id)).animate({"left": '+=' + showWidth * Math.abs(id)})
                }
            }
        }else {
            var $introduce=$(".introduce");
            var $introduceList=$(".introduce_list");
            var introduceWidth=$introduce.find("li").width();
            if(!$introduceList.is(":animated")){
                for(var i=0;i<Math.abs(id);i++) {
                    $introduceList.animate({"left": '-=' + introduceWidth},function () {
                        $(".introduce_list ul li:first").appendTo($(".introduce_list ul"));
                        $introduceList.css({"left":"+="+introduceWidth})
                    })
                }
                var $show = $(".show");
                var $showList = $show.find("div.show_list");
                var showWidth = $show.width() ;
                if( !$showList.is(":animated") ) {
                    $showList.animate({"left": '-=' + showWidth*Math.abs(id)}, function () {
                        for (var i = 0; i < Math.abs(id); i++) {
                            $(".show_list ul li:first").appendTo($(".show_list ul"))
                            $showList.css({"left": 0})
                        }
                    })
                }
            }
        }
        timeFlag=setInterval(function () {
            next()
        },5000);
    })
    function next() {
        var $show = $(".show");
        var $showList = $show.find("div.show_list");
        var showWidth = $show.width() ;
        if( !$showList.is(":animated") ) {
            $showList.animate({"left": '-=' + showWidth}, function () {
                $(".show_list ul li:first").appendTo($(".show_list ul"))
                $showList.css({"left": 0})
                var page=$(".show_list ul li:first").attr("data-flag")
                $show.find(".pointer span").eq(page-1).addClass("blue").siblings().removeClass("blue");
                var $introduce=$(".introduce");
                var $introduceList=$(".introduce_list");
                var introduceWidth=$introduce.find("li").width();
                if(!$introduceList.is(":animated")){
                    $introduceList.animate({"left": '-=' + introduceWidth}, function () {
                        $(".introduce_list ul li:first").appendTo($(".introduce_list ul"))
                        $introduceList.css({"left": 0})
                    })
                }
            })
        }

    }
    function pre() {
        var $show = $(".show");
        var $showList = $show.find("div.show_list");
        var showWidth = $show.width();
        if( !$showList.is(":animated") ) {
            $(".show_list ul li:last").prependTo($(".show_list ul"));
            $showList.css("left",'-=' + showWidth).animate({"left": '+=' + showWidth}, function () {
                var page=$(".show_list ul li:first").attr("data-flag")
                $show.find(".pointer span").eq(page-1).addClass("blue").siblings().removeClass("blue");
                var $introduce=$(".introduce");
                var $introduceList=$(".introduce_list");
                var introduceWidth=$introduce.find("li").width();
                if(!$introduceList.is(":animated")){
                    $(".introduce_list ul li:last").prependTo($(".introduce_list ul"));
                    $introduceList.css("left",'-=' + introduceWidth).animate({"left": '+=' + introduceWidth})
                }
            })
        }
    }
})
