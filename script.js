// Get a few selections from the DOM and define some global variables
const submit = document.querySelector("button");
const roverOutput = document.getElementsByClassName("output");
let currentX;
let currentY;
let currentDir;
let assembledUserCoordinates = [0, 0, 0]

// function to determine start position of rover from user inputs
function startPosition(){
        const userXCoordinate = document.getElementsByClassName("xCoordinate")[0].value.trim();
        const userYCoordinate = document.getElementsByClassName("yCoordinate")[0].value.trim();
        const userDirection = document.getElementsByClassName("direction")[0].value.trim();
        assembledUserCoordinates[0] = userXCoordinate;
        assembledUserCoordinates[1] = userYCoordinate;
        assembledUserCoordinates[2] = userDirection;
}

// Class for creating new Maps
class Map{
    constructor(size){
        this.mapEdge = size;
    }
}

// Class for creating new Rovers
class Rover{

    // constructor function
    constructor(position){
        let xPosition = position[0];
        let yPosition = position[1];
        let direction = position[2];
        this.startPosition = [xPosition, yPosition, direction];
    }

    // set and print the output after a successful movement
    printRoverOutput(position){
        let stringifiedRoverOutput = position[0] + ', ' + position[1] + ', ' + position[2];
        roverOutput[0].innerHTML = stringifiedRoverOutput;
    }

    // print an error if there is an unsuccessful movement
    printRoverError(){
        roverOutput[0].innerHTML = 'There has been an error. Please check your rover inputs and try again.';
    }

    // see if the rover has reached the edge of the current map
    checkMapEdge(xPosition, yPosition, mapObj){
        if (xPosition > mapObj.mapEdge){
            currentX = 0;
        } else if (xPosition < 0){
            currentX = mapObj.mapEdge;
        }
        if (yPosition > mapObj.mapEdge){
            currentY = 0;
        } else if (yPosition < 0){
            currentY = mapObj.mapEdge;
        }
    }

    // move the rover forward by 1 unit in the appropriate direction
    moveForward(mapEdge, direction, xPosition, yPosition){
        switch (direction){
            case 'N':
                yPosition++;
                break;
            case 'S':
                yPosition--;
                break;
            case 'E':
                xPosition++;
                break;
            case 'W':
                xPosition--;
                break;
        }
        currentX = xPosition;
        currentY = yPosition;
        this.checkMapEdge(currentX, currentY, mapEdge);
    }

    // turn the rover to its new direction
    turnRover(instruction, direction){
        if (instruction === 'L'){
            switch (direction){
                case 'N':
                    currentDir = 'W';
                    break;
                case 'E':
                    currentDir = 'N';
                    break;
                case 'S':
                    currentDir = 'E';
                    break;
                case 'W':
                    currentDir = 'S';
                    break;
            }
        } else {
            switch (direction){
                case 'N':
                    currentDir = 'E';
                    break;
                case 'E':
                    currentDir = 'S';
                    break;
                case 'S':
                    currentDir = 'W';
                    break;
                case 'W':
                    currentDir = 'N';
                    break;
            }
        }
    }

    // function to move the rover when called with a set of instructions
    moveRover(mapEdge, instructions){
        currentX = this.startPosition[0];
        currentY = this.startPosition[1];
        currentDir = this.startPosition[2];
        if (!currentX || !currentY || !currentDir || mapEdge.mapEdge === ""){
            this.printRoverError();
        } else {
            for (let i = 0; i < instructions.length; i++){
                if (instructions[i] === 'M'){
                    this.moveForward(mapEdge, currentDir, currentX, currentY);
                } else if (instructions[i] === 'L' || instructions[i] === 'R'){
                    this.turnRover(instructions[i], currentDir);
                }
            }
            this.finalPosition = [currentX, currentY, currentDir];
            this.printRoverOutput(this.finalPosition);
        }
    }
}

// event listener for submit button on input form. creates map, rover, grabs inputs, and gives the instructions to the move rover function
submit.addEventListener('click', e => {
    e.preventDefault();
    startPosition();
    let instructions = document.getElementsByClassName("instructions")[0].value.trim().toUpperCase().split("");
    const testMap = new Map(document.getElementsByClassName("mapEdge")[0].value.trim())
    const testRover = new Rover(assembledUserCoordinates);
    testRover.moveRover(testMap, instructions);
})