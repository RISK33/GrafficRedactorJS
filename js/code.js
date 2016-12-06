
var canvas=document.getElementById("draw");
var g2d=canvas.getContext("2d");
g2d.strokeRect(0,0,1200,750);
var mainArray = [];
var selectedElements = [];
var selectedIndexs = [];
var select = false;
var xCircle;
var yCircle; 
var radiusCircle = 6;
var nearElement;
var mousedown = false;
var startPoint;
var finishPoint;
var mode = "Edit";
var local = true;
var mas  = [];
var action;
var timer;
var ff;
var condShow = false; 
var step = 0.002;
var step2 = 4;
var tempList =[];
var nextList= [];
var t = 0;
var morfingMoveElements = [];
var indexs = [];
var usl = false;
var rectangles = [];
var frac = false;
var maxLength;
var tempLength = 0;
var pozition = 1;
var center;
var oldPoint;
var newPoint;
var tempIndex = 0;
var width;
var heigth;
var lines = [];
var iteration = 0;
var temp = [];
var countRectangles = 0;
var iterationCount;
var maxLayer = 0;
var prevLayer = 0;


function addRectangle() {
	var x1 = Math.random() * (1200 - 1) + 1;
	var x2 = Math.random() * (1200 - 1) + 1;
	var y1 = Math.random() * (750 - 1) + 1;
	var y2 = Math.random() * (750 - 1) + 1;
  var tempObject = new Rectangle(new Point(x1,y1),new Point(x2,y2));
  tempObject.setLayer(++maxLayer);
	mainArray.push(tempObject);
  // console.log(maxLayer);
	repaint();
}

function addLine() {
	var x1 = Math.random() * (1200 - 1) + 1;
	var x2 = Math.random() * (1200 - 1) + 1;
	var y1 = Math.random() * (750 - 1) + 1;
	var y2 = Math.random() * (750 - 1) + 1;
  var tempObject = new Line(new Point(x1,y1),new Point(x2,y2));
  tempObject.setLayer(++maxLayer);
	mainArray.push(tempObject);
  // console.log(maxLayer);
	repaint();
}

function addTriangle() {
	var x1 = Math.random() * (1200 - 1) + 1;
	var x2 = Math.random() * (1200 - 1) + 1;
	var x3 = Math.random() * (1200 - 1) + 1;
	var y1 = Math.random() * (750 - 1) + 1;
	var y2 = Math.random() * (750 - 1) + 1;
	var y3 = Math.random() * (750 - 1) + 1;
  var tempObject = new Triangle(new Point(x1,y1),new Point(x2,y2), new Point(x3,y3));
  tempObject.setLayer(++maxLayer);
	mainArray.push(tempObject);
  // console.log(maxLayer);
	repaint();
}

function addCircle() {
	var x = Math.random() * (1200 - 1) + 1;
	var y = Math.random() * (750 - 1) + 1;
	var r = Math.random() * (200-3) + 3;
	if (x + r > 1200 || y + r > 750 || x - r < 1 || y - r < 1) {
		addCircle();
		return;
	}
  var tempObject = new Circle(new Point(x,y),r);
  tempObject.setLayer(++maxLayer);
  mainArray.push(tempObject);
  // console.log(maxLayer);
  repaint();
}

function deleteElement() {
  // console.log(mainArray.length);
	if (selectedElements.length == 0) {
		if (mainArray.length > 0) {
      var tempObject = mainArray[mainArray.length-1];
      if (maxLayer == tempObject.getLayer()) {
        prevLayer = maxLayer;
        maxLayer = 0;
        for (var i = 0; i < mainArray.length; i++) {
          tempObject = mainArray[i];
          if (tempObject.getLayer() > maxLayer && maxLayer != prevLayer) maxLayer = tempObject.getLayer(); 
        }
      }
			mainArray.pop();
			repaint();
		}
	} else {
		for (var i = 0; i < selectedIndexs.length; i++) {
      var tempObject = mainArray[selectedIndexs[i]];
      if (maxLayer == tempObject.getLayer()) {
        prevLayer = maxLayer;
        maxLayer = 0;
        for (var g = 0; g < mainArray.length; g++) {
          tempObject = mainArray[g];
          if (tempObject.getLayer() > maxLayer && tempObject.getLayer() != prevLayer) maxLayer = tempObject.getLayer(); 
        }
      }
      console.log(selectedIndexs[i]);
			mainArray.splice(selectedIndexs[i],1);
		}
    // console.log(mainArray.length);
		selectedElements = [];
		selectedIndexs = [];
		repaint();
	}
}

function changeColor() {
  var tmp = document.getElementsByName("color");
  for (var i = 0; i < selectedElements.length; i++) {
    var obj = selectedElements[i];
    obj.setColor(tmp[0].value);
  }
}

function repaint() {
  if (!frac)	g2d.clearRect(1,1,1198,748);
	g2d.lineWidth = 2;
	for (var f = 1; f <= maxLayer; f++) {
	   for (var i = 0; i < mainArray.length; i++){
	   	var object = mainArray[i];
      if (object.getLayer() != f) continue;
        if (object != null) 
        g2d.fillStyle = g2d.strokeStyle = object.getColor();
    
        else g2d.strokeStyle = "#000000"; 
	   	if (object instanceof Line) {
	   		var p1 = object.p1;
	   		var p2 = object.p2;
	   		g2d.beginPath();
        		g2d.moveTo(p1.x,p1.y);
        		g2d.lineTo(p2.x,p2.y);
        		g2d.stroke();
	   	} else if (object instanceof Triangle) {
	   		var p1 = object.p1;
	   		var p2 = object.p2;
	   		var p3 = object.p3;
	   		g2d.beginPath();
        		g2d.moveTo(p1.x,p1.y);
        		g2d.lineTo(p2.x,p2.y);
        		g2d.lineTo(p3.x,p3.y);
        		g2d.lineTo(p1.x,p1.y);
        		g2d.stroke();
          g2d.closePath();  
          g2d.fill(); 
	   	} else if (object instanceof Rectangle) {
	   		var p1 = object.p1;
	   		var p2 = object.p2;
	   		var p3 = object.p3;
	   		var p4 = object.p4;
	   		g2d.beginPath();
        		g2d.moveTo(p1.x,p1.y);
        		g2d.lineTo(p2.x,p2.y);
        		g2d.lineTo(p3.x,p3.y);
        		g2d.lineTo(p4.x,p4.y);
        		g2d.lineTo(p1.x,p1.y);
        		g2d.stroke();
          g2d.closePath();  
          g2d.fill(); 
	   	} else if (object instanceof Circle) {
	   		var pC = object.pC;
	   		var radius = object.radius/2;
	   		g2d.beginPath();
	   		g2d.arc(pC.x,pC.y,radius,0,Math.PI*2,true);
	   		g2d.stroke();
          g2d.closePath();  
          g2d.fill(); 
	   	}
	   }
        
        g2d.strokeStyle = "#006400";
        g2d.lineWidth = 4;
        
	   for (var i = 0; i < selectedElements.length; i++){
	   	var object = selectedElements[i];
	   	if (object instanceof Line) {
	   		var p1 = object.p1;
	   		var p2 = object.p2;
	   		g2d.beginPath();
        		g2d.moveTo(p1.x,p1.y);
        		g2d.lineTo(p2.x,p2.y);
        		g2d.stroke();
	   	} else if (object instanceof Triangle) {
	   		var p1 = object.p1;
	   		var p2 = object.p2;
	   		var p3 = object.p3;
	   		g2d.beginPath();
        		g2d.moveTo(p1.x,p1.y);
        		g2d.lineTo(p2.x,p2.y);
        		g2d.lineTo(p3.x,p3.y);
        		g2d.lineTo(p1.x,p1.y);
        		g2d.stroke();
	   	} else if (object instanceof Rectangle) {
	   		var p1 = object.p1;
	   		var p2 = object.p2;
	   		var p3 = object.p3;
	   		var p4 = object.p4;
	   		g2d.beginPath();
        		g2d.moveTo(p1.x,p1.y);
        		g2d.lineTo(p2.x,p2.y);
        		g2d.lineTo(p3.x,p3.y);
        		g2d.lineTo(p4.x,p4.y);
        		g2d.lineTo(p1.x,p1.y);
        		g2d.stroke();
	   	} else if (object instanceof Circle) {
	   		var pC = object.pC;
	   		var radius = object.radius/2;
	   		g2d.beginPath();
	   		g2d.arc(pC.x,pC.y,radius,0,Math.PI*2,true);
	   		g2d.stroke();
	   	}
	   }
   }

  g2d.strokeStyle = "#191970";
    g2d.lineWidth = 3;

  for (var i = 0; i < morfingMoveElements.length; i++){
    var object = morfingMoveElements[i];
    if (object instanceof Line) {
      var p1 = object.p1;
      var p2 = object.p2;
      g2d.beginPath();
        g2d.moveTo(p1.x,p1.y);
        g2d.lineTo(p2.x,p2.y);
        g2d.stroke();
    } else if (object instanceof Triangle) {
      var p1 = object.p1;
      var p2 = object.p2;
      var p3 = object.p3;
      g2d.beginPath();
        g2d.moveTo(p1.x,p1.y);
        g2d.lineTo(p2.x,p2.y);
        g2d.lineTo(p3.x,p3.y);
        g2d.lineTo(p1.x,p1.y);
        g2d.stroke();
    } else if (object instanceof Rectangle) {
      var p1 = object.p1;
      var p2 = object.p2;
      var p3 = object.p3;
      var p4 = object.p4;
      g2d.beginPath();
        g2d.moveTo(p1.x,p1.y);
        g2d.lineTo(p2.x,p2.y);
        g2d.lineTo(p3.x,p3.y);
        g2d.lineTo(p4.x,p4.y);
        g2d.lineTo(p1.x,p1.y);
        g2d.stroke();
    } else if (object instanceof Circle) {
      var pC = object.pC;
      var radius = object.radius/2;
      g2d.beginPath();
      g2d.arc(pC.x,pC.y,radius,0,Math.PI*2,true);
      g2d.stroke();
    }
  }


	g2d.strokeStyle = "#0000FF";
    g2d.lineWidth = 4;
    
	var object = nearElement;
	if (object instanceof Line) {
		var p1 = object.p1;
		var p2 = object.p2;
		g2d.beginPath();
    	g2d.moveTo(p1.x,p1.y);
    	g2d.lineTo(p2.x,p2.y);
    	g2d.stroke();
	} else if (object instanceof Triangle) {
		var p1 = object.p1;
		var p2 = object.p2;
		var p3 = object.p3;
		g2d.beginPath();
    	g2d.moveTo(p1.x,p1.y);
    	g2d.lineTo(p2.x,p2.y);
    	g2d.lineTo(p3.x,p3.y);
    	g2d.lineTo(p1.x,p1.y);
    	g2d.stroke();
	} else if (object instanceof Rectangle) {
		var p1 = object.p1;
		var p2 = object.p2;
		var p3 = object.p3;
		var p4 = object.p4;
		g2d.beginPath();
    	g2d.moveTo(p1.x,p1.y);
    	g2d.lineTo(p2.x,p2.y);
    	g2d.lineTo(p3.x,p3.y);
    	g2d.lineTo(p4.x,p4.y);
    	g2d.lineTo(p1.x,p1.y);
    	g2d.stroke();
	} else if (object instanceof Circle) {
		var pC = object.pC;
		var radius = object.radius/2;
		g2d.beginPath();
		g2d.arc(pC.x,pC.y,radius,0,Math.PI*2,true);
		g2d.stroke();
	}

   g2d.lineWidth = 2;

  for (var i = 0; i < lines.length; i++){
    var object = lines[i];
    if (object instanceof Line) {
      var p1 = object.p1;
      var p2 = object.p2;
      g2d.beginPath();
      g2d.moveTo(p1.x,p1.y);
      g2d.lineTo(p2.x,p2.y);
      g2d.stroke();
    }
  }


  for (var i = 0; i < rectangles.length; i++){
    var object = rectangles[i];
    if (object instanceof Rectangle) {
      var p1 = object.p1;
      var p2 = object.p2;
      var p3 = object.p3;
      var p4 = object.p4;
      g2d.beginPath();
      g2d.moveTo(p1.x,p1.y);
      g2d.lineTo(p2.x,p2.y);
      g2d.lineTo(p3.x,p3.y);
      g2d.lineTo(p4.x,p4.y);
      g2d.lineTo(p1.x,p1.y);
      g2d.stroke();
    }
  }
}

function ArrayToString() {
	var stroke = "";
	for (var i = 0; i < mainArray.length; i++) {
		var object = mainArray[i];
		stroke += object.toString() + "|";
	}
  return stroke;
}

function StringToArray(stroke) {
  maxLayer = 0;
	var arrayList = [];
	var strokeArray = stroke.split('|');
	strokeArray.pop();
	for (var i = 0; i < strokeArray.length;i++) {
		if (strokeArray[i].substr(0,2).localeCompare("Ок") == 0) {
			var points = strokeArray[i].split('n');
			var rad = parseFloat(points[2]);
			var xAndY = points[1].split(',');
			var newPoint = new Point(parseFloat(xAndY[0].substring(4)),parseFloat(xAndY[1].substring(5)));
		  var newCircle = new Circle(newPoint,rad);
      var color = points[3];
      var layer = points[4];
      newCircle.setLayer(layer);
      if (layer > maxLayer) maxLayer = layer;
      newCircle.setColor(color);
		  arrayList.push(newCircle);
		} else if (strokeArray[i].substr(0,1).localeCompare("П") == 0) {
			var points = strokeArray[i].split('n');
			var xAndY1 = points[1].split(',');
			var newPoint1 = new Point(parseFloat(xAndY1[0].substring(4)),parseFloat(xAndY1[1].substring(5)));
			var xAndY2 = points[3].split(',');
			var newPoint2 = new Point(parseFloat(xAndY2[0].substring(4)),parseFloat(xAndY2[1].substring(5)));
			var newRectangle = new Rectangle(newPoint1,newPoint2);
      var color = points[5];
      var layer = points[6];
      if (layer > maxLayer) maxLayer = layer;
      newRectangle.setLayer(layer);
      newRectangle.setColor(color);
			arrayList.push(newRectangle);
		} else if (strokeArray[i].substr(0,2).localeCompare("От") == 0) {
      var points = strokeArray[i].split('n');
      var xAndY1 = points[1].split(',');
      var newPoint1 = new Point(parseFloat(xAndY1[0].substring(4)),parseFloat(xAndY1[1].substring(5)));
      var xAndY2 = points[2].split(',');
      var newPoint2 = new Point(parseFloat(xAndY2[0].substring(4)),parseFloat(xAndY2[1].substring(5)));
      var newLine = new Line(newPoint1,newPoint2);
      var color = points[3];
      var layer = points[4];
      if (layer > maxLayer) maxLayer = layer;
      newLine.setLayer(layer);
      newLine.setColor(color);
      arrayList.push(newLine);
    } else if (strokeArray[i].substr(0,1).localeCompare("Т") == 0) {
      var points = strokeArray[i].split('n');
      var xAndY1 = points[1].split(',');
      var newPoint1 = new Point(parseFloat(xAndY1[0].substring(4)),parseFloat(xAndY1[1].substring(5)));
      var xAndY2 = points[2].split(',');
      var newPoint2 = new Point(parseFloat(xAndY2[0].substring(4)),parseFloat(xAndY2[1].substring(5)));
      var xAndY3 = points[3].split(',');
      var newPoint3 = new Point(parseFloat(xAndY3[0].substring(4)),parseFloat(xAndY3[1].substring(5)));
      var newTriangle = new Triangle(newPoint1,newPoint2,newPoint3);
      var color = points[4];
      var layer = points[5];
      if (layer > maxLayer) maxLayer = layer;
      newTriangle.setLayer(layer);
      newTriangle.setColor(color);
      arrayList.push(newTriangle);
    }
	}
  return arrayList;
}

function pushing() {
 for (var j = 0; j < temp.length; j++) {
   var ob = new Rectangle(new Point(temp[j].p1.x,temp[j].p1.y),new Point(temp[j].p3.x,temp[j].p3.y));
   for (var k = 0; k < rectangles.length-1; k++) {
    if (ob.p1.x > rectangles[k].p1.x && ob.p1.x < rectangles[k+1].p1.x) {
      rectangles.splice(k+1,0,ob);
      // console.log(k+1);
      break;
    }
   }
 }
 // console.log(temp.length);
 temp = [];
}

function fractal() {
  maxLayer = 0;
  g2d.clearRect(1,1,1198,748);
  $(".hideButtons").hide();
  condShow = true;
  document.getElementById("showButton").src="Pictures/788800.png";

  iterationCount = prompt("Введите количество итераций:");
  if (iterationCount.localeCompare("") == 0) {
    iterationCount = 0;
  }
  var sum = 0;
  var d = 1;
  for (var i = 0; i <= iterationCount; i++) {
    countRectangles = 2 * countRectangles + 1;
    // console.log(countRectangles);
  }
  if (iterationCount > 5)  width = (1160-30)/countRectangles+2;
  // console.log(countRectangles);
  mainArray = [];
  rectangles = [];
  selectedElements = [];
  selectedIndexs = [];
  select = false;
  frac = true;

  tempLength = 0;
  pozition = 1;
  tempIndex = 0;
  lines = [];
  iteration = 0;
  temp = [];
  countRectangles = 0;
  iterationCount;
  repaint();
  g2d.lineWidth = 2;
  g2d.strokeStyle = "#0000FF";
  g2d.beginPath();
  g2d.moveTo(30,730);
  g2d.lineTo(30,630);
  g2d.lineTo(30,630);
  g2d.lineTo(30,730);
  g2d.lineWidth = 4;
  g2d.lineTo(1180,730);
  g2d.lineWidth = 2;
  g2d.lineTo(1180,130);
  g2d.lineTo(1160,130);
  g2d.lineTo(1160,730);
  g2d.stroke();

  rectangles.push(new Rectangle(new Point(30,730),new Point(30,630)));
  rectangles.push(new Rectangle(new Point(1160,730),new Point(1180,130)));
  tempIndex = 0;
  recountFractal();
  temp = [];
  timer = setInterval(function tick() {
    if (tempLength + step2 >= maxLength) {
      tempLength += maxLength - tempLength;
      drowFractal();   
      tempLength = 0 - step2;

      if (pozition == 3) {
        pozition = 1;
        temp.push(new Rectangle(new Point(lines[0].p1.x,lines[0].p1.y),new Point(lines[1].p2.x,lines[1].p2.y)));

        if (tempIndex + 2 == rectangles.length) {
           iteration++;
           if (iteration == iterationCount) {
            clearTimeout(timer);
            alert("Итерации закончены!");
           } else {
            pushing();
            tempIndex = 0;
           }
        } 
        else {
           // console.log("not");
           // console.log(rectangles);
           tempIndex++;
           // console.log(tempIndex);
           lines = [];
        }
      } 
      else {
        pozition++;
      }
      recountFractal();
    }
    tempLength += step2;
    // console.log(tempLength);
    drowFractal();
  }, 5);
}

function drowFractal() {
  if (pozition == 1) {
    newPoint= new Point(oldPoint.x,oldPoint.y-tempLength);
    lines[0] = new Line(new Point(oldPoint.x,oldPoint.y),new Point(newPoint.x,newPoint.y));
  } else if (pozition == 2) {
    newPoint= new Point(oldPoint.x+tempLength,oldPoint.y);
    lines[1] = new Line(new Point(oldPoint.x,oldPoint.y),new Point(newPoint.x,newPoint.y));
  } else {
    newPoint= new Point(oldPoint.x,oldPoint.y+tempLength);
    lines[2] = new Line(new Point(oldPoint.x,oldPoint.y),new Point(newPoint.x,newPoint.y));
  }
  repaint();
}

function recountFractal() {
  var r1 = rectangles[tempIndex];
  var r2 = rectangles[tempIndex + 1];
  if (pozition == 1) {
    lines = [];
    var center1 = (r1.p2.x + r1.p1.x) / 2;
    var center2 = (r2.p2.x + r2.p1.x) / 2;
    // console.log(center1 + " " + center2);
    center = new Point((center2+center1)/2,730);
    // console.log(center);
    heigth = (r2.p1.y-r2.p4.y + r1.p1.y-r1.p4.y)/2;
    if (iterationCount < 6) width = (r1.p2.x-r1.p1.x + r2.p2.x-r2.p1.x)/2;
    // width = (r2.p2.x-r2.p1.x)/4;
    // console.log(width);
    maxLength = heigth;
    oldPoint = new Point(center.x - width/2,730);
    // console.log(oldPoint);
    newPoint = new Point(oldPoint.x,oldPoint.y);
    lines.push(new Line(new Point(oldPoint.x,oldPoint.y),new Point(newPoint.x,newPoint.y)));
  } else if (pozition == 2) {
    maxLength = width;
    oldPoint = new Point(center.x - width/2,730 - heigth);
    newPoint = new Point(oldPoint.x,oldPoint.y);
    lines.push(new Line(new Point(oldPoint.x,oldPoint.y),new Point(newPoint.x,newPoint.y)));
  } else {
    maxLength = heigth;
    oldPoint = new Point(center.x + width/2,730 - heigth);
    newPoint = new Point(oldPoint.x,oldPoint.y);
    lines.push(new Line(new Point(oldPoint.x,oldPoint.y),new Point(newPoint.x,newPoint.y)));
  }
}
 
function save() {
	var listName = prompt("Введите название листа:");
  if (listName == null || listName.localeCompare("") == 0) {
    return;
  }
  createCookie(listName,ArrayToString(),60);
  var listArrays = readCookie("ListArrays");
  if (listArrays != null) {
    var st = listArrays.split(',');
    for (var i = 0; i < st.length; i++) {
      listName += "," + st[i];
    }
  }
  createCookie("ListArrays",listName,60);
}

function load() {
  selectedElements = [];
  action = "load";
  var listArrays = readCookie("ListArrays");
  if (listArrays == null) {
    alert("В вашем браузере нет сохраненных листов!");
    return;
  }
  document.getElementById('win').removeAttribute('style');
  var tmp = document.getElementById('win3');
  var st = listArrays.split(',');
  var b = document.getElementById('buttonOk');
  b.innerHTML = "Загрузить";
  tmp.innerHTML = '<p>Выберите лист</p></br><input type="radio" name="loadMode" value="local" checked>' + st[0];
  for (var i = 1; i < st.length; i++) {
    // alert(st[i]);
    tmp.innerHTML += '</br><input type="radio" name="loadMode" value="local">' + st[i];
  }

}


function loadList() {
  var listArrays = readCookie("ListArrays");
  var r=document.getElementsByName("loadMode");
  var st = listArrays.split(',');
  for (var i = 0; i < st.length; i++) {
    if(r[i].checked){
      console.log("Выбран лист: " + st[i]);
      var stroke = readCookie(st[i]);
      mainArray = StringToArray(stroke);
      repaint();
      break;
    } 
  }  
}

function show () {
  if (condShow) {
    $(".hideButtons").show();
    document.getElementById("showButton").src="Pictures/show.png";
    clearTimeout(timer);
    condShow = false;
    morfingMoveElements =[];
    mainArray = [];
    rectangles = [];
    lines = [];
    frac = false;
    var tmp = document.getElementById("info");
    tmp.innerHTML = "";
    maxLayer = 0;
    repaint();
  } else {
    var listArrays = readCookie("ListArrays");
    if (listArrays == null) {
      alert("В вашем браузере нет сохраненных листов!");
      return;
    }
    selectedElements = [];
    selectedIndexs = [];
    select = false;
    repaint();
    action = "show";
    document.getElementById('win').removeAttribute('style');
    var tmp = document.getElementById('win3');
    var st = listArrays.split(',');
    var b = document.getElementById('buttonOk');
    b.innerHTML = "Показать";
    tmp.innerHTML = '<input type="checkbox" name="a0">' + st[0];
    for (var i = 1; i < st.length; i++) {
      // alert(st[i]);
      tmp.innerHTML += '</br><input type="checkbox" name="a' + i + '">' + st[i];
    }
    condShow = true;
  }
}

function showLists() {
  $(".hideButtons").hide();
  document.getElementById("showButton").src="Pictures/788800.png";
  var listArrays = readCookie("ListArrays");
  var st = listArrays.split(',');
  var index = 0;
  var indexs=[];
  for (var i = 0; i < st.length; i++) {
     var r=document.getElementsByName("a" + i);
     if (r[0].checked) {
      console.log("Выбран лист: " + st[i]);
      indexs.push(i);
     }
  }
  timer = setTimeout(function tick() {
    if (index + 1 == indexs.length) index = -1;
    ++index;
    showSelectLists(indexs[index]);
    timer = setTimeout(tick, 2000);
  }, 5);
}

function showSelectLists(ff) {
  var listArrays = readCookie("ListArrays");
  var st = listArrays.split(',');
  var stroke = readCookie(st[ff]);
  mainArray = StringToArray(stroke);
  var tmp = document.getElementById("info");
  tmp.innerHTML = "Название листа: " + st[ff];
  repaint();
}

function morfing(){
  var listArrays = readCookie("ListArrays");
  if (listArrays == null) {
      alert("В вашем браузере нет сохраненных листов!");
      return;
    }
  selectedElements = [];
  selectedIndexs = [];
  select = false;
  repaint();
  action = "morfing";
  document.getElementById('win').removeAttribute('style');
  var tmp = document.getElementById('win3');
  var st = listArrays.split(',');
  var b = document.getElementById('buttonOk');
  b.innerHTML = "Показать";
  tmp.innerHTML = '<input type="checkbox" name="a0">' + st[0];
  for (var i = 1; i < st.length; i++) {
    // alert(st[i]);
    tmp.innerHTML += '</br><input type="checkbox" name="a' + i + '">' + st[i];
  }
  condShow = true;
}

function morfingLists(){
   $(".hideButtons").hide();
  document.getElementById("showButton").src="Pictures/788800.png";
  var listArrays = readCookie("ListArrays");
  var st = listArrays.split(',');
  var index = 0;
  indexs=[];
  var f = false;
  for (var i = 0; i < st.length; i++) {
     var r=document.getElementsByName("a" + i);
     if (r[0].checked) {
      // if (!f) index = i;
      // f = true;
      console.log("Выбран лист: " + st[i]);
      indexs.push(i);
     }
  }
  recountMorfing(0);
  t = 0;
  timer = setTimeout(function tick() {
    if (t + step >= 1) {
      if (index + 1 >= indexs.length) index = -1;
      index++;
      recountMorfing(index);
      t = 0;
    }
    t += step;
    showMorfingLists(t);
    timer = setTimeout(tick, 5);
  }, 5);
}

function recountMorfing(index){
  // console.log(index);
  var listArrays = readCookie("ListArrays");
  var st = listArrays.split(',');
  tempList = [];
  morfingMoveElements = [];
  nextList = [];
  mainArray = [];
  var tempListName = st[indexs[index]];
  var nextListName;
  // console.log(tempListName);
  // console.log(nextListName);
  if (indexs.length == index + 1) {
    nextListName = st[indexs[0]];
  }
  else nextListName = st[indexs[index+1]];
  var tmp = document.getElementById("info");
  tmp.innerHTML = "Морфинг от листа: " + tempListName + " к листу: " + nextListName;
  var stroke = readCookie(tempListName);
  var arrayList = StringToArray(stroke); 
  var stroke2 = readCookie(nextListName);
  var arrayList2 = StringToArray(stroke2);  
  // console.log(stroke);
  // console.log(stroke2);
  var morfIndexs = [];
  var usl = false;
  for (var i = 0;i < arrayList.length; i++) {
    var tmp = arrayList[i];
    if (tmp instanceof Triangle) console.log("tmp");
    var find = false;
    for(var j = 0; j < arrayList2.length; j++) {
      var tmp2 = arrayList2[j];
      if (tmp2 instanceof Triangle) console.log("tmp2");
      var cond = false;
      for (var k = 0;k < morfIndexs.length; k++){
        if (j == morfIndexs[k]) {
          cond = true;
          break;
        }
      }
      if ((tmp instanceof Line && tmp2 instanceof Line && !cond) ||
         (tmp instanceof Triangle && tmp2 instanceof Triangle && !cond) ||
         (tmp instanceof Rectangle && tmp2 instanceof Rectangle && !cond) ||
         (tmp instanceof Circle && tmp2 instanceof Circle && !cond)) {
        find = true;
        morfIndexs.push(j);
        tempList.push(tmp);
        nextList.push(tmp2);
        mainArray.push(tmp);
        mainArray.push(tmp2);
      }
    }
    if (!find) {
          arrayList.splice(i,1);
          i--;
    }
  }
  if (tempList.length == 0) {
        alert("Нет листов подходящих для морфинга");
        document.getElementById("win").style.display="none";
        $(".hideButtons").show();
        document.getElementById("showButton").src="Pictures/show.png";
        condShow = false;
        morfingMoveElements =[];
        mainArray = [];
        usl = true;
        var tmp = document.getElementById("info");
         tmp.innerHTML = "";
        repaint();
        timer = setTimeout(tick, 10000000);
       // t = 0;
        //index = 0;
        clearTimeout(timer);
        return;
      }
}

function showMorfingLists(t) {
  var arrayList = [];
  for (var i = 0; i < tempList.length; i++) {
      var object = tempList[i];
      var object2 = nextList[i];
      var result;

    if (object instanceof Circle) {
      var tmp = object;
      var tmp2 = object2;
      result = new Circle(new Point(
              tmp.pC.x *(1.-t) + tmp2.pC.x * t,
              tmp.pC.y *(1.-t) + tmp2.pC.y * t),
              tmp.radius * (1-t) + tmp2.radius * t);
    } else if (object instanceof Rectangle) {
      var tmp = object;
      var tmp2 =  object2;
      result = new Rectangle(new Point(
              tmp.p1.x *(1.-t) + tmp2.p1.x * t,
              tmp.p1.y *(1.-t) + tmp2.p1.y * t
      ),new Point(
              tmp.p3.x *(1.-t) + tmp2.p3.x * t,
              tmp.p3.y *(1.-t) + tmp2.p3.y * t
      ));
    } else if (object instanceof Line) {
      var tmp = object;
      var tmp2 = object2;
      result = new Line(new Point(
              tmp.p1.x *(1.-t) + tmp2.p1.x * t,
              tmp.p1.y *(1.-t) + tmp2.p1.y * t), new Point(
              tmp.p2.x *(1.-t) + tmp2.p2.x * t,
              tmp.p2.y *(1.-t) + tmp2.p2.y * t));
    } else if (object instanceof Triangle) {
      var tmp = object;
      var tmp2 =  object2;
      result = new Triangle(new Point(
              tmp.p1.x *(1.-t) + tmp2.p1.x * t,
              tmp.p1.y *(1.-t) + tmp2.p1.y * t
      ),new Point(
              tmp.p2.x *(1.-t) + tmp2.p2.x * t,
              tmp.p2.y *(1.-t) + tmp2.p2.y * t
      ),new Point(
              tmp.p3.x *(1.-t) + tmp2.p3.x * t,
              tmp.p3.y *(1.-t) + tmp2.p3.y * t
      ));
    }
    arrayList.push(result);
  }
  morfingMoveElements = arrayList;
  repaint();
}

function check(){
  var r=document.getElementsByName("mode");
  if(r[0].checked){
    console.log("Выбран локальный режим");
    local = true;
  } else {
  	console.log("Выбран глобальный режим");
  	local = false;
  }
}

function createCookie(name,value,days) {
        if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+escape(value)+expires+"; path=/";
}

function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length,c.length));
        }
        return null;
}

function eraseCookie(name) {
        createCookie(name,"",-1);
}

document.getElementById('draw').onmousemove = function(e) {
        if (condShow) return;
			  var x = e.offsetX==undefined?e.layerX:e.offsetX;
			  var y = e.offsetY==undefined?e.layerY:e.offsetY;
			  xCircle = x;
	          yCircle = y; 
	          nearElement = 0;
	          finishPoint = new Point(x,y);
	          if (mousedown && startPoint instanceof Point && finishPoint instanceof Point) {
	          	// if (mousedown)
	          	//   selectElement("Drag");
	          	  motion(finishPoint.x - startPoint.x, finishPoint.y - startPoint.y);
	          	  startPoint = finishPoint;
	          } else {
	              selectElement("Move");
	          }
	          repaint();
			  //console.log(x +'x'+ y);
			}
document.getElementById('draw').onclick = function(e) {
  if (condShow) return;
			  var x = e.offsetX==undefined?e.layerX:e.offsetX;
			  var y = e.offsetY==undefined?e.layerY:e.offsetY;
			  // console.log(x +'x'+ y);
			  startPoint = new Point(x, y);
	          xCircle = x;
	          yCircle = y;
	         
	          // for (var i= 0; i < selectedElements.length; i++) {
	          // 	console.log(selectedElements[i].toString());
	          // }
			}
document.getElementById('draw').onmousedown = function(e) {
  if (condShow) return;
  var x = e.offsetX==undefined?e.layerX:e.offsetX;
  var y = e.offsetY==undefined?e.layerY:e.offsetY;
  xCircle = x;
  yCircle = y;
  mousedown = true;
  startPoint = new Point(x, y);
  selectElement("Click");
  //console.log(x +'x'+ y + "mousedown");
}

document.getElementById('draw').onmouseup = function(e) {
  if (condShow) return;
  var x = e.offsetX==undefined?e.layerX:e.offsetX;
  var y = e.offsetY==undefined?e.layerY:e.offsetY;
  xCircle = x;
  yCircle = y;
  mousedown = false;
  startPoint = 0;
  finishPoint = 0;
  //console.log(x +'x'+ y + "mouseup");
}

document.getElementById('draw').ondblclick = function(e) {
  if (condShow) return;
  // if (e.which == 3) {
  	console.log("right");
  // }
}

document.getElementById('draw').onwheel = function(e) {
  if (condShow) return;
  var delta = e.deltaY || e.detail || e.wheelDelta;
  if (e.altKey) {
  	rotate(delta);
  }
  else scale(delta);
  repaint();
}

function scale(delta) {
	if (local) {
    	if (delta < 0) {
      	for (var i = 0; i < selectedElements.length; i++) {
            var element = selectedElements[i];
            var x = element.pC.x;
            var y = element.pC.y;
            element.shift(-x,-y);
            element.scale(1.1);
            element.shift(x,y);
        }
        } else {
      	  for (var i = 0; i < selectedElements.length; i++) {
            var element = selectedElements[i];
            var x = element.pC.x;
            var y = element.pC.y;
            element.shift(-x,-y);
            element.scale(0.9);
            element.shift(x,y);
           }
        }
    } else {
    	if (delta < 0) {
      	for (var i = 0; i < selectedElements.length; i++) {
            var element = selectedElements[i];
            var x = element.pC.x;
            var y = element.pC.y;
            element.scale(1.1);
        }
        } else {
      	  for (var i = 0; i < selectedElements.length; i++) {
            var element = selectedElements[i];
            var x = element.pC.x;
            var y = element.pC.y;
            element.scale(0.9);
           }
        }
    }
}

function rotate(delta) {
	var angle = 5.0 / 360. * 2.0 * Math.PI;
	if (local) {
	    if (delta < 0) {
	    		for (var i = 0; i < selectedElements.length; i++) {
            	var element = selectedElements[i];
            	var x = element.pC.x;
            	var y = element.pC.y;
            	element.shift(-x,-y);
            	element.rotate(angle);
            	element.shift(x,y);
            }
	    } else {
            for (var i = 0; i < selectedElements.length; i++) {
            	var element = selectedElements[i];
            	var x = element.pC.x;
            	var y = element.pC.y;
            	element.shift(-x,-y);
            	element.rotate(-angle);
            	element.shift(x,y);
            }
	    }
	} else {
		if (delta < 0) {
	        for (var i = 0; i < selectedElements.length; i++) {
            	var element = selectedElements[i];
            	var x = element.pC.x;
            	var y = element.pC.y;
            	element.rotate(angle);
            }
	    } else {
            for (var i = 0; i < selectedElements.length; i++) {
            	var element = selectedElements[i];
            	var x = element.pC.x;
            	var y = element.pC.y;
            	element.rotate(-angle);
            }
	    }
	}
}



function motion(dx, dy) {
        var point = new Point(dx,dy);
        for (var i = 0; i < selectedElements.length; i++) {
            selectedElements[i].shift(point);
        }
    }

function circleBySegment(x1, y1, x2, y2, x3, y3, radius) {
        var a = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
        var b = 2 * ((x2 - x1) * (x1 - x3) + (y2 - y1) * (y1 - y3));
        var c = x3 * x3 + y3 * y3 + x1 * x1 + y1 * y1 - 2 * (x3 * x1 + y3 * y1) - radius * radius;
        if (-b < 0) {
            return (c < 0);
        }
        if (-b < (2 * a)) {
            return (4 * a * c - b * b < 0);
        }
        return (a + b + c < 0);
    }	

function dist(p1, p2) {
  return Math.sqrt(Math.abs(p2.x-p1.x) * Math.abs(p2.x-p1.x) + Math.abs(p2.y - p1.y) * Math.abs(p2.y - p1.y)); 
} 

function belongsTrinagle(x,y, triangle) {
  var point4 = new Point(x,y);
  var point1 = triangle.p1;
  var point2 = triangle.p2;
  var point3 = triangle.p3;
  var s = square(point1, point2, point3);
  var s1 = square(point1, point2, point4);
  var s2 = square(point1, point3, point4);
  var s3 = square(point3, point2, point4);
  if (Math.abs(s1 + s2 + s3 - s) < 1) {
    return true;
  }
  return false;
}	

function square(p1,p2,p3) {
  var a = dist(p1,p2);
  var b = dist(p2,p3);
  var c = dist(p1,p3);
  var p = (a + b + c) / 2; // полупериметр
  return Math.sqrt(p * (p - a) * (p - b)  * (p - c));
}	

function belongsRectangle(x,y,rectangle) {
  var point1 = rectangle.p1;
  var point2 = rectangle.p3;
  if (point2.x > point1.x) {
    if (point2.y > point1.y) {
      if (x > point1.x && x < point2.x && y > point1.y && y < point2.y) return true;
    } else {
      if (x > point1.x && x < point2.x && y < point1.y && y > point2.y) return true;
    }
  } else {
    if (point2.y > point1.y) {
      if (x < point1.x && x > point2.x && y > point1.y && y < point2.y) return true;
    } else {
      if (x < point1.x && x > point2.x && y < point1.y && y > point2.y) return true;
    }
  }
  return false;
}

function belongsCircle(x,y,circle) {
  if (circle.radius/2 >= dist(circle.pC,new Point(x,y))) {
    return true;
  } 
  return false;
}

function selectElement(q) {
	if (q.localeCompare("Click") == 0) {
		selectedElements = [];
		selectedIndexs = [];
		select = false;
		repaint();
	}
  var tempMaxLayer = maxLayer;
  var ignorSelect = [];
  var ignoreLayers = [];
	for (var i = 0; i < mainArray.length; i++) {
		var object = mainArray[i];
    var contain = false;
    for (var g = 0; g < ignorSelect.length; g++) {
      if (ignorSelect[g] == i) {
        contain = true;
        break;
      }
    }
    if (contain) continue;
    var newStart = false;
    // console.log(object + " " + mainArray.length);
    if (object.getLayer() != tempMaxLayer) continue;
    else {
      // console.log(object.getLayer());
      ignorSelect.push(i);
      ignoreLayers.push(object.getLayer());
      newStart = true;
      var prevMaxLayer = -1;
      for (var g = 0; g < mainArray.length; g++) {
        var obj = mainArray[g];
        var cont2 = true;
        for (var j = 0; j < ignoreLayers.length; j++) {
          if (ignoreLayers[j] == obj.getLayer())  {
            cont2 = false;
            break;
          }
        }
        if (obj.getLayer() > prevMaxLayer && cont2) 
          prevMaxLayer = obj.getLayer();
      }
      tempMaxLayer = prevMaxLayer;
      // console.log(tempMaxLayer);
    }
		if (object instanceof Line) {
			if (circleBySegment(object.p1.x, object.p1.y, object.p2.x, object.p2.y, xCircle, yCircle, radiusCircle)) {
                     if (q.localeCompare("Move") == 0) {
                         if (selectedIndexs.length != 0 && i == selectedIndexs[0]) return;
                         nearElement = mainArray[i];
                         repaint();
                         break;
                     } else {
                        nearElement = 0;
                        selectedElements.push(mainArray[i]);
                        selectedIndexs.push(i);
                        repaint();
                        break;
                     }
                }
		} else if (object instanceof Triangle) {
                if (belongsTrinagle(xCircle,yCircle,object)) {
                     if (q.localeCompare("Move") == 0) {
                         if (selectedIndexs.length != 0 && i == selectedIndexs[0]) return;
                         nearElement = mainArray[i];
                         repaint();
                         break;
                     } else {
                        nearElement = 0;
                        selectedElements.push(mainArray[i]);
                        selectedIndexs.push(i);
                        repaint();
                        break;
                     }
                }
		} else if (object instanceof Rectangle) {
                if (belongsRectangle(xCircle,yCircle,object)) {
                  // console.log("yes");
                    if (q.localeCompare("Move") == 0) {
                        if (selectedIndexs.length != 0 && i == selectedIndexs[0]) return;
                        nearElement = mainArray[i];
                        repaint();
                        uslBreak = true;
                        break;
                    } else {
                        nearElement = 0;
                        selectedElements.push(mainArray[i]);
                        selectedIndexs.push(i);
                        uslBreak= true;
                        repaint();
                        break;
                    }
                }
		} else if (object instanceof Circle) {
      if (belongsCircle(xCircle,yCircle,object)) {
      	if (q.localeCompare("Move") == 0) {
              if (selectedIndexs.length != 0 && i == selectedIndexs[0]) return;
              nearElement = mainArray[i];
              repaint();
              break;
          } else {
              nearElement = 0;
              selectedElements.push(mainArray[i]);
              selectedIndexs.push(i);
              repaint();
              break;
          }
      }
		}
    if (newStart) i = -1;
	}
}

function onFrontLayer() {
  maxLayer++;
  for (var i = 0; i < selectedIndexs.length; i++) {
    mainArray[selectedIndexs[i]].setLayer(maxLayer);
  }
  repaint();
}

function onBackLayer() {
  maxLayer = 0;
  for (var i = 0; i < selectedIndexs.length; i++) {
    mainArray[selectedIndexs[i]].setLayer(1);
    for (var g = 0; g < mainArray.length; g++) {
      if (g != selectedIndexs[i]) mainArray[g].setLayer(mainArray[g].getLayer() + 1);
      if (mainArray[g].getLayer() > maxLayer) maxLayer = mainArray[g].getLayer()
    }
  }
  repaint();
}

function upLayer() {
  for (var i = 0; i < selectedIndexs.length; i++) {
    var object = mainArray[selectedIndexs[i]];
    var objectLayer = object.getLayer();
    var nextLayer = 999999;
    var nextIndex = 0;
    for (var g = 0; g < mainArray.length; g++) {
      if (mainArray[g].getLayer() > objectLayer && mainArray[g].getLayer() < nextLayer && g != selectedIndexs[i]) {
        nextLayer = mainArray[g].getLayer();
        nextIndex = g;
      }
    }
    mainArray[selectedIndexs[i]].setLayer(nextLayer);
    mainArray[nextIndex].setLayer(objectLayer);
    console.log(objectLayer + " " + nextLayer);
  }
  repaint();
}

function downLayer() {
  for (var i = 0; i < selectedIndexs.length; i++) {
    var object = mainArray[selectedIndexs[i]];
    var objectLayer = object.getLayer();
    var nextLayer = 0;
    var nextIndex = 0;
    var uslRun = false;
    for (var g = 0; g < mainArray.length; g++) {
      if (mainArray[g].getLayer() < objectLayer && mainArray[g].getLayer() > nextLayer && g != selectedIndexs[i]) {
        nextLayer = mainArray[g].getLayer();
        nextIndex = g;
        uslRun = true;
      }
    }
    if (uslRun) {
      mainArray[selectedIndexs[i]].setLayer(nextLayer);
      mainArray[nextIndex].setLayer(objectLayer);
    } else {
      return;
    }
  }
  repaint();
}



