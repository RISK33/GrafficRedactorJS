function Rectangle(p1, p2) {
    var points = [];
    this.pC = new Point((p1.x + p2.x)/2,(p1.y + p2.y)/2);
	this.p1 = p1;
	this.p2 = new Point(p2.x,p1.y);
	this.p3 = p2;
    this.p4 = new Point(p1.x,p2.y);
    points.push(this.p1);
    points.push(this.p2);
    points.push(this.p3);
    points.push(this.p4);
    this.width = Math.abs(p2.x - p1.x);
    this.heigth = Math.abs(p2.y - p1.y);
    this.type = "Прямоугольник";
    this.color = "#000000";
    this.layer = 0;

    this.getLayer = function() {
        return this.layer;
    }

    this.setLayer = function(s) {
        this.layer = s;
    }

    this.getPoint = function(i) {
        return points[i];
    } 

    this.getColor = function() {
        return this.color;
    }

    this.setColor = function(s) {
        this.color = s;
    }

    this.toString = function() {
    	return "Прямоугольник: " + "n" + this.p1.toString() 
                                 + "n" + this.p2.toString() 
                                 + "n" + this.p3.toString()
                                 + "n" + this.p4.toString()
                                 + "n" + this.color;
    }

	this.shift = function(x, y) {
        if (arguments.length == 2) {
			this.p1.shift(x, y);
            this.p2.shift(x, y);
            this.p3.shift(x, y);
            this.p4.shift(x, y);
            this.pC.shift(x, y);
		}
		else {
			this.p1.shift(x.x, x.y);
            this.p2.shift(x.x, x.y);
            this.p3.shift(x.x, x.y);
            this.p4.shift(x.x, x.y);
            this.pC.shift(x.x, x.y);
		}
    }

    this.scale = function(sc) {
        this.p1.scale(sc);
        this.p2.scale(sc);
        this.p3.scale(sc);
        this.p4.scale(sc);
        this.pC.scale(sc);
    }

    this.rotate = function(angle) {
        this.p1.rotate(angle);
        this.p2.rotate(angle);
        this.p3.rotate(angle);
        this.p4.rotate(angle);
        this.pC.rotate(angle);
    }
}




