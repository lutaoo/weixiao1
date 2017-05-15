
	// 功能1 用js控制视频的播放与暂停 
	// 当视频播放的时候，按钮显示暂停样式，当视频暂停的时候，按钮显示播放的样式
           // 分析: 按钮控制video播放与暂停
                        // 方法:play() pause()
                        // 1.获取按钮对象，视频对象
                        var playBtn=document.querySelector(".play-button"),
                              video=document.querySelector("video"),
                              totalTime=document.querySelector(".total-time"),
                                   currenttime=document.querySelector(".current-time"),
                                   progressBar=document.querySelector(".progress-bar"),
                                   progress=document.querySelector(".progress"),
                                   expand=document.querySelector(".expand"),

                              // 定义一个用于判断播放状态的一个值
                              flag=true;

                        // 2.给按钮注册事件
                        playBtn.onclick=function () {
         
                        	     // 3.判断视频在播放还是暂停状态
                        	     // 当flag等于true的时候，设定视频在播放状态
                        	     if(flag==true){
                                 video.play();
                                 playBtn.classList.toggle("fa-pause");
                                 flag=false
                        	     }else{
                        	     	    // 4.调用play()控制视频播放  调用pause()控制视频暂停
                        	     	   video.pause();
                        	     	   flag=true
                        	     	    playBtn.classList.toggle("fa-pause");
                        	     }
                        }
                          
                          // 功能2 在控制台中显示当前时间和总时间
                          // 显示总时间
                          // 在视频可以播放的时候，拿总时间oncanplay
                          video.oncanplay=function () {
                          	     // 1.要拿到总时间duration 6970.964
                          	         // 2. 把拿到的总时间做个处理 把拿到的秒数转换成小时 分钟 秒
                            var h=Math.floor(video.duration/3600);
                            var min=Math.floor((video.duration/60)-(60*h));
                            var s=Math.floor(video.duration%60);
                            // 3把处理好的小时分钟秒拼接成两位数
                            h=h>9?h:"0"+h;
                            min=min>9?min:"0"+min;
                            s=s>9?s:"0"+s;
                            totalTime.innerHTML=h+":"+min+":"+s;
                          }
// 在控制台中显示当前时间currentTime
// 当前时间需要不断更新ontimeupdate
// 把拿到的当前时间不断地更新到页面上就好了
video.ontimeupdate=function(){
	 	var ch=Math.floor(video.currentTime/3600);
                            var cmin=Math.floor((video.currentTime/60)-(60*ch));
                            var cs=Math.floor(video.currentTime%60);

                              ch=ch>9?ch:"0"+ch;
                            cmin=cmin>9?cmin:"0"+cmin;
                            cs=cs>9?cs:"0"+cs;
                            currenttime.innerHTML=ch+":"+cmin+":"+cs;

// 3.进度条的显示 进度条的宽度=当前时间/总时间
var progressWidth=video.currentTime/video.duration*100+"%";
      progressBar.style.width=progressWidth;
}
expand.onclick=function(){
 video.webkitRequestFullScreen();
}