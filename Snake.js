const canvas = document.getElementById("canvas");
const graphics = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const rows = 15;
const cols = 15;

let grid = [];

let snakePosition = 0;
let snake = [];
let updatedSnake = false;

let apple;

let direction = "right";

let reloading = false;

for (let i = 0; i < rows; i++) {
    grid.push([]);
    for (let j = 0; j < cols; j++) {
        grid[i].push(new Block(i*40, j*40));
    }
}

grid[7][7].occupied = true;

snake.push(new Snake(grid[7][7], 7, 7, true, "right", snakePosition));

let appleRow = random(0, 14);
let appleColumn = random(0, 14);

while (appleColumn == 7) {
    appleColumn = random(0, 14);
}

apple = new Apple(grid[appleRow][appleColumn], appleRow, appleColumn);

document.addEventListener("keydown", function(key) {
    if (snake.length == 1 && !updatedSnake) {
        if (key.keyCode == 37) {
            direction = "left";
        } else if (key.keyCode == 38) {
            direction = "up";
        } else if (key.keyCode == 39) {
            direction = "right";
        } else if (key.keyCode == 40) {
            direction = "down";
        }

        updatedSnake = true;
    } else if (snake.length > 1 && !updatedSnake) {
        if (direction == "left" || direction == "right") {
            if (key.keyCode == 38) {
                direction = "up";
                updatedSnake = true;
            } else if (key.keyCode == 40) {
                direction = "down";
                updatedSnake = true;
            }
        } else if (direction == "up" || direction == "down") {
            if (key.keyCode == 37) {
                direction = "left";
                updatedSnake = true;
            } else if (key.keyCode == 39) {
                direction = "right";
                updatedSnake = true;
            }
        }
    }
});

function addSnake() {
    snakePosition++;
    let item = snake[snake.length-1];
    let rowAdd = 0;
    let columnAdd = 0;

    if (item.direction == "left") {
        rowAdd = 1;
    } else if (item.direction == "up") {
        columnAdd = 1;
    } else if (item.direction == "right") {
        rowAdd = -1;
    } else if (item.direction == "down") {
        columnAdd = -1;
    }

    snake.push(new Snake(grid[item.row+rowAdd][item.column+columnAdd], item.row+rowAdd, item.column+columnAdd, false, item.direction, snakePosition));
}

function draw() {
    graphics.clearRect(0, 0, width, height);

    if (snake[0].cell == apple.cell) {
        for (let i = 0; i < snake.length; i++) {
            while (apple.cell == snake[i].cell) {
                appleRow = random(0, 14);
                appleColumn = random(0, 14);
                apple.cell = grid[appleRow][appleColumn];
            }
        }

        apple.row = appleRow;
        apple.column = appleColumn;
        apple.x = apple.cell.x+5;
        apple.y = apple.cell.y+5;

        addSnake();
    }

    apple.draw();
    
    /*for (let i = 0; i < snake.length; i++) {
        snake[i].draw();
        snake[i].move();
    } */

    for (let i = snake.length-1; i >= 0; i--) {
        snake[i].move();
        snake[i].draw();
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].draw();
        }
    }

    updatedSnake = false;

    if (snakePosition+1 == rows*cols && !reloading) {
        alert("You Win!");
        location.reload();
        reloading = true;
    }
}

setInterval(draw, 300);