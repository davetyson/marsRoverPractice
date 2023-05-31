// Get a few selections from the DOM to start
const submit = document.querySelector("button");
const roverOutput = document.getElementsByClassName("output");

// Test information that I was using before I went to the user input method
// const mapEdge = [9, 9];
// const testPosition = [1, 1, "N"];
// const testInstructions = "MLMMRLMMMLMMRMMML";

// Rover class
class Rover{

    // Rover constructor
    constructor(position, instructions){

        // define initial user inputs and treat data
        let xPosition = position[0];
        let yPosition = position[1];
        let direction = position[2];
        let instructionsSplit = instructions.split("");

        // run through the list of instructions one by one and determine the appropriate movement (+1 to a position or change direction)
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

        // assign the rover coordinates to roverOutput each time the loop runs
        this.roverOutput = [xPosition, yPosition, direction];
    }

    // print the roverOutput coordinates to console and to the output h2 when this function is called
    printRoverOutput(){
        console.log(this.roverOutput);
        let stringifiedRoverOutput = this.roverOutput[0] + ', ' + this.roverOutput[1] + ', ' + this.roverOutput[2];
        roverOutput[0].innerHTML = stringifiedRoverOutput;
    }
}

// event listener for submit button on input form
submit.addEventListener('click', e => {
    e.preventDefault();

    // get the current user inputs
    const userMapEdge = document.getElementsByClassName("mapEdge")[0].value.trim();
    const userXCoordinate = document.getElementsByClassName("xCoordinate")[0].value.trim();
    const userYCoordinate = document.getElementsByClassName("yCoordinate")[0].value.trim();
    const userDirection = document.getElementsByClassName("direction")[0].value.trim();
    const userInstructions = document.getElementsByClassName("instructions")[0].value.trim();

    // set data to be used with new Rover child
    mapEdge[0] = userMapEdge;
    mapEdge[1] = userMapEdge;
    let assembledUserCoordinates = [0, 0, 0]
    assembledUserCoordinates[0] = userXCoordinate;
    assembledUserCoordinates[1] = userYCoordinate;
    assembledUserCoordinates[2] = userDirection;

    // create new Rover and print the final coordinates
    const testRover = new Rover(assembledUserCoordinates, userInstructions);
    testRover.printRoverOutput();
})

