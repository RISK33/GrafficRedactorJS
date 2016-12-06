function Circle(pC, radius) {
	this.pC = pC;
    this.radius = radius;
	this.type = "Окружность";
    this.color = "#000000";
    this.layer = 0;

    this.getLayer = function() {
        return this.layer;
    }

    this.setLayer = function(s) {
        this.layer = s;
    }

    this.toString = function() {
    	return "Окружность: " + "n" + "X = " + pC.x + ", Y = " + pC.y 
                              + "n" + this.radius
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
			this.pC.shift(x,y);
		}
		else {
			 this.pC.shift(x);
		}
    }

    this.scale = function(sc) {
        this.pC.scale(sc);
        this.radius *= sc;
    }

    this.rotate = function(angle) {
        this.pC.rotate(angle);
    }
}




