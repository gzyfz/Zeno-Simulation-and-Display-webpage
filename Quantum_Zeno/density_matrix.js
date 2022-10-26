// variables
var canvas = document.getElementById("density_matrix"),
    canvasp = document.getElementById("dm_plot"),
    canvasm = document.getElementById("multi_a")
    ctx = canvas.getContext("2d"),
    ctxp = canvasp.getContext("2d"),
    ctxm = canvasm.getContext("2d"),
    circle = {
        x: canvas.width/2,
        y: canvas.height/2,
        r: 2*canvas.width/8
    },
    omega = Math.PI/10,
    cF = 144, //Chrome 144fps, IE 60fps
    da = omega/cF,
    dTime = 1/cF,
    vector = {
        t1: 0,
        t2: 7*Math.PI/8,
        r: circle.r,
        rh: 20
    },
    Time = 0,
    Timem = 0,
    tTime = Math.PI/omega;

var dButtion = document.getElementById("detect"),
    sButtion = document.getElementById("start"),
    paused = true,
    rButtion = document.getElementById("renew"),
    pButtion = document.getElementById("plot");

var sButton = document.getElementById("startm");
    dButton = document.getElementById("detectm");
    rButton = document.getElementById("renewm");
    hButton = document.getElementById("highlightm");
    tButton = document.getElementById("stat");
    pausedm = true;

var iL = 150,
    eL = 750,
    iH = 150,
    eH = 500,
    xLst = [],
    y0Lst = [],
    yLst = [];

var x_num = 16,
    y_num = 9,
    x_padding = 80,
    y_padding = 50,
    r_a = 30,
    x_d = (canvasm.width-2*x_padding-2*r_a*x_num)/(x_num-1),
    y_d = (canvasm.height-2*y_padding-2*r_a*y_num)/(y_num-1),
    t1s = [];
    for (let i = 0; i < y_num; i++) {
      for (let j = 0; j < x_num; j++) {
        let n = i*x_num + j;
        t1s[n] = 0;
      }
    }

var pm = 0,
    shice = document.getElementById("shice"),
    lilun = document.getElementById("lilun"),
    piancha = document.getElementById("piancha");


// functions
function drawLine(x1,y1,x2,y2,w,c){
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    
    ctx.lineWidth = w;
    ctx.strokeStyle = c;
    ctx.stroke();

    ctx.restore();
}

function drawpLine(x1,y1,x2,y2,w,c){
    ctxp.save();

    ctxp.beginPath();
    ctxp.moveTo(x1, y1);
    ctxp.lineTo(x2, y2);
    
    ctxp.lineWidth = w;
    ctxp.strokeStyle = c;
    ctxp.stroke();

    ctxp.restore();
}

function drawmLine(x1,y1,x2,y2,w,c){
    ctxm.save();

    ctxm.beginPath();
    ctxm.moveTo(x1, y1);
    ctxm.lineTo(x2, y2);
    
    ctxm.lineWidth = w;
    ctxm.strokeStyle = c;
    ctxm.stroke();

    ctxm.restore();
}

function drawDashedCirc(x,y,r,w,c,d){
    ctx.save();

    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    
    ctx.lineWidth = w;
    ctx.setLineDash(d);
    ctx.strokeStyle = c;
    ctx.stroke();

    ctx.restore();
}

function drawCirc(x,y,r,w,c){
    ctx.save();

    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    
    ctx.lineWidth = w;
    ctx.strokeStyle = c;
    ctx.stroke();

    ctx.restore();
}

function drawmCirc(x,y,r,w,c){
    ctxm.save();

    ctxm.beginPath();
    ctxm.arc(x,y,r,0,2*Math.PI);
    
    ctxm.lineWidth = w;
    ctxm.strokeStyle = c;
    ctxm.stroke();

    ctxm.restore();
}

function drawText(font,fStyle,text,x,y){
    ctx.save();

    ctx.font = font;
    ctx.fillStyle = fStyle;
    ctx.fillText(text,x,y);

    ctx.restore();
}

function drawpText(font,fStyle,text,x,y){
    ctxp.save();

    ctxp.font = font;
    ctxp.fillStyle = fStyle;
    ctxp.fillText(text,x,y);

    ctxp.restore();
}

function drawVector(w){
    endx = circle.x+vector.r*Math.sin(vector.t1);
    endy = circle.y-vector.r*Math.cos(vector.t1);
    drawLine(circle.x, circle.y, endx, endy, w, "red");
    drawLine(endx, endy, endx-vector.rh*Math.sin(vector.t2-vector.t1), endy-vector.rh*Math.cos(vector.t2-vector.t1), w, "red");
    drawLine(endx, endy, endx+vector.rh*Math.sin(vector.t2+vector.t1), endy-vector.rh*Math.cos(vector.t2+vector.t1), w, "red");
}

function drawFrame(l){
    drawLine(circle.x, circle.y+l, circle.x, circle.y-l, 1, "black");
    drawLine(circle.x-l, circle.y, circle.x+l, circle.y, 1, "black");
    hdx = 8;
    hdy = 20;
    drawLine(circle.x, circle.y+l, circle.x-hdx, circle.y+l-hdy);
    drawLine(circle.x, circle.y+l, circle.x+hdx, circle.y+l-hdy);
    drawLine(circle.x+l, circle.y, circle.x+l-hdy, circle.y+hdx);
    drawLine(circle.x+l, circle.y, circle.x+l-hdy, circle.y-hdx);
    drawDashedCirc(circle.x, circle.y, circle.r, 1, "blue", [3, 2]);
    let lc = {
        x:circle.x-30,
        y:circle.y-30,
        r:10
    };
    drawText("italic 30px Times New Roman", "black", "R", circle.x+15, circle.y+l+10);
    drawText("20px Times New Roman", "black", "3", circle.x+35, circle.y+l+13);
    drawText("italic 30px Times New Roman", "black", "R", circle.x+l+10, circle.y+10);
    drawText("20px Times New Roman", "black", "2", circle.x+l+30, circle.y+13);
    drawText("italic 30px Times New Roman", "black", "R", circle.x-70, circle.y-50);
    drawText("20px Times New Roman", "black", "1", circle.x-54, circle.y-45);
    drawCirc(lc.x, lc.y, lc.r, 1, "black");
    drawLine(lc.x-0.5*lc.r*Math.SQRT2, lc.y+0.5*lc.r*Math.SQRT2, lc.x+0.5*lc.r*Math.SQRT2, lc.y-0.5*lc.r*Math.SQRT2, 1, "black");
    drawLine(lc.x-0.5*lc.r*Math.SQRT2, lc.y-0.5*lc.r*Math.SQRT2, lc.x+0.5*lc.r*Math.SQRT2, lc.y+0.5*lc.r*Math.SQRT2, 1, "black");
}

function animDraw(){
    requestAnimFrame(animDraw);
    if ((!paused) && (Time<tTime)){
        vector.t1 += da;
        Time += dTime;
        let p = 0.5*(1-(vector.r*Math.cos(vector.t1))/(circle.r));
        let p0 = 0.5*(1-Math.cos(Time*omega));
        yLst.push(eH-p*(eH-iH));
        y0Lst.push(eH-p0*(eH-iH));
        xLst.push(iL+((Time*(eL-iL))/(tTime)));
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFrame(280);
    drawVector(2);
}

function drawpFrame(){
    drawpLine(150,500,850,500,1,"black");
    drawpLine(150,500,150,100,1,"black");
    let dx = 7;
    let dy = 20;
    drawpLine(850,500,850-dy,500+dx,1,"black");
    drawpLine(850,500,850-dy,500-dx,1,"black");
    drawpLine(150,100,150+dx,100+dy,1,"black");
    drawpLine(150,100,150-dx,100+dy,1,"black");
    drawpText("italic 30px Times New Roman","black","O",120,520);
    drawpText("italic 30px Times New Roman","black","t",860,520);
    drawpText("italic 30px Times New Roman","black","P (t)",125,85);
    drawpText("bold 16px Times New Roman","black","2",140,90);
}

function drawmCircs(){
    for (let i = 0; i < y_num; i++) {
        for (let j = 0; j < x_num; j++) {
            drawmCirc(x_padding + (2*r_a+x_d)*j + r_a, y_padding + (2*r_a+y_d)*i + r_a, r_a, 1, "black");
            let alpha = t1s[i*x_num+j];
            let dx = r_a*Math.sin(alpha);
            let dy = -r_a*Math.cos(alpha);
            drawmLine(x_padding + (2*r_a+x_d)*j + r_a, y_padding + (2*r_a+y_d)*i + r_a, x_padding + (2*r_a+x_d)*j + r_a + dx, y_padding + (2*r_a+y_d)*i + r_a + dy, 2, "red");            
        }
    }
}

function testAnim(){
    requestAnimFrame(testAnim);
    if((!pausedm)&(Timem<tTime)){
        Timem += dTime;
        for (let i = 0; i < x_num*y_num; i++) {
            t1s[i] = t1s[i] + da;
        }
        vector.t1 += da;
        //Time += dTime;
        pm = 0.5*(1-(vector.r*Math.cos(vector.t1))/(circle.r));
        ctxm.clearRect(0,0,canvasm.width,canvasm.height);
    }
    drawmCircs();
}

function plotP2(){
    drawpFrame();
    drawpLine(150,500,xLst[0],yLst[0]);
    for (let i = 1; i < xLst.length; i++) {
        drawpLine(xLst[i-1],yLst[i-1],xLst[i],yLst[i],1,"black");
        drawpLine(xLst[i-1],y0Lst[i-1],xLst[i],y0Lst[i],1,"red");
    }
}

// initialization
dButtion.onclick = function(e){
    if (Math.cos(vector.t1)>=0){
        vector.r = vector.r*Math.cos(vector.t1);
        vector.t1 = 0;
    }else{
        vector.r = -vector.r*Math.cos(vector.t1);
        vector.t1 = Math.PI;
    }
}
sButtion.onclick = function(e){
    if (paused){
        paused = false;
        sButtion.value = "停止";
    }else{
        paused = true;
        sButtion.value = "继续";
    }
}
rButtion.onclick = function(e){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    vector.t1 = 0;
    vector.r = circle.r;
    drawFrame(280);
    drawVector(2);
    paused = true;
    Time = 0;
    xLst = [],
    yLst = [],
    y0Lst = [];
    sButtion.value = "开始";
}
pButtion.onclick = function(e){
    ctxp.clearRect(0,0,canvasp.width,canvasp.height);
    plotP2();

    ctxp.save();
    ctxp.beginPath();
    ctxp.moveTo(eL, iH);
    ctxp.lineTo(eL, eH);
    ctxp.width = 0.7;
    ctxp.setLineDash([2,3]);
    ctxp.strokeStyle = "black";
    ctxp.stroke();
    ctxp.restore();

    ctxp.save();
    ctxp.beginPath();
    ctxp.moveTo(iL, iH);
    ctxp.lineTo(eL, iH);
    ctxp.width = 0.7;
    ctxp.setLineDash([2,3]);
    ctxp.strokeStyle = "black";
    ctxp.stroke();
    ctxp.restore();

    drawpLine(eL,50,eL+70,50,1,"red");
    drawpText("20px Times New Roman","black","不作观测的结果",eL+80,55);
    drawpLine(eL,85,eL+70,85,1,"black");
    drawpText("20px Times New Roman","black","作观测的结果",eL+80,90);
    drawpText("italic 30px Times New Roman","black","π/Ω",eL-20,eH+30);
    drawpText("25px Times New Roman","black","1",iL-20,iH+10);
}
sButton.onclick = function(e){
    if (pausedm){
        pausedm = false;
        sButton.value = "停止";
    }else{
        pausedm = true;
        sButton.value = "继续";
    }
}
rButton.onclick = function(e){
    ctxm.clearRect(0,0,canvasm.width,canvasm.height);
    Timem = 0;
    vector.t1 = 0;
    vector.r = circle.r;
    for (let i = 0; i < y_num; i++) {
        for (let j = 0; j < x_num; j++) {
          let n = i*x_num + j;
          t1s[n] = 0;
        }
      }
    pausedm = true;
    drawmCircs();
    sButton.value = "开始";
}
dButton.onclick = function(e){
    for (let i = 0; i < y_num; i++) {
        for (let j = 0; j < x_num; j++) {
          let n = i*x_num + j;
          let p0 = (Math.cos(0.5*t1s[n]))**2;
          let p = Math.random();
          if (p<p0){
              t1s[n] = 0;
          }else{
              t1s[n] = Math.PI;
          }
        }
    }
    if (Math.cos(vector.t1)>=0){
        vector.r = vector.r*Math.cos(vector.t1);
        vector.t1 = 0;
    }else{
        vector.r = -vector.r*Math.cos(vector.t1);
        vector.t1 = Math.PI;
    }
}
hButton.onclick = function(e){
    pausedm = true;
    for (let i = 0; i < y_num; i++) {
        for (let j = 0; j < x_num; j++) {
            if (t1s[i*x_num+j]>0.0001){
                ctxm.save();
                ctxm.beginPath();
                ctxm.arc(x_padding + (2*r_a+x_d)*j + r_a, y_padding + (2*r_a+y_d)*i + r_a, r_a, 0, 2*Math.PI);
                ctxm.fillStyle = "rgba(255, 0, 0, 0.3)";
                ctxm.fill();
                ctxm.lineWidth = 0.5;
                ctxm.stroke();
                ctxm.restore();
            }
        }
    }
}
tButton.onclick = function(e){
    if(pausedm==true){
        let count = 0;
        for (let i = 0; i < x_num*y_num; i++) {
            if(t1s[i]>0.001){
                count++;
            }
        }
        let p_shice = 100*count/(x_num*y_num);
        let p_lilun = 100*pm;
        shice.innerHTML = p_shice.toFixed(2) + "%";
        lilun.innerHTML = p_lilun.toFixed(2) + "%";
        let p_pian = 100*(p_shice-p_lilun)/p_lilun;
        piancha.innerHTML = p_pian.toFixed(2) + "%";
    }
}

testAnim();
//drawmCircs();
animDraw();