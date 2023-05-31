const submit = document.querySelector("button");
const roverOutput = document.getElementsByClassName("output");


const mapEdge = [9, 9];
const testPosition = [1, 1, "N"];
const testInstructions = "MLMMRLMMMLMMRMMML";

class Rover{
    constructor(position, instructions){
        let xPosition = position[0];
        let yPosition = position[1];
        let direction = position[2];
        let instructionsSplit = instructions.split("");

        for (let i = 0; i < instructionsSplit.length; i++){
            if (instructionsSplit[i] === "M"){
                if (direction === "N"){
                    yPosition++;
                    if (yPosition > mapEdge[1]){
                        yPosition = 0
                    } else if (yPosition < 0){
                        yPosition = mapEdge[1];
                    }
                } else if (direction === "S"){
                        yPosition--;
                        if (yPosition > mapEdge[1]){
                            yPosition = 0
                        } else if (yPosition < 0){
                            yPosition = mapEdge[1];
                        }
                } else if (direction === "E"){
                    xPosition++;
                    if (xPosition > mapEdge[0]){
                        xPosition = 0
                    } else if (xPosition < 0){
                        xPosition = mapEdge[0];
                    }
                } else if (direction === "W"){
                    xPosition--;
                    if (xPosition > mapEdge[0]){
                        xPosition = 0
                    } else if (xPosition < 0){
                        xPosition = mapEdge[0];
                    }
                }
            } else {
                if (instructionsSplit[i] === "L"){
                    if (direction === "N") {
                        direction = "W";
                    } else if (direction === "E"){
                        direction = "N";
                    } else if (direction === "S"){
                        direction = "E";
                    } else {
                        direction = "S";
                    }
                } else {
                    if (direction === "N") {
                        direction = "E";
                    } else if (direction === "E"){
                        direction = "S";
                    } else if (direction === "S"){
                        direction = "W";
                    } else {
                        direction = "N";
                    }
                }
            }
        }
        this.roverOutput = [xPosition, yPosition, direction];
    }

    printRoverOutput(){
        console.log(this.roverOutput);
        let stringifiedRoverOutput = this.roverOutput[0] + ', ' + this.roverOutput[1] + ', ' + this.roverOutput[2];
        roverOutput[0].innerHTML = stringifiedRoverOutput;
    }
}

submit.addEventListener('click', e => {
    e.preventDefault();
    const userMapEdge = document.getElementsByClassName("mapEdge")[0].value;
    const userXCoordinate = document.getElementsByClassName("xCoordinate")[0].value;
    const userYCoordinate = document.getElementsByClassName("yCoordinate")[0].value;
    const userDirection = document.getElementsByClassName("direction")[0].value;
    const userInstructions = document.getElementsByClassName("instructions")[0].value;
    mapEdge[0] = userMapEdge;
    mapEdge[1] = userMapEdge;
    let assembledUserCoordinates = [0, 0, 0]
    assembledUserCoordinates[0] = userXCoordinate;
    assembledUserCoordinates[1] = userYCoordinate;
    assembledUserCoordinates[2] = userDirection;
    const testRover = new Rover(assembledUserCoordinates, userInstructions);
    testRover.printRoverOutput();
})

