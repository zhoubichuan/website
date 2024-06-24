const render = ($) => {
    $('#purehtml-container').html('Hello, render with js');
    return Promise.resolve();
  };
  
  ((global) => {
    global['purehtml'] = {
      bootstrap: () => {
        console.log('purehtml bootstrap');
        return Promise.resolve();
      },
      mount: () => {
        console.log('purehtml mount');
        return render($);
      },
      unmount: () => {
        console.log('purehtml unmount');
        return Promise.resolve();
      },
    };
  })(window);
  //console.log( window.innerWidth );    1366
  //console.log( window.innerHeight );   654  /  643
  
  //container : 1100 * 600   ( 如果想适应更多的分辨率，让效果展示的更好，利用css3 media query 来做响应式布局 , bootStrap )
  
  window.onload = function(){
      
      var oHeader = $('header');
      var oNav = $('nav');
      var oArrow = $('arrow');
      var oList = $('list');
      var oContent = $('content');
      var aLiNav = oNav.getElementsByTagName('li');
      var aLiList = getByClass( oList , 'liList' );
      var aDivList = getByClass( oList , 'divList' );
      var oWorksContent = $('worksContent');
      var oWorksContent2 = getByClass(oWorksContent , 'worksContent2')[0];
      var oHomeContent = $('homeContent');
      var oHomeContent1 = getByClass(oHomeContent , 'homeContent1')[0];
      var oHomeContent2 = getByClass(oHomeContent , 'homeContent2')[0];
      var oCourseContent = $('courseContent');
      var oCourseContent3 = getByClass(oCourseContent , 'courseContent3')[0];
      var oAboutContent = $('aboutContent');
      var oAboutContent3 = getByClass(oAboutContent , 'aboutContent3')[0];
      var oTeamContent = $('teamContent');
      var oTeamContent3 = getByClass(oTeamContent , 'teamContent3')[0];
      
      var oMenu = $('menu');
      var aLiMenu = oMenu.getElementsByTagName('li');
      var oMusic = $('music');
      var oAudio = $('audio1');
      var oLoading = $('loading');
      
      var iNow = 0;
      var prevIndex = 0;
      var iContentHeight = 0;
      
      showLoading();
      contentAuto();
      listContentAuto();
      bindNav();
      mouseWheel();
      
      homeContent();
      
      aboutContent();
      teamContent();
      showMusic();
      window.onresize = fnResize;
      
      //toMove(4);
      
      function showLoading(){
          var oSpan = oLoading.getElementsByTagName('span')[0];
          var aDiv = oLoading.getElementsByTagName('div');
          var arr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];
          var iNow = 0;
          
          for(var i=0;i<arr.length;i++){
              
              var objImg = new Image();
              objImg.src = 'img/'+arr[i];
              objImg.onload = function(){
                  iNow++;
                  oSpan.style.width = iNow/arr.length*100 + '%';
                  /*if(iNow == arr.length){
                      alert(123);
                  }*/
              };
              
          }
          oSpan.addEventListener('webkitTransitionend',spanChange,false);
          oSpan.addEventListener('transitionend',spanChange,false);
          
          function spanChange(){
              if(oSpan.style.width == '100%'){
                  oSpan.style.display = 'none';
                  aDiv[0].style.height = 0;
                  aDiv[1].style.height = 0;
              }
          }
          
          aDiv[0].addEventListener('webkitTransitionend',divChange,false);
          aDiv[0].addEventListener('transitionend',divChange,false);
          
          
          function divChange(){
              oLoading.parentNode.removeChild(oLoading);
              oMusic.onclick();
              cjAnimate[0].inAn();
          }
          
          //预加载 js css
          /*var bj = document.createElement('object');
          bj.data = 'base.js';
          document.body.appendChild(bj);
          bj.width = 0;
          bj.height = 0;
          bj.onload = function(){
          };*/
          
      }
      
      function bindNav(){
          
          var oDiv = aLiNav[0].getElementsByTagName('div')[0];
          oDiv.style.width = '100%';
          oArrow.style.left = aLiNav[0].offsetLeft + aLiNav[0].offsetWidth/2 - oArrow.offsetWidth/2 + 'px';
          
          for(var i=0;i<aLiNav.length;i++){
              aLiNav[i].index = i;
              aLiNav[i].onmousedown = function(){
                  prevIndex = iNow;
                  iNow = this.index;
                  toMove( this.index );
              };
          }
          for(var i=0;i<aLiMenu.length;i++){
              aLiMenu[i].index = i;
              aLiMenu[i].onclick = function(){
                  prevIndex = iNow;
                  iNow = this.index;
                  toMove( this.index );
              };
          }
      }
      
      function toMove(index){
          
          for(var i=0;i<aLiNav.length;i++){
              var oDiv = aLiNav[i].getElementsByTagName('div')[0];
              oDiv.style.width = '';
          }
          var oDiv = aLiNav[index].getElementsByTagName('div')[0];
          oDiv.style.width = '100%';
          
          oArrow.style.left = aLiNav[index].offsetLeft + aLiNav[index].offsetWidth/2 - oArrow.offsetWidth/2 + 'px';
          
          oList.style.top = - index * iContentHeight + 'px';
          for(var i=0;i<aLiMenu.length;i++){
              aLiMenu[i].className = '';
          }
          aLiMenu[index].className = 'active';
          
          if( cjAnimate[index].inAn ){
              cjAnimate[index].inAn();
          }
          if( cjAnimate[prevIndex].outAn ){
              cjAnimate[prevIndex].outAn();
          }
          
      }
      
      function contentAuto(){
          iContentHeight = viewHeight() - oHeader.offsetHeight;
          oContent.style.height = iContentHeight + 'px';
          for(var i=0;i<aLiList.length;i++){
              aLiList[i].style.height = iContentHeight + 'px';
          }
          oList.style.top = - iNow * iContentHeight + 'px';
      }
      
      function listContentAuto(){
          var mt = (iContentHeight - 520)/2;
          for(var i=0;i<aDivList.length;i++){
              aDivList[i].style.marginTop = mt + 'px';
          }
      }
      
      function fnResize(){
          contentAuto();
          listContentAuto();
      }
      
      function mouseWheel(){
          //火狐 : DOMMouseScroll( DOM事件必须用绑定事件的方式去写 addEventListener )
          //IE ,  谷歌 : mousewheel
          var bBtn = true;
          var timer = null;
          if(oContent.addEventListener){
              oContent.addEventListener('DOMMouseScroll',function(ev){
                  var ev = ev || window.event;
                  clearTimeout(timer);
                  timer = setTimeout(function(){
                      toChange(ev);
                  },200);
              },false);
          }
          oContent.onmousewheel = function(ev){
              var ev = ev || window.event;
              clearTimeout(timer);
              timer = setTimeout(function(){
                  toChange(ev);
              },200);
          };
          
          function toChange(ev){
              //alert(ev.detail);  //↓ 3  ↑ -3
              //alert(ev.wheelDelta); //↓ -120  ↑ 120
              
              if(ev.detail){
                  bBtn = ev.detail > 0 ? true : false;
              }
              else{
                  bBtn = ev.wheelDelta < 0 ? true : false;
              }
              
              if( (iNow == 0 && !bBtn) || (iNow == aLiList.length-1 && bBtn) ){return;}
              
              prevIndex = iNow;
              if(bBtn){   //↓
                  if(iNow != aLiList.length-1){
                      iNow++;
                  }
                  toMove(iNow);
              }
              else{   //↑
                  if(iNow != 0){
                      iNow--;
                  }
                  toMove(iNow);
              }
              
              if(ev.preventDefault){
                  ev.preventDefault();
              }
              else{
                  return false;
              }
          }
          
      }
      
      
      
      function homeContent(){
          //oHomeContent1
          //oHomeContent2
          var aLi1 = oHomeContent1.getElementsByTagName('li');
          var aLi2 = oHomeContent2.getElementsByTagName('li');
          var oldIndex = 0;
          var iNowHome = 0;
          
          for(var i=0;i<aLi2.length;i++){
              aLi2[i].index = i;
              aLi2[i].onclick = function(){
                  for(var i=0;i<aLi2.length;i++){
                      aLi2[i].className = '';
                  }
                  this.className = 'active';
                  
                  if( oldIndex < this.index ){   //从左向右
                      aLi1[oldIndex].className = 'leftHide';
                      aLi1[this.index].className = 'rightShow';				
                  }
                  else if( oldIndex > this.index ){  //从右向走
                      aLi1[oldIndex].className = 'rightHide';
                      aLi1[this.index].className = 'leftShow';				
                  }
                  oldIndex = this.index;
                  iNowHome = this.index;
              };
          }
          
          var timer = setInterval(change,3000);
          
          oHomeContent.onmouseover = function(){
              clearInterval(timer);
          };
          
          function change(){
              iNowHome++;
              
              if(iNowHome == aLi2.length){
                  iNowHome = 0;
              }
              
              for(var i=0;i<aLi2.length;i++){
                  aLi2[i].className = '';
              }
              aLi2[iNowHome].className = 'active';
              aLi1[oldIndex].className = 'leftHide';
              aLi1[iNowHome].className = 'rightShow';
              
              oldIndex = iNowHome;
              
          }
      }
      
  
      
      function aboutContent(){
          //oAboutContent3
          var aUl = oAboutContent3.getElementsByTagName('ul');
          var aSpan = oAboutContent3.getElementsByTagName('span');
          
          for(var i=0;i<aUl.length;i++){
              change( aUl[i] , aSpan[i] );
          }
          
          function change(ul,span){
              
              var w = ul.offsetWidth/2;
              var h = ul.offsetHeight/2;
              var src = ul.dataset.src;
              
              for(var i=0;i<4;i++){
                  var oLi = document.createElement('li');
                  oLi.style.width = w + 'px';
                  oLi.style.height = h + 'px';
                  var oImg = document.createElement('img');
                  oImg.src = src;
                  oImg.style.left = - i%2 * w + 'px';
                  oImg.oldleft = - i%2 * w;
                  oImg.style.top =  - Math.floor(i/2) * h + 'px';
                  oImg.oldtop = - Math.floor(i/2) * h;
                  oLi.appendChild(oImg);
                  ul.appendChild(oLi);
              }
              
              var data = [
                  { name : 'top' , value : h },
                  { name : 'left' , value : - w*2 },
                  { name : 'left' , value : w },
                  { name : 'top' , value : - h*2 },
              ];
              var aImg = ul.getElementsByTagName('img');
              
              ul.onmouseover = function(){
                  
                  for(var i=0;i<aImg.length;i++){
                      aImg[i].style[ data[i].name ] = data[i].value + 'px';
                  }
                  //span.style.transform = 'scale(1)';
                  //span.style.webkitTransform = 'scale(1)';
                  setStyle(span,'transform','scale(1)');
              };
              ul.onmouseout = function(){
                  for(var i=0;i<aImg.length;i++){
                      aImg[i].style[ data[i].name ] = aImg[i]['old'+data[i].name] + 'px';
                  }
                  //span.style.transform = 'scale(1.5)';
                  setStyle(span,'transform','scale(1.5)');
              };	
          }
      }
      
      function teamContent(){
          //oTeamContent3
          var aLi = oTeamContent3.getElementsByTagName('li');
          var oC = null;
          var w = 118;
          var h = 300;
          var timer1 = null;
          var timer2 = null;
          create();
          bindList();
          function create(){
              var oUl = document.createElement('ul');
              for(var i=0;i<8;i++){
                  var oLi = document.createElement('li');
                  oLi.style.backgroundPosition =  -(i*w) +'px 0';
                  oUl.appendChild(oLi);
              }
              oTeamContent3.appendChild(oUl);
          }
          function bindList(){
              
              oTeamContent3.onmouseleave = function(){
                  removeCanvas();
                  for(var i=0;i<aLi.length;i++){
                      aLi[i].style.opacity = 1;
                  }
              };
              
              for(var i=0;i<aLi.length;i++){
                  aLi[i].index = i;
                  aLi[i].onmouseover = function(){
                      addCanvas();
                      oC.style.left = this.index * w + 'px';
                      for(var i=0;i<aLi.length;i++){
                          aLi[i].style.opacity = 0.5;
                      }
                      this.style.opacity = 1;
                  };
              }
          }
          function addCanvas(){
              if(!oC){
                  oC = document.createElement('canvas');
                  oC.id = 'canvasBubble';
                  oC.width = w;
                  oC.height = h;
                  oTeamContent3.appendChild(oC);
                  bindCanvas();
              }
          }
          function removeCanvas(){
              clearInterval(timer1);
              clearInterval(timer2);
              oTeamContent3.removeChild(oC);
              oC = null;
          }
          function bindCanvas(){
              var oGC = oC.getContext('2d');
      
              var setArr = [];   //存储要绘制的所有图形的数据
              
              timer1 = setInterval(function(){
                  
                  oGC.clearRect(0,0,oC.width,oC.height);
                  
                  for(var i=0;i<setArr.length;i++){
                      
                      setArr[i].num += 5;
                      
                      setArr[i].x = setArr[i].startX - Math.sin(setArr[i].num*Math.PI/180)*setArr[i].step;
                      setArr[i].y = setArr[i].startY - (setArr[i].num*Math.PI/180)*setArr[i].step;
                      
                      if( setArr[i].y < 50 ){
                          setArr.splice(i,1);
                      }
                      
                  }
                  
                  for(var i=0;i<setArr.length;i++){
                      oGC.fillStyle = 'rgba('+setArr[i].c1+','+setArr[i].c2+','+setArr[i].c3+','+setArr[i].c4+')';
                      oGC.beginPath();
                          oGC.moveTo(setArr[i].x,setArr[i].y);
                          oGC.arc(setArr[i].x,setArr[i].y,setArr[i].r,0,360*Math.PI/180);
                      oGC.closePath();
                      oGC.fill();
                  }
                  
              },1000/60);
              
              timer2 = setInterval(function(){
                  
                  var x = Math.random()*oC.width;
                  var y = oC.height - 10;
                  var r = Math.random()*6 + 2;
                  var c1 = Math.round(Math.random()*255);
                  var c2 = Math.round(Math.random()*255);
                  var c3 = Math.round(Math.random()*255);
                  var c4 = 1;
                  var num = 0;
                  var step = Math.random()*20 + 10;
                  var startX = x;
                  var startY = y;
                  
                  setArr.push({
                      x : x,
                      y : y,
                      r : r,
                      c1 : c1,
                      c2 : c2,
                      c3 : c3,
                      c4 : c4,
                      num : num,
                      step : step,
                      startX : x,
                      startY : y
                  });
                  
              },100);
          }
      }
      
      var cjAnimate = [
          {
              inAn : function(){
                  oHomeContent1.style.opacity = 1;
                  oHomeContent2.style.opacity = 1;
                  setStyle(oHomeContent1,'transform','translate(0,0)');
                  setStyle(oHomeContent2,'transform','translate(0,0)');
              },
              outAn : function(){
                  oHomeContent1.style.opacity = 0;
                  oHomeContent2.style.opacity = 0;
                  setStyle(oHomeContent1,'transform','translate(0,-150px)');
                  setStyle(oHomeContent2,'transform','translate(0,100px)');
              }
          },
          {
              inAn : function(){
                  var oPlane1 = getByClass(oCourseContent,'plane1')[0];
                  var oPlane2 = getByClass(oCourseContent,'plane2')[0];
                  var oPlane3 = getByClass(oCourseContent,'plane3')[0];
                  setStyle(oPlane1 , 'transform','translate(0,0)');
                  setStyle(oPlane2 , 'transform','translate(0,0)');
                  setStyle(oPlane3 , 'transform','translate(0,0)');
              },
              outAn : function(){
                  var oPlane1 = getByClass(oCourseContent,'plane1')[0];
                  var oPlane2 = getByClass(oCourseContent,'plane2')[0];
                  var oPlane3 = getByClass(oCourseContent,'plane3')[0];
                  setStyle(oPlane1 , 'transform','translate(-200px,-200px)');
                  setStyle(oPlane2 , 'transform','translate(-200px,200px)');
                  setStyle(oPlane3 , 'transform','translate(200px,-200px)');
              }
          },
          {
              inAn : function(){
                  var oPencel1 = getByClass(oWorksContent,'pencel1')[0];
                  var oPencel2 = getByClass(oWorksContent,'pencel2')[0];
                  var oPencel3 = getByClass(oWorksContent,'pencel3')[0];
                  setStyle(oPencel1 , 'transform','translate(0,0)');
                  setStyle(oPencel2 , 'transform','translate(0,0)');
                  setStyle(oPencel3 , 'transform','translate(0,0)');
              },
              outAn : function(){
                  //oWorksContent
                  var oPencel1 = getByClass(oWorksContent,'pencel1')[0];
                  var oPencel2 = getByClass(oWorksContent,'pencel2')[0];
                  var oPencel3 = getByClass(oWorksContent,'pencel3')[0];
                  setStyle(oPencel1 , 'transform','translate(0,-200px)');
                  setStyle(oPencel2 , 'transform','translate(0,200px)');
                  setStyle(oPencel3 , 'transform','translate(0,200px)');
              }
          },
          {
              inAn : function(){
                  var aAboutImg = getByClass( oAboutContent , 'aboutImg' );
                  setStyle(aAboutImg[0],'transform','rotate(0)');
                  setStyle(aAboutImg[1],'transform','rotate(0)');
              },
              outAn : function(){
                  //oAboutContent
                  var aAboutImg = getByClass( oAboutContent , 'aboutImg' );
                  setStyle(aAboutImg[0],'transform','rotate(45deg)');
                  setStyle(aAboutImg[1],'transform','rotate(-45deg)');
              }
          },
          {
              inAn : function(){
                  var oTeamContent1 = getByClass(oTeamContent , 'teamContent1')[0];
                  var oTeamContent2 = getByClass(oTeamContent , 'teamContent2')[0];
                  oTeamContent1.style.opacity = 1;
                  oTeamContent2.style.opacity = 1;
                  setStyle(oTeamContent1,'transform','translate(0,0)');
                  setStyle(oTeamContent2,'transform','translate(0,0)');
              },
              outAn : function(){
                  var oTeamContent1 = getByClass(oTeamContent , 'teamContent1')[0];
                  var oTeamContent2 = getByClass(oTeamContent , 'teamContent2')[0];
                  oTeamContent1.style.opacity = 0;
                  oTeamContent2.style.opacity = 0;
                  setStyle(oTeamContent1,'transform','translate(-200px,0)');
                  setStyle(oTeamContent2,'transform','translate(200px,0)');
              }
          }
      ];
      
      /*cjAnimate[4].outAn();
      setTimeout(function(){
          cjAnimate[4].inAn();
      },2000);*/
      for(var i=0;i<cjAnimate.length;i++){
          cjAnimate[i].outAn();
      }
      
      function showMusic(){
          var onoff = true;
          oMusic.onclick = function(){
              if(onoff){
                  this.style.background = 'url(img/musicon.gif)';
                  oAudio.play();
              }
              else{
                  this.style.background = 'url(img/musicoff.gif)';
                  oAudio.pause();
              }
              onoff = !onoff;
          };
      }
      
      function $(id){
          return document.getElementById(id);
      }
      
      function viewWidth(){
          return window.innerWidth || document.documentElement.clientWidth;
      }
      
      function viewHeight(){
          return window.innerHeight || document.documentElement.clientHeight;
      }
      
      function getByClass(oParent,sClass){
          var aElem = oParent.getElementsByTagName('*');
          var arr = [];
          for(var i=0;i<aElem.length;i++){
              if( aElem[i].className == sClass ){
                  arr.push( aElem[i] );
              }
          }
          return arr;
      }
      
      function setStyle(obj,attr,value){
          obj.style[attr] = value;
          obj.style['webkit'+attr.substring(0,1).toUpperCase() + attr.substring(1)] = value;
      }
      
  };