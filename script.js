// Goal: to refactor this to declutter the if/else statements and lean more into OOP classes

// Thoughts:
// I'm going to try to work more with classes to help me lodge more of the "checking" logic with the actual objects, so that they are generated with the correct answers attached, and I don't have to check their value with if/else's later.
// Another goal is to break up the Rover movements so I can create one with initial coordinates, but then assign functions to the rover to deal with the movements. When the rover is created, it has its starting coordinates and all its functions to handle movement. Then we can call the movement function and pass in the instructions and loop through the instructions until we're at our destination. As we go through the different micro movements in the movement function (i.e. moving a coordinate forward or back by 1, changing direction), these can be other functions defined in the Rover class object that are called when needed (i.e. do we need to move the Y coordinate down by 1? call the yCoordMove function or something similar)

// Get a few selections from the DOM to start
const submit = document.querySelector("button");
const roverOutput = document.getElementsByClassName("output");

// define init mapEdge/user Coordinates
let mapEdge = [0, 0];
let assembledUserCoordinates = [0, 0, 0]

// Test information that I was using before I went to the user input method
// const mapEdge = [9, 9];
// const testPosition = [1, 1, "N"];
// const testInstructions = "MLMMRLMMMLMMRMMML";

// new grid size function
function gridSize(){
        const userMapEdge = document.getElementsByClassName("mapEdge")[0].value.trim();
        mapEdge[0] = userMapEdge;
        mapEdge[1] = userMapEdge;
        return mapEdge;
}

// new starting position function
function startPosition(){
        const userXCoordinate = document.getElementsByClassName("xCoordinate")[0].value.trim();
        const userYCoordinate = document.getElementsByClassName("yCoordinate")[0].value.trim();
        const userDirection = document.getElementsByClassName("direction")[0].value.trim();
        assembledUserCoordinates[0] = userXCoordinate;
        assembledUserCoordinates[1] = userYCoordinate;
        assembledUserCoordinates[2] = userDirection;
        return assembledUserCoordinates;
}

// new instructions function
function setInstructions(){
    let userInstructions = document.getElementsByClassName("instructions")[0].value.trim().toUpperCase();
    let instructionsSplit = userInstructions.split("");
    return instructionsSplit;
}

// Rover class
class Rover{

    // Rover constructor
    constructor(position){

        // rename positions for easier use
        let xPosition = position[0];
        let yPosition = position[1];
        let direction = position[2];

        this.startPosition = [xPosition, yPosition, direction];
        // return startPosition;

        // // run through the list of instructions one by one and determine the appropriate movement (+1 to a position or change direction)
        // for (let i = 0; i < instructions.length; i++){
        //     if (instructions[i] === "M"){
        //         if (direction === "N"){
        //             yPosition++;
        //             if (yPosition > mapEdge[1]){
        //                 yPosition = 0
        //             } else if (yPosition < 0){
        //                 yPosition = mapEdge[1];
        //             }
        //         } else if (direction === "S"){
        //                 yPosition--;
        //                 if (yPosition > mapEdge[1]){
        //                     yPosition = 0
        //                 } else if (yPosition < 0){
        //                     yPosition = mapEdge[1];
        //                 }
        //         } else if (direction === "E"){
        //             xPosition++;
        //             if (xPosition > mapEdge[0]){
        //                 xPosition = 0
        //             } else if (xPosition < 0){
        //                 xPosition = mapEdge[0];
        //             }
        //         } else if (direction === "W"){
        //             xPosition--;
        //             if (xPosition > mapEdge[0]){
        //                 xPosition = 0
        //             } else if (xPosition < 0){
        //                 xPosition = mapEdge[0];
        //             }
        //         }
        //     } else if (instructions[i] === "R" || instructions[i] === "L"){
        //         if (instructions[i] === "L"){
        //             if (direction === "N") {
        //                 direction = "W";
        //             } else if (direction === "E"){
        //                 direction = "N";
        //             } else if (direction === "S"){
        //                 direction = "E";
        //             } else {
        //                 direction = "S";
        //             }
        //         } else {
        //             if (direction === "N") {
        //                 direction = "E";
        //             } else if (direction === "E"){
        //                 direction = "S";
        //             } else if (direction === "S"){
        //                 direction = "W";
        //             } else {
        //                 direction = "N";
        //             }
        //         }
        //     }
        // }

        // // assign the rover coordinates to roverOutput each time the loop runs
        // this.roverOutput = [xPosition, yPosition, direction];
    }

    // print the roverOutput coordinates to console and to the output h2 when this function is called
    printRoverOutput(){
        let stringifiedRoverOutput = this.roverOutput[0] + ', ' + this.roverOutput[1] + ', ' + this.roverOutput[2];
        roverOutput[0].innerHTML = stringifiedRoverOutput;
    }
}

// event listener for submit button on input form
submit.addEventListener('click', e => {
    e.preventDefault();

    gridSize();
    startPosition();
    setInstructions();

    // I need to build this error handling in somewhere else but commenting out for now
    // if (!userMapEdge || !userXCoordinate || !userYCoordinate || !userDirection){
    //     roverOutput[0].innerHTML = "There has been an error. Please check your rover inputs and try again.";
    // } else {

    // create new Rover and print the final coordinates
    const testRover = new Rover(assembledUserCoordinates);
    console.log(testRover);
    testRover.printRoverOutput();
})
