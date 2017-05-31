// import '../sass/main.scss';
import './css/style.css';
//抓到canvas畫布
const canvas = document.getElementById('canvas')
//規劃2D繪圖環境
/*======================
        方塊
=======================*/
const context = canvas.getContext("2d")
context.fillRect(100,100,250,200)
context.strokeRect(200, 200, 300, 300)
context.rect(400,400,50,50)
context.stroke()
/*======================
　　      畫線
=======================*/
context.strokeStyle='red'
context.lineWidth='50';
context.moveTo(200,200);
context.lineTo(300, 500);
context.stroke();
/*======================
    　　陰影文字
=======================*/
context.shadowOffsetX = 5;
context.shadowOffsetY = 5;
context.shadowColor = 'rgba(255,0,0,0.8)';
context.shadowBlur = 5;
context.font = 'bold 50px Tahoma';
context.fillStyle = 'steelblue';
context.strokeStyle = 'deeppink';
//填滿文字
context.fillText('Hello World!', 200, 200);
/*======================
　　
=======================*/
var pic = new Image();
pic.src = "./images/pug.jpg";
pic.addEventListener('load', function () {
    context.drawImage(pic, 500, 500, 100, 100)
}, false);
// context.fill();
// context.clearRect(0, 0, canvas.width, canvas.height);



