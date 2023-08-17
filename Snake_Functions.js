function random(min, max) {
	return Math.floor(Math.random()*(max-min+1))+min;
}

function Block(x, y) {
	this.x = x;
	this.y = y;
	this.w = 40;
	this.h = 40;
	this.occupied = false;
	this.snakePosition = "";
}

Block.prototype.draw = function() {
	graphics.strokeStyle = "white";
	graphics.strokeRect(this.x, this.y, this.w, this.h);
}

function Snake(cell, row, column, head, direction, position) {
	this.cell = cell;
	this.lastCell = "";
	this.row = row;
	this.column = column;
	this.head = head;
	this.x = cell.x+2.5;
	this.y = cell.y+2.5;
	this.w = 35;
	this.h = 35;
	this.direction = direction;
	this.position = position;
}

Snake.prototype.draw = function() {
	graphics.fillStyle = "white";
	if (this.head) {
		graphics.fillStyle = "green";
	}
	graphics.fillRect(this.x, this.y, this.w, this.h);
}

Snake.prototype.move = function() {
	this.lastCell = this.cell;

	if (this.head) {
		this.direction = direction;
		if (((direction == "left" && this.row <= 0) || (direction == "right" && this.row >= grid.length-1) || (direction == "up" && this.column <= 0) || (direction == "down" && this.column >= grid.length-1)) && !reloading)  {
			alert("You Lose!");
			location.reload();
			reloading = true;
		}

		if (direction == "left" && this.row > 0) {
			this.cell.occupied = false;
			this.row--;
		} else if (direction == "right" && this.row < grid.length-1) {
			this.cell.occupied = false;
			this.row++;
		} else if (direction == "up" && this.column > 0) {
			this.cell.occupied = false;
			this.column--;
		} else if (direction == "down" && this.column < grid.length-1) {
			this.cell.occupied = false;
			this.column++;
		}
	} else {
		this.direction = snake[this.position-1].direction;
		this.cell.occupied = false;
		this.row = snake[this.position-1].row;
		this.column = snake[this.position-1].column;
	}

	this.cell = grid[this.row][this.column];
	this.cell.snakePosition = this.position;
	
	if (this.cell.occupied && this.cell != this.lastCell && this.cell.snakePosition != 1 && snake.length > 4 && !reloading) {
		alert("You Lose!");
		location.reload();
		reloading = true;
	} 

	this.x = this.cell.x+2.5;
	this.y = this.cell.y+2.5;
	this.cell.occupied = true;
}

function Apple(cell, row, column) {
	this.cell = cell;
	this.row = row;
	this.column = column;
	this.x = cell.x+5;
	this.y = cell.y+5;
	this.w = 30;
	this.h = 30;
}

Apple.prototype.draw = function() {
	graphics.fillStyle = "red";
	graphics.fillRect(this.x, this.y, this.w, this.h);
}