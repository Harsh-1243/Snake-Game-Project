// conststants and variables declaration

const Snake_Head = document.querySelector(".snake-head");

const Game_Board = document.querySelector(".board");

const CurrentScore = document.querySelector(".current-score");

const HiScore = document.querySelector(".high-score");

let SnakeDir = {

    Xcor: 0,
    Ycor: 0

};

let FoodDir = {

    Xcor: 5,
    Ycor: 9

};

let Snake_Segments = [

    {//snake head

        Xcor: 10,
        Ycor: 8

    }


];

let Score = 0; 

let HighScore = 0;


//function definitions


function IsCollideToSegments() {

    //checking if snake's head crashing to its own segments or not

    for(let i = 1; i < Snake_Segments.length; i++){

        if(Snake_Segments[i].Xcor === Snake_Segments[0].Xcor && Snake_Segments[i].Ycor === Snake_Segments[0].Ycor){

            return true;

        }

    }

    //checking if snake's head crashing to the wall or not

    if(Snake_Segments[0].Xcor > 13 || Snake_Segments[0].Xcor <= 0 || Snake_Segments[0].Ycor > 17 || Snake_Segments[0].Ycor <= 0){

        console.log("CRASHED A WALL !");

        return true;

    }

}

function GenRanFoodCor() {

    //generating random X and Y coordinates for food direction

    let Xran = Math.round(Math.random() * 12);

    let Yran = Math.round(Math.random() * 16);

    console.log(Xran,Yran);

    return { Xcor: ++Xran, Ycor: ++Yran };

}

function GameEngine() {

    //what if snake colides

    if (IsCollideToSegments()) {

        Game_Board.innerHTML = "";
        FoodDir = { Xcor: 5, Ycor: 9 };
        SnakeDir = { Xcor: 0, Ycor: 0 };
        Snake_Segments = {
            Xcor:10,
            Ycor:8
        }
        clearInterval(FunCall);
        
        if (localStorage.getItem("High_Score") < Score) {

            HighScore = Score;

            localStorage.setItem("High_Score",JSON.stringify(HighScore));
            
        }

    }
  

    //if snake eats the food then...

    if (FoodDir.Xcor === Snake_Segments[0].Xcor && FoodDir.Ycor === Snake_Segments[0].Ycor) {

        FoodDir = GenRanFoodCor();//or we have to use {...GenRanFoodCor()} so there would not be reference problem

        Snake_Segments.unshift({

            Xcor: Snake_Segments[0].Xcor + SnakeDir.Ycor,
            Ycor: Snake_Segments[0].Ycor + SnakeDir.Xcor

           
        })

        Score++;
        CurrentScore.innerHTML = Score;
       
    }


    //move the snake segements

    for (let i = Snake_Segments.length - 1; i > 0; i--) {

        Snake_Segments[i] = { ...Snake_Segments[i - 1] };

    }

    //moving the head part

    Snake_Segments[0].Xcor += SnakeDir.Ycor;
    Snake_Segments[0].Ycor += SnakeDir.Xcor;



    //displaying the food and the snake on game board


    //making game board empty before displaying food and snake segments
    Game_Board.innerHTML = "";
    

    //displaying all snake segments on game board
    Snake_Segments.forEach((val, idx) => {


        let SnakeEle = document.createElement("div");
        SnakeEle.style.gridRowStart = val.Xcor;
        SnakeEle.style.gridColumnStart = val.Ycor;

        if (idx === 0) {

            SnakeEle.classList.add("snake-head");

        }
        else {

            SnakeEle.classList.add("snake-body");

        }

        Game_Board.append(SnakeEle);


    });

    //displaying the food board
    
    let FoodEle = document.createElement("div");
    FoodEle.style.gridRowStart = FoodDir.Xcor;
    FoodEle.style.gridColumnStart = FoodDir.Ycor;
    FoodEle.classList.add("food");
    Game_Board.append(FoodEle);


}

//adding the event listner the keyboard for user input 

document.addEventListener("keydown", (key) => {


    if (key.key === "ArrowUp") {

        SnakeDir.Xcor = 0;

        SnakeDir.Ycor = -1;

    } else if (key.key === "ArrowDown") {

        SnakeDir.Xcor = 0;

        SnakeDir.Ycor = 1;

    } else if (key.key === "ArrowRight") {

        SnakeDir.Xcor = 1;

        SnakeDir.Ycor = 0;

    } else if (key.key === "ArrowLeft") {

        SnakeDir.Xcor = -1;

        SnakeDir.Ycor = 0;

    }


});

//setting high score in game

if(HighScore === null){

    HighScore = 0;

    localStorage.setItem("High_Score",JSON.stringify(HighScore));


}

HiScore.innerHTML = localStorage.getItem("High_Score");

//setting time interval for calling the GameEngine Function according to the mentioned time

let FunCall = setInterval(GameEngine, 200); 