//var canvasm = document.getElementById("multi_a"),
//    ctxm = canvasm.getContext("2d"),
//    x_num = 5,
//    y_num = 3,
//    x_padding = 150,
//    y_padding = 100,
//    r_a = 50,
//    x_d = (canvasm.width-2*x_padding-2*r_a*x_num)/(x_num-1),
//    y_d = (canvasm.height-2*y_padding-2*r_a*y_num)/(y_num-1),
//    t1s = [];
//    for (let i = 0; i < y_num; i++) {
//      for (let j = 0; j < x_num; j++) {
//        let n = i*x_num + j;
//        t1s[n] = 0;
//      }
//    }
//
//var omegam = Math.PI/100,
//    cFm = 144, //Chrome 144fps, IE 60fps
//    dam = x_num*y_num*omegam/cFm,
//    dTimem = 1/cFm,
//    Timem = 0,
//    tTimem = Math.PI/omegam;
//
//var sButton = document.getElementById("startm");
//    dButton = document.getElementById("detectm");
//    rButton = document.getElementById("renewm");
//    paused = true;
//
//function drawmCirc(x,y,r){
//  ctxm.save();
//  ctxm.beginPath();
//  ctxm.arc(x,y,r,0,2*Math.PI);
//  ctxm.lineWidth = 1;
//  ctxm.strokeStyle = "black";
//  ctxm.stroke();
//  ctxm.restore();
//}
//
//function drawmLine(x1,y1,x2,y2,w,c){
//  ctxm.save();
//  ctxm.beginPath();
//  ctxm.moveTo(x1,y1);
//  ctxm.lineTo(x2,y2);
//  ctxm.lineWidth = w;
//  ctxm.strokeStyle = c;
//  ctxm.stroke();
//  ctxm.restore();
//}
//
//function plotCircles(){
//  for (let i = 0; i < x_num; i++) {
//    for (let j = 0; j < y_num; j++) {
//      let xc = x_padding + i*(2*r_a+x_d) + r_a;
//      let yc = y_padding + j*(2*r_a+y_d) + r_a;
//      drawmCirc(xc,yc,r_a);
//    }
//  }
//}
//
//function drawmVectors(){
//  for (let i = 0; i < y_num; i++) {
//    for (let j = 0; j < x_num; j++) {
//      let n = i*x_num + j;
//      let theta = t1s[n];
//      let x1 = x_padding + j*(2*r_a+x_d) + r_a;
//      let y1 = y_padding + i*(2*r_a+y_d) + r_a;
//      let dx = r_a*Math.sin(theta);
//      let dy = -r_a*Math.cos(theta);
//      drawmLine(x1,y1,x1+dx,y1+dy,2,"red");
//    } 
//  }
//}
//
//function animVPlot(){
//  requestAnimFrame(animVPlot);
//  if ((!paused) && (Timem<tTimem)) {
//    for (let i = 0; i < x_num*y_num; i++) {
//      t1s[i] += dam;
//      Timem += dTimem;
//    }
//  }
//  ctxm.clearRect(0,0,canvasm.width,canvasm.height);
//  plotCircles();
//  drawmV