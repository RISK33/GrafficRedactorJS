function Point(x, y) {
	if (arguments.length == 2) {
		this.x = x;
		this.y = y;
	}
	else {
		this.x = 0;
		this.y = 0;
	}

	this.toString = function() {
		return "X = " + this.x + ", Y = " + this.y;
	}

	this.shift = function(x, y) {
        if (arguments.length == 2) {
			this.x += x;
       		this.y += y;
		}
		else {
			this.x += x.x;
			this.y += x.y;
		}
    }

    this.scale = function(sc) {
        this.x *= sc;
        this.y *= sc;
    }

    this.rotate = function(angle) {
        var oldX = this.x;
        this.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        this.y = oldX * Math.sin(angle) + this.y * Math.cos(angle);
    }
}




