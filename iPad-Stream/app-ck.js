// Config
function addResultBG(e,t,n){var r=new View({width:resultDotSize,height:resultDotSize,x:0,y:0,style:{opacity:returnOpacity(n)}});r.sendToBack();r.addClass("colorLayer");e.addSubView(r);var i=new View({width:resultDotSize,height:resultDotSize,x:0,y:30,html:t});i.sendToBack();i.addClass("resultlabel");e.addSubView(i)}function addGenom(e,t,n){var r=new View({width:348,height:30,x:0,y:30*n+30}),i=new View({width:140,height:30,x:0,y:0,html:db.questions[t].pairs[n][0]});i.addClass("pair left");r.addSubView(i);var s=returnPercent(db.objects[e].dna[t].pairs[n]);for(var o=0;o<s.length;o++){var u=new View({width:15,height:15,x:o*19+148,y:7,opacity:returnOpacity(s[o])});u.addClass("miniResult");r.addSubView(u)}var a=new View({width:140,height:30,x:208,y:0,html:db.questions[t].pairs[n][1]});a.addClass("pair right");r.addSubView(a);return r}function addKeyValueView(e,t,n,r){var i=new View({width:384,height:30,x:0,y:r*30+5}),s=new View({width:128,height:30,x:0,y:0,html:n});s.addClass("keyView");i.addSubView(s);var o=new View({width:200,height:30,x:140,y:0,html:db.objects[e][t]});o.addClass("valueView");i.addSubView(o);return i}function addInfoHeadline(e){var t=new View({width:348,height:30,x:0,y:0,html:e});t.addClass("infoHeadline");return t}function addToCluster(){clusterLoop(0,-1,objIndex)}function clusterLoop(e,t,n){clearScene();utils.delay(150,function(){if(e<db.questions.length-1)if(t<db.questions[e].pairs.length-1){t++;makeClusterObj(e,t,n)}else{t=0;e++;makeClusterObj(e,t,n)}else makeClusterIcons()})}function makeClusterIcons(){var e=new View({x:0,y:181,width:384,height:512});e.addSubView(makeClusterQuestion());var t=new View({x:0,y:41,width:e.width,height:e.height});for(var n=0;n<db.SmallClusterIcons.length;n++){console.log(db.SmallClusterIcons[n].name);var r=new ImageView({opacity:0,image:"../assets/ClusterImages/"+db.SmallClusterIcons[n].image,width:81,height:81,x:db.SmallClusterIcons[n].x,y:db.SmallClusterIcons[n].y+41});r.addClass("smallClusterIcon btn");t.addSubView(r)}e.addSubView(t);Scene.addSubView(e);utils.delay(20,function(){e._subViews[0].scale=1.5;e._subViews[0].animate({properties:{opacity:1,scale:1},curve:startSpring})});utils.delay(40,function(){t._subViews.forEach(makeIconsVisible)});t._subViews[5].on("click",function(){t._subViews[5].scale=.7;t._subViews[5].animate({properties:{scale:1},curve:startSpring});utils.delay(200,function(){t._subViews.reverse().forEach(makeIconsInvisible)});utils.delay(1e3,function(){e._subViews[0].animate({properties:{opacity:0,scale:1.5},time:200,curve:"ease-in-out"})});utils.delay(2e3,function(){makeObj()})})}function makeClusterQuestion(){var e=new View({opacity:0,width:384,height:60,x:0,y:20,html:"Welcher Cluster?"});e.addClass("mainQuestion");return e}function animateObject(e){utils.delay(125,function(){e._subViews[0].animate({properties:{y:20},curve:startCurve,time:startTime});utils.delay(100,function(){e._subViews[1]._subViews[1].animate({properties:{opacity:.5,scale:1},curve:startCurve,time:startTime});utils.delay(75,function(){e._subViews[1]._subViews[0].animate({properties:{x:0},curve:startCurve,time:startTime});utils.delay(75,function(){e._subViews[1]._subViews[2].animate({properties:{x:222},curve:startCurve,time:startTime});utils.delay(100,function(){e._subViews[4].animate({properties:{y:e._subViews[4].originalFrame.y},curve:startSpring})})})})})})}function animateClusterObject(e){utils.delay(125,function(){e._subViews[0].animate({properties:{y:20},curve:startCurve,time:startTime});utils.delay(100,function(){e._subViews[1]._subViews[1].animate({properties:{opacity:.5,scale:1},curve:startCurve,time:startTime});utils.delay(75,function(){e._subViews[1]._subViews[0].animate({properties:{x:0},curve:startCurve,time:startTime});utils.delay(75,function(){e._subViews[1]._subViews[2].animate({properties:{x:222},curve:startCurve,time:startTime});utils.delay(100,function(){e._subViews[2].animate({properties:{y:e._subViews[2].originalFrame.y},curve:startSpring})})})})})})}function animateWords(e,t){var n=t,r;if(n[0]==="x"){e.y=e.originalFrame.y;r=getXDistance(e);r>=maxDistance-triggerOffset?e._subViews[1].opacity=.5:e._subViews[1].opacity=0;if(n[1]==="left"){e.superView._subViews[1]._subViews[0].style.fontSize=getFontSize(r,0,155,minAttrSize,maxAttrSize);r>=maxDistance&&(e.x=e.originalFrame.x-maxDistance)}else if(n[1]==="right"){e.superView._subViews[1]._subViews[2].style.fontSize=getFontSize(r,0,155,minAttrSize,maxAttrSize);r>=maxDistance&&(e.x=e.originalFrame.x+maxDistance)}}else{e.x=e.originalFrame.x;r=getYDistance(e);if(n[1]==="up"){r>=70&&r<=110||r>=maxDistance-triggerOffset?e._subViews[1].opacity=.5:e._subViews[1].opacity=0;if(r<70)e.superView._subViews[2]._subViews[1].style.fontSize=getFontSize(r,0,70,minActionSize,maxActionSize);else if(r>=110){e.superView._subViews[2]._subViews[1].style.fontSize=getFontSize(r,110,155,maxActionSize,minActionSize);e.superView._subViews[2]._subViews[2].style.fontSize=getFontSize(r,110,155,minActionSize,maxActionSize)}r>=maxDistance&&(e.y=e.originalFrame.y-maxDistance)}else if(n[1]==="down"){r>=maxDistance-triggerOffset?e._subViews[1].opacity=.5:e._subViews[1].opacity=0;e.superView._subViews[2]._subViews[0].style.fontSize=getFontSize(r,0,155,minActionSize,maxActionSize);r>=maxDistance&&(e.y=e.originalFrame.y+maxDistance)}}globalDistance=r}function animateToSmallType(e,t){$(e._element).animate({fontSize:t},1200,"easeOutElastic")}function animateResult(e){switch(globalDirection[1]){case"left":e._subViews.forEach(makeResultVisible);break;case"right":e._subViews.reverse().forEach(makeResultVisible)}utils.delay(3e3,function(){e._subViews.reverse().forEach(makeResultInVisible);utils.delay(400,function(){nextObj()})})}function bigAnswer(e){e.animate({properties:{opacity:0,scale:1.5},time:200,curve:"ease-in-out"});utils.delay(200,function(){switch(globalDirection[1]){case"left":e.html=e._subViews[0].html;break;case"right":e.html=e._subViews[2].html}e._subViews.forEach(makeItInvisible);utils.delay(20,function(){e.animate({properties:{opacity:1,scale:1},curve:startSpring})})})}function changeHeadline(){console.log("change H2");TopBar._subViews[0]._subViews[1].animate({properties:{y:0},curve:startCurve,time:startTime});utils.delay(100,function(){TopBar._subViews[0]._subViews[2].animate({properties:{y:50},curve:startCurve,time:startTime})})}function changeHeadlineBack(){TopBar._subViews[0]._subViews[2].animate({properties:{y:80},curve:startCurve,time:startTime});utils.delay(100,function(){TopBar._subViews[0]._subViews[1].animate({properties:{y:57},curve:startCurve,time:startTime})})}function changeMainQuestion(e){e.animate({properties:{opacity:0,scale:1.5},time:200,curve:"ease-in-out"});utils.delay(200,function(){e.html="Deine Antwort:";utils.delay(20,function(){e.animate({properties:{opacity:1,scale:1},curve:startSpring})})})}function closeMenu(e,t){Scene.animate({properties:{x:Scene.originalFrame.x},time:e,curve:t});menuVisible=!1}function dragObjDisappears(e){switch(globalDirection[1]){case"left":e.animate({properties:{x:e.originalFrame.x-700},curve:globalAnimationCurve});changeMainQuestion(e.superView._subViews[0]);bigAnswer(e.superView._subViews[1]);utils.delay(250,function(){animateResult(e.superView._subViews[3])});break;case"right":e.animate({properties:{x:e.originalFrame.x+700},curve:globalAnimationCurve});changeMainQuestion(e.superView._subViews[0]);bigAnswer(e.superView._subViews[1]);utils.delay(250,function(){animateResult(e.superView._subViews[3])});break;case"up":e.animate({properties:{y:e.originalFrame.y-700},curve:globalAnimationCurve});addToCluster();break;case"down":e.animate({properties:{y:e.originalFrame.y+700},curve:globalAnimationCurve});utils.delay(100,function(){nextObj()})}}function clusterDragObjDisappears(e,t,n,r){switch(globalDirection[1]){case"left":e.animate({properties:{x:e.originalFrame.x-700},curve:globalAnimationCurve});changeMainQuestion(e.superView._subViews[0]);bigAnswer(e.superView._subViews[1]);break;case"right":e.animate({properties:{x:e.originalFrame.x+700},curve:globalAnimationCurve});changeMainQuestion(e.superView._subViews[0]);bigAnswer(e.superView._subViews[1])}utils.delay(1e3,function(){clusterLoop(t,n,r)})}function dragObjReset(e){e.animate({properties:{x:e.originalFrame.x,y:e.originalFrame.y},curve:globalAnimationCurve});e._subViews[1].opacity=0;switch(globalDirection[1]){case"left":animateToSmallType(e.superView._subViews[1]._subViews[0],"24px");break;case"right":animateToSmallType(e.superView._subViews[1]._subViews[2],"24px");break;case"up":animateToSmallType(e.superView._subViews[2]._subViews[1],"0px");break;case"down":animateToSmallType(e.superView._subViews[2]._subViews[0],"0px")}}function getRandomInt(e,t){return Math.floor(Math.random()*(t-e+1))+e}function getDirection(e){var t=[];if(getXDistance(e)>getYDistance(e)){t.push("x");e.originalFrame.x>e.frame.x?t.push("left"):t.push("right")}else{t.push("y");e.originalFrame.y>e.frame.y?t.push("up"):t.push("down")}return t}function getXDistance(e){var t=Math.abs(e.originalFrame.x-e.x);return t}function getYDistance(e){var t=Math.abs(e.originalFrame.y-e.y);return t}function makeActions(){var e=new View({width:384,height:200,x:0,y:160});e.addClass("actions");var t=new View({origin:"50% 50%",width:384,height:52,x:0,y:0,html:"überspringen",style:{fontSize:minActionSize+"px"}});t.addClass("action skip");e.addSubView(t);var n=new View({origin:"50% 50%",width:384,height:52,x:0,y:144,html:"informieren",style:{fontSize:minActionSize+"px"}});n.addClass("action moreInfo");e.addSubView(n);var r=new View({origin:"50% 50%",width:384,height:52,x:0,y:72,html:"clustern",style:{fontSize:minActionSize+"px"}});r.addClass("action toCluster");e.addSubView(r);return e}function makeAnswers(e,t){var n=new View({width:384,height:120,x:0,y:70});n.addClass("answers");var r=new View({origin:"100% 50%",width:162,height:100,x:-162,y:0,html:db.questions[e].pairs[t][0]});r.addClass("left attribute");n.addSubView(r);var i=new View({width:60,height:100,x:162,y:2,html:"oder",style:{opacity:0}});i.scale=0;i.addClass("label inactive");n.addSubView(i);var s=new View({origin:"0% 50%",width:162,height:100,x:384,y:0,html:db.questions[e].pairs[t][1]});s.addClass("right attribute");n.addSubView(s);return n}function makeDNA(e,t,n){var r=new View({width:348,height:180,x:0,y:t*190});r.addSubView(addInfoHeadline(n));for(var i=0;i<5;i++)r.addSubView(addGenom(e,t,i));return r}function makeDragObj(e){var t=new View({width:236,height:236,x:74,y:512}),n=new ImageView({width:236,height:236,x:0,y:0,image:"../assets/db/images/"+db.objects[e].images[0]});n.addClass("objImage");t.addSubView(n);var r=new View({width:236,height:236,x:0,y:0,style:{opacity:0}});r.addClass("colorLayer");t.addSubView(r);t.originalFrame=t.frame;t.originalFrame.y=140;t.addClass("dragObject");t.dragger=new ui.Draggable(t);t.on(Events.DragMove,function(){globalDirection=getDirection(t);animateWords(t,globalDirection)});t.dragger.on(Events.DragEnd,function(){if(globalDirection[1]==="up"&&globalDistance>=70&&globalDistance<=110){showInfo();dragObjReset(t)}else globalDistance>=maxDistance-triggerOffset?dragObjDisappears(t):dragObjReset(t)});return t}function makeInfo(e){var t=new View({width:384,height:1e3,x:0,y:520}),n=new View({width:384,height:1e3,x:0,y:0}),r=new View({width:384,height:50,x:0,y:20,html:"zurück"});r.addClass("action");n.addSubView(r);var i=new View({width:384,height:infoGuiSize[1],x:0,y:214});i.addClass("infoButtonsRow");n.addSubView(i);var s=new View({width:infoGuiSize[0],height:infoGuiSize[1],x:18,y:0,html:"Info"});s.on("click",function(){s.opacity=1;o.opacity=.5;u.opacity=.5;n.animate({properties:{y:0},curve:startCurve,time:startTime});$(".scrollField").animate({scrollTop:0})});s.addClass("infoButton infoGui");i.addSubView(s);var o=new View({width:infoGuiSize[0],height:infoGuiSize[1],x:138,y:0,html:"Beschreibung",opacity:.5});o.on("click",function(){o.opacity=1;s.opacity=.5;u.opacity=.5;n.animate({properties:{y:-200},curve:startCurve,time:startTime});$(".scrollField").animate({scrollTop:195})});o.addClass("textButton infoGui");i.addSubView(o);var u=new View({width:infoGuiSize[0],height:infoGuiSize[1],x:258,y:0,html:"DNA",opacity:.5});u.on("click",function(){u.opacity=1;s.opacity=.5;o.opacity=.5;n.animate({properties:{y:-200},curve:startCurve,time:startTime});$(".scrollField").animate({scrollTop:695})});u.addClass("dnaButton infoGui");i.addSubView(u);var a=new ImageView({width:174,height:174,x:102,y:60,image:"../assets/db/images/"+db.objects[e].images[0]});a.addClass("infoImage");n.addSubView(a);var f=new View({width:174,height:174,x:0,y:0,opacity:0});f.addClass("colorLayer");a.addSubView(f);a.originalFrame=a.frame;a.originalFrame.y=20;a.dragger=new ui.Draggable(a);a.on(Events.DragMove,function(){a.x=102;if(a.y<=20)a.y=20;else if(a.y>=60){a._subViews[0].opacity=.5;a.y=60}else a._subViews[0].opacity=0});a.dragger.on(Events.DragEnd,function(){a.y>=60?hideInfo():a.animate({properties:{y:20},curve:"spring(200,10,10)"});a._subViews[0].opacity=0});var l=new ScrollView({width:386,height:600,x:0,y:254});l.addClass("scrollField");n.addSubView(l);l.addSubView(addKeyValueView(e,"designer","Gestalter",0));l.addSubView(addKeyValueView(e,"genus","Gattung",1));l.addSubView(addKeyValueView(e,"format","Format",2));l.addSubView(addKeyValueView(e,"year","Jahr",3));l.addSubView(addKeyValueView(e,"country","Land",4));var c=new View({width:348,height:400,x:18,y:200});c.addClass("descriptionView");l.addSubView(c);c.addSubView(addInfoHeadline("Beschreibung"));var h=new View({width:348,height:400,x:0,y:30,html:db.objects[e].description});h.addClass("descriptionText");c.addSubView(h);l.addSubView(c);var p=new View({width:348,height:800,x:18,y:700});p.addSubView(makeDNA(e,0,"Physikalische Erscheinung"));p.addSubView(makeDNA(e,1,"Assoziative Wirkung"));p.addClass("dnaView");l.addSubView(p);n.addClass("infoView");t.addSubView(n);return t}function makeMainQuestion(e){var t=new View({width:384,height:60,x:0,y:-100,html:db.questions[e].main});t.addClass("mainQuestion");return t}function makeMenuBtn(){MenuButton.on("click",function(){var e=250,t="ease-in-out";menuVisible?closeMenu(e,t):openMenu(e,t)});MenuButton.addClass("btn")}function makeDragClusterObj(e,t,n){var r,i=new View({width:236,height:236,x:74,y:512}),s=new ImageView({width:236,height:236,x:0,y:0,image:"../assets/db/images/"+db.objects[n].images[0]});s.addClass("objImage");i.addSubView(s);var o=new View({width:236,height:236,x:0,y:0,style:{opacity:0}});o.addClass("colorLayer");i.addSubView(o);i.originalFrame=i.frame;i.originalFrame.y=140;i.addClass("dragObject");i.dragger=new ui.Draggable(i);i.on(Events.DragMove,function(){i.y=i.originalFrame.y;globalDirection=getDirection(i);i.y=i.originalFrame.y;r=getXDistance(i);r>=maxDistance-triggerOffset?i._subViews[1].opacity=.5:i._subViews[1].opacity=0;if(globalDirection[1]==="left"){i.superView._subViews[1]._subViews[0].style.fontSize=getFontSize(r,0,155,minAttrSize,maxAttrSize);r>=maxDistance&&(i.x=i.originalFrame.x-maxDistance)}else if(globalDirection[1]==="right"){i.superView._subViews[1]._subViews[2].style.fontSize=getFontSize(r,0,155,minAttrSize,maxAttrSize);r>=maxDistance&&(i.x=i.originalFrame.x+maxDistance)}});i.dragger.on(Events.DragEnd,function(){r>=maxDistance-triggerOffset?clusterDragObjDisappears(i,e,t,n):dragObjReset(i)});return i}function makeClusterObj(e,t,n){var r=new View({width:236,height:236,x:74,y:80,html:db.objects[n].name});r.addClass("objName");TopBar.addSubView(r);var i=new View({width:384,height:512,x:0,y:181});Scene.addSubView(i);i.bringToFront();i.addSubView(makeMainQuestion(e));i.addSubView(makeAnswers(e,t));i.addSubView(makeDragClusterObj(e,t,n));animateClusterObject(i);return i}function makeObj(){questionIndex=getRandomInt(0,1);pairIndex=getRandomInt(0,4);objIndex=getRandomInt(0,20);var e=new View({width:236,height:236,x:74,y:80,html:db.objects[objIndex].name});e.addClass("objName");TopBar._subViews[0].addSubView(e);var t=new View({width:384,height:512,x:0,y:181});Scene.addSubView(t);t.bringToFront();t.addSubView(makeMainQuestion(questionIndex));t.addSubView(makeAnswers(questionIndex,pairIndex));t.addSubView(makeActions());t.addSubView(makeResults(objIndex,questionIndex,pairIndex));t.addSubView(makeDragObj(objIndex));t.addSubView(makeInfo(objIndex));animateObject(t);return t}function makeResults(e,t,n){var r=db.objects[e].dna[t].pairs[n],i=returnPercent(r),s=new View({width:384,height:3*resultDotSize,x:0,y:150});s.addClass("results");var o=new View({width:resultDotSize,height:resultDotSize,x:47,y:resultDotSize,origin:"50% 50%",scale:0,opacity:0});addResultBG(o,r[0],i[0]);o.addClass("result big");s.addSubView(o);var u=new View({width:resultDotSize,height:resultDotSize,x:47+resultDotSize+10,y:resultDotSize,origin:"50% 50%",scale:0,opacity:0});addResultBG(u,r[1],i[1]);u.addClass("result small");s.addSubView(u);var a=new View({width:resultDotSize,height:resultDotSize,x:47+2*(resultDotSize+10),y:resultDotSize,origin:"50% 50%",scale:0,opacity:0});addResultBG(a,r[2],i[2]);a.addClass("result big");s.addSubView(a);return s}function nextObj(){clearScene();utils.delay(200,function(){makeObj()})}function openMenu(e,t){Scene.animate({properties:{x:Scene.originalFrame.x+300},time:e,curve:t});menuVisible=!0}function showInfo(){changeHeadline();Scene._subViews[1]._subViews[5].animate({properties:{y:0},curve:startCurve,time:startTime+150});Scene._subViews[1]._subViews[5]._subViews[0]._subViews[2].animate({properties:{y:20},curve:"spring(200,10,10)"})}function hideInfo(){Scene._subViews[1]._subViews[5].animate({properties:{y:600},curve:startCurve,time:startTime+150});changeHeadlineBack()}function clearScene(){Scene._subViews[1]._subViews[0].animate({properties:{y:-100,opacity:0},time:200,curve:"ease-in-out"});Scene._subViews[1]._subViews[1].animate({properties:{y:150,opacity:0},time:200,curve:"ease-in-out"});Scene._subViews[1]._subViews[2].animate({properties:{scale:0,opacity:0},time:200,curve:"ease-in-out"});utils.delay(100,function(){Scene._subViews.pop().destroy()})}Framer.config.animationPrecision=60;for(var layerGroupName in PSD){window[layerGroupName]=PSD[layerGroupName];PSD[layerGroupName].originalFrame=window[layerGroupName].frame}var pink="#172d4d",darkBlue="#ff00c1",resultDotSize=90,menuVisible=!1,globalDirection,globalDistance,globalAnimationCurve="spring(400,10,500)",minAttrSize=24,maxAttrSize=36,minActionSize=0,maxActionSize=36,startCurve="ease-in-out",startTime=150,startSpring="spring(200,15,600)",infoGuiSize=[110,30,10],questionIndex,pairIndex,objIndex,designObject,maxDistance=155,triggerOffset=5,makeIconsVisible=function(e,t){utils.delay(200*t,function(){e.scale=.1;e.animate({properties:{scale:1,opacity:1},curve:globalAnimationCurve})})},makeIconsInvisible=function(e,t){utils.delay(200*t,function(){e.animate({properties:{scale:0,opacity:0},curve:globalAnimationCurve})})},getFontSize=function(e,t,n,r,i){var s=map_range(e,t,n,r,i);s+="px";return s},getScaleFactor=function(e,t){var n=e,r=0,i=maxDistance,s=t,o=1;return s+(o-s)*(n-r)/(i-r)},makeItInvisible=function(e,t){e.opacity=0},makeResultVisible=function(e,t){var n=1;t===0&&e.addClass("activeResult");t===1&&(n=.75);utils.delay(100*t,function(){e.scale=.1;e.animate({properties:{scale:n,opacity:1},curve:globalAnimationCurve})})},makeResultInVisible=function(e,t){utils.delay(100*t,function(){e.animate({properties:{scale:0,opacity:0},curve:globalAnimationCurve})})};$(document).ready(function(){makeMenuBtn();designObject=makeObj()});