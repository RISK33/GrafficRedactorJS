function Line(p1, p2) {
	this.p1 = p1;
	this.p2 = p2;
    this.pC = new Point((p1.x + p2.x) /2,(p1.y + p2.y)/2);
    this.type = "Отрезок";
    this.color = "#000000";
    this.layer = 0;

    this.getLayer = function() {
        return this.layer;
    }

    this.setLayer = function(s) {
        this.layer = s;
    }

    this.toString = function() {
    	return "Отрезок: " + "n" + this.p1.toString() 
    	                   + "n" + this.p2.toString()
                           + "n" + this.color;
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
            this.pC.shift(x, y);
		}
		else {
			this.p1.shift(x.x, x.y);
            this.p2.shift(x.x, x.y);
            this.pC.shift(x.x, x.y);
		}
    }

    this.scale = function(sc) {
        this.p1.scale(sc);
        this.p2.scale(sc);
        this.pC.scale(sc);
    }

    this.rotate = function(angle) {
        this.p1.rotate(angle);
        this.p2.rotate(angle);
        this.pC.rotate(angle);
    }
}




