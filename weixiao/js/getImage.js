// 封装一个获取图像资源对象的函数
(function (w) {

    // 封装获取图像的大概含义
    /*function getImg(path) {
         var img = new Image();
         img.src = path;
         return img;
     }*/

    // 封装获取图像的大概含义（增加load事件）
    /*function getImg(path) {
        var img = new Image();
        img.src = path;

         // 为了保证在img资源加载完毕后，在return给对象，采用了下面的方式，
         // 可惜下面的方式不可取，这里的return是事件回调函数的return，
         // 并不是getImg的return。
         img.addEventListener('load', function () {
            return img;
         });
     }*/

    /*
     * 获取图像资源的函数
     * param { path : string } 图像资源路径
     * param { cak : Function } 当图像资源加载完毕时，调用这个回调，
     *                               并且把图像对象传入这个回调以供其使用。
     * */
    function getImage(path, cak) {
        var img = new Image();
        img.src = path;

        // 为了保证在img资源加载完毕后，在return给对象，采用了下面的方式，
        // 可惜下面的方式不可取，这里的return是事件回调函数的return，
        // 并不是getImg的return。
        img.addEventListener('load', function () {
            cak(img);
        });
    }

    // 使用getImg范例，给对方传入的回调函数，
    // 在指定的路径加载完毕之后才会执行，
    // 也就是说这个回调里获取的img是已经加载完毕的img
    /*getImage('./img/sprite.png', function (img) {
        console.log(img);
    });*/

    // 把getImage暴漏到全局
    w.getImage = getImage;
}(window));