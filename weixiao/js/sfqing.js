$(function() {
    // 手风琴
    // 动态绑定背景图
    var footer = document.getElementById("footer");
    var ul = footer.children[0];
    var lis = ul.children;
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.backgroundImage = "url(images/" + (i + 1) + ".jpg)";
        //鼠标经过当前li 当前的li变宽到800 所有li变窄100
        lis[i].onmouseover = function() {
            //干掉所有人 所有li 渐渐地 变窄100
            for (var j = 0; j < lis.length; j++) {
                //lis[j]
                animate(lis[j], {
                    "width": 100
                });
            }
            //留下我自己 当前的li 的宽度 渐渐地 变为800
            animate(this, {
                "width": 800
            });
        }
    }
    //鼠标离开盒子 所有li的宽度 渐渐地 还原为240
    footer.onmouseout = function() {
        for (var i = 0; i < lis.length; i++) {
            animate(lis[i], {
                "width": 240
            });
        }
    }

    function animate(obj, json) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            //如果本次执行完成后 所有的属性都达到了目标值 就可以清理了
            var flag = true; //假设所有的属性都达到了目标值
            for (var k in json) {
                var leader = parseInt(getStyle(obj, k)) || 0;
                var target = json[k];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader + "px";
                if (leader != target) {
                    flag = false; //告诉标记我还没达到
                }
            }
            //到了这里还是true就说明 没有任何人告诉falg自己是false
            //也就是说都达到了
            if (flag) {
                clearInterval(obj.timer);
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

})
