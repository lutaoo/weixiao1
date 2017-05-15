
/**
 * Created by Administrator on 2016-6-18.
 */
$(function () {
//            var $lis=$("#screen li").length;
//            for(var i=0;i<$lis;i++){
//                $("#screen ol").append("<li>");
//            }
//            var $fristImg=$("#screen li")[0];
//            console.log($fristImg);
//            $("#screen ul").append($fristImg);
//
//
//            var imgWhith=$("#screen li").width();
//            $("#screen>ol li").mouseenter(function () {
//                $(this).addClass("current").siblings().removeClass("current");
//                var index=$(this).index();
//                $("#screen>ul").animate({
//                    "left":-imgWhith*index
//                }, 600)
//                console.log(imgWhith);
//            });


// 轮播图
    var timer = null;
    var box = document.getElementById("box");
    var screen = box.children[0];
    var ul = screen.children[0];
    var ulLis = ul.children;
    var ol = screen.children[1];
    var arr = document.getElementById("arr");
    var arrLeft = document.getElementById("left");
    var arrRight = document.getElementById("right");
//            var imgWidth = screen.offsetWidth;
    for (var i = 0; i < ulLis.length; i++) {
        var li = document.createElement("li");
        ol.appendChild(li);
    }
    var olLis = ol.children;
    olLis[0].className = "current";
    var firstImg = ulLis[0].cloneNode(true);
    ul.appendChild(firstImg);
    for (var j = 0; j < olLis.length; j++) {
        olLis[j].index = j;
        olLis[j].onmouseover = function () {
            for (var k = 0; k < olLis.length; k++) {
                olLis[k].className = "";
            }
            this.className = "current";
            var target = -this.index * 1349;
            animate(ul, {"left": target});
            square = pic = this.index;
        }
    }
    box.onmouseover = function () {
        arr.style.display = "block";
        clearInterval(timer);
    }
    box.onmouseout = function () {
        arr.style.display = "none";
        timer = setInterval(playNext, 2000);
    }
    var pic = 0;
    arrRight.onclick = function () {
        playNext();
    };
    arrLeft.onclick = function () {
        if (pic === 0) {
            ul.style.left = -(ulLis.length - 1) * 1349 + "px";
            pic = ulLis.length - 1;
        }
        pic--;
        var target = -pic * 1349;
        animate(ul, {"left": target});
        if (square > 0) {
            square--;
        } else {
            square = olLis.length - 1;
        }
        for (var i = 0; i < olLis.length; i++) {
            olLis[i].className = "";
        }
        olLis[square].className = "current";
    };
    timer = setInterval(playNext, 2000);
    var square = 0;
    function playNext() {
        if (pic === ulLis.length - 1) {
            ul.style.left = 0 + "px";
            pic = 0;
        }
        pic++;
        var target = -pic * 1349;
        animate(ul, {"left": target});
        if (square < olLis.length - 1) {
            square++;
        } else {
            square = 0;
        }
        for (var i = 0; i < olLis.length; i++) {
            olLis[i].className = "";
        }
        olLis[square].className = "current";
    }
    function animate(obj, json, fn) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var flag = true;
            for (var k in json) {
                if (k === "opacity") {   //设置透明度的动画
                    var leader = getStyle(obj, k) * 100;
                    var target = json[k] * 100;
                    var step = (target - leader) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    leader = leader + step;
                    obj.style[k] = leader / 100;
                } else if (k === "zIndex") {           //注意z-index在JS中的写法
                    obj.style.zIndex = json[k];       //直接设置就可以了
                }
                var leader = parseInt(getStyle(obj, k)) || 0;
                var target = json[k];
                var step = (target - leader) / 5;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader + "px";
                if (leader != target) {
                    flag = false;
                }
            }
            if (flag) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
            }
        }, 15);
    }
    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return window.getComputedStyle(obj, null)[attr];
        }
    }
    $("#speak li").mouseenter(function () {
        $(this).children(".top").stop().animate({
            "top":"0px",
            "opacity":"0.5"
        }, 300);
        $(this).children(".btm").stop().animate({
            "bottom": "0px",
            "opacity":"0.5"
        }, 300);
    });
//            $("#speak li").each(function (index, element) {
//                $(element).mouseenter(function () {
//                    console.log(this);
//                    $(this).children(".top").stop().animate({
//                        "top": "0px"
//                    }, 200);
//                    $(this).children(".btm").stop().animate({
//                        "bottom": "0px"
//                    }, 200);
//                });
//            });
    $("#speak li").mouseleave(function () {
        $(this).children(".top").stop().animate({
            "top":"-150px",
            "opacity":"0"
        }, 400);
        $(this).children(".btm").stop().animate({
            "bottom": "-50px",
            "opacity":"0"
        }, 400);
    });


//放大镜
     //找人
    var box = document.getElementById("box1");
    var smallBox = document.getElementById("smallBox");
    var mask = document.getElementById("mask");
    var bigBox = document.getElementById("bigBox");
    var bigImg = bigBox.children[0];
    //鼠标经过小盒子smallBox 显示mask和bigBox
    smallBox.onmouseover = function () {
        mask.style.display = "block";
        bigBox.style.display = "block";

    }
    smallBox.onmouseout = function () {
        mask.style.display = "none";
        bigBox.style.display = "none";

    }
    //鼠标在小盒子中移动 获取鼠标在盒子中的座标 设置mask的位置

    smallBox.onmousemove = function (event) {
        var event = event || window.event;
        var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
        var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
        //计算在盒子中的位置
        //水平方向 鼠标在页面中的水平位置  - 盒子的offsetLeft
        var boxX = pageX - box.offsetLeft;
        var boxY = pageY - box.offsetTop;
        //根据鼠标在盒子中的位置设置遮罩的位置
        var maskX = boxX - mask.offsetWidth / 2;//为了让中心跟着鼠标 还要减去自身宽度的一半
        var maskY = boxY - mask.offsetWidth / 2;
        //计算出来后 设置之前 我们要判断一下
        if (maskX < 0) {
            maskX = 0;
        }
        if (maskX > smallBox.offsetWidth - mask.offsetWidth) {
            maskX = smallBox.offsetWidth - mask.offsetWidth;
        }
        if (maskY < 0) {
            maskY = 0;
        }
        if (maskY > smallBox.offsetHeight - mask.offsetHeight) {
            maskY = smallBox.offsetHeight - mask.offsetHeight;
        }

        mask.style.left = maskX + "px";
        mask.style.top = maskY + "px";

        //比例 bigImg能够移动的总距离/mask能够移动的总距离
        //bigImg能够移动的总距离 = bigImg的宽度 - bigBox的宽
        var bigImgToMove = bigImg.offsetWidth - bigBox.offsetWidth;
        //mask能够移动的总距离 = smallBox的宽度 - mask的宽度
        var maskToMove = smallBox.offsetWidth - mask.offsetWidth;
        //比例 bigImg能够移动的总距离/mask能够移动的总距离
        var rate = bigImgToMove / maskToMove;
        //根据 比例 和 mask当前的水平位置 计算 bigImg当前应该在的水平位置
        bigImg.style.left = -rate * maskX + "px";
        bigImg.style.top = -rate * maskY + "px";

    }

    //列表
     //给每一个.groupTitle注册点击事件 当前下一个兄弟元素 让他显示
            $(".groupTitle").click(function () {
                //找到下一个兄弟元素 判断他当前的显示状态
                // 如果显示让她隐藏 如果隐藏让她显示              
                var dis = $(this).next().css("display");
                console.log(dis);
                if (dis === "none") {
                    //当前状态是关闭的 我就要把他打开
                    $(this).next().show();
                } else {
                    //当前状态是打开的 我就要把他关闭
                    $(this).next().hide();
                }
                //找到当前元素的父元素的所有的兄弟元素的子元素(ul) 然后隐藏
                $(this).parent().siblings().children("ul").hide();
            });


// 添加数据

         //点击按钮 让遮罩和弹框 显示
        $("#j_btnAddData").click(function () {
            $("#j_mask").show();
            $("#j_formAdd").show();
        });
        //点击关闭按钮 隐藏遮罩和弹框
        $("#j_hideFormAdd").click(function () {
            hideForm();
        });
        function hideForm() {
            $("#j_mask").hide();
            $("#j_formAdd").hide();
        }

        //点击添加 从文本框中获取数据 并追加到页面
        $("#j_btnAdd").click(function () {
            var txtLesson = $("#j_txtLesson").val();
            if (txtLesson === "") {
                alert("请输入手机品牌");
                return;
            }
            var txtBelSch = $("#j_txtBelSch").val();
            if (txtBelSch === "") {
                alert("请输入手机颜色");
                return;
            }
            //追加到页面上数据
            //拼接一个符合html标签规则的字符串
            var str = '<tr>'
                    + '<td>' + txtLesson + '</td>'
                    + '<td>' + txtBelSch + '</td>'
                    + '<td><a href="javascrip:;" class="get">GET</a></td>'
                    + '</tr>';
            $("#j_tb").append(str);
            //添加完成数据后 对话框就应该消失
            hideForm();
        });


        //点击get 干掉当前get所属的tr
        /*$(".get").click(function () {
         //找到当前get的父级的父级 然后让ta自杀
         $(this).parent().parent().remove();
         });*/

        $("#j_tb").on("click", ".get", function () {
            //console.log(this);
            $(this).parent().parent().remove();
        })
     


});