function Triangle(p1, p2, p3) {
	this.p1 = p1;
	this.p2 = p2;
	this.p3 = p3;
    this.color = "#000000";
    this.pC = new Point((p1.x + p2.x + p3.x)/3,(p1.y + p2.y + p3.y)/3);
    this.type = "Треугольник";
    this.layer = 0;

    this.getLayer = function() {
        return this.layer;
    }

    this.setLayer = function(s) {
        this.layer = s;
    }

    this.toString = function() {
    	return "Треугольник: " + "n" + this.p1.toString() 
                                 + "n" + this.p2.toString() 
                                 + "n" + this.p3.toString()
                                 + "n" + this.color  
                                 + "n" + this.layer;
   }

    this.getColor = function() {
        return this.color;
    }

    this.setColor = function(s) {
        this.color = s;
    }
     
	this.shift = function(x, y) {
        if (arguments.length == 2) {
			this.p1.shift(x, y);
            this.p2.shift(x, y);
            this.p3.shift(x, y);
            this.pC.shift(x, y);
		}
		else {
			this.p1.shift(x.x, x.y);
            this.p2.shift(x.x, x.y);
            this.p3.shift(x.x, x.y);
            this.pC.shift(x.x, x.y);
		}
    }

    this.scale = function(sc) {
        this.p1.scale(sc);
        this.p2.scale(sc);
        this.p3.scale(sc);
        this.pC.scale(sc);
    }

    this.rotate = function(angle) {
        this.p1.rotate(angle);
        this.p2.rotate(angle);
        this.p3.rotate(angle);
        this.pC.rotate(angle);
    }
}




