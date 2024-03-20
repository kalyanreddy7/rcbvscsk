let teams = ['csk', 'rcb'];
let runs = [0,1,2,3,4,6,'W'];

const chosenTeam = teams[Math.floor(Math.random() * 2 )];

let team1Prog = [];
let team2Prog = [];

let team1Run = 0;
let team2Run = 0;

let wickCount1 = 0;
let wickCount2 = 0;

var startSecond = false;

function updateScore() {
    let rcbScores = document.getElementsByClassName("rcb-runs")[0].children;
    let cskscores = document.getElementsByClassName("csk-runs")[0].children;

    for(let i=0; i<team1Prog.length; i++) {
        cskscores[i].textContent = team1Prog[i];
    }
    for(let j=0; j<team2Prog.length; j++) {
        rcbScores[j].textContent = team2Prog[j];
    }
}


function playSuperOver() {
    var buttonValue = document.getElementById("play");
    var resultText = document.getElementById("res");
    var team1Score = document.getElementById("csk-score");
    var team2Score = document.getElementById("rcb-score");


    if(buttonValue.getAttribute("value") == "strike") {
        buttonValue.setAttribute("value", "play");
        buttonValue.textContent = chosenTeam + " Batting";
    } else {
        let chosenRun = runs[Math.floor(Math.random()*7)];
        console.log(startSecond);
        let run = chosenRun == "W" ? 0 : chosenRun;
        if(startSecond == false) {
            if(chosenTeam == "csk") {
                team1Prog.push(chosenRun);
                if(chosenRun == "W") {
                    wickCount1 += 1;
                }
                console.log(team1Prog, team2Prog);
                team1Run += run;
                team1Score.textContent = team1Run;
    
                if(team1Prog.length == 6 || wickCount1 == 2 ) {
                    console.log("Stop");
                    startSecond = true;
                    buttonValue.setAttribute("value", "strike");
                    console.log(buttonValue.getAttribute("value"));
                }
            } else if(chosenTeam == "rcb") {
                team2Prog.push(chosenRun);
                if(chosenRun == "W") {
                    wickCount2 += 1;
                }
                console.log(team1Prog, team2Prog);
                team2Run += run;
                team2Score.textContent = team2Run;
    
                if(team2Prog.length == 6 || wickCount2 == 2) {
                    console.log("Stop");
                    buttonValue.setAttribute("value", "strike");
                    console.log(buttonValue.getAttribute("value"));
                    startSecond = true;
                }
    
            }
            updateScore();
        }

        if(startSecond == true && buttonValue.getAttribute("value") == "play") {
            let nextTeam = teams.filter((team) => team != chosenTeam)[0];

            let chosenRun = runs[Math.floor(Math.random()*7)];
            let run = chosenRun == "W" ? 0 : chosenRun;
            resultText.textContent = "End of 1st Half";
            buttonValue.textContent = nextTeam + " Batting";

            if(buttonValue.getAttribute("value") == "strike") {
                buttonValue.setAttribute("value", "play");
                buttonValue.textContent = nextTeam + " Batting";
            }
            
        if(nextTeam == "csk") {

            if(chosenRun == "W") {
                wickCount1 += 1;
            }
            team1Run += run;
            team1Score.textContent = team1Run;
            team1Prog.push(chosenRun);

            if(team1Prog.length == 6 || wickCount1 == 2 || team1Run > team2Run ) {
                resultText.textContent = "csk Wins the Match";
                buttonValue.setAttribute("disabled", true);
            }

            if((team1Run < team2Run) && (team1Prog.length == 6 || wickCount1 == 2) ) {
                resultText.textContent = "rcb Wins the Match";
                buttonValue.setAttribute("disabled", true);
            }

            else if((team1Run == team2Run ) && (team1Prog.length == 6 || wickCount1 == 2)) {
                resultText.textContent = "Match Tied";
                buttonValue.setAttribute("disabled", true);
            }
        } else if(nextTeam == "rcb") {

            if(chosenRun == "W") {
                wickCount2 += 1;
            }
            
            team2Run += run;
            team2Score.textContent = team2Run;
            team2Prog.push(chosenRun);

            if(team2Prog.length == 6 || wickCount2 == 2 || team2Run > team1Run) {
                resultText.textContent = "rcb Wins the Match";
                buttonValue.setAttribute("disabled", true);
                
            }

            if((team2Run < team1Run) && (team2Prog.length == 6 || wickCount2 == 2) ) {
                resultText.textContent = "csk Wins the Match";
                buttonValue.setAttribute("disabled", true);
            }

            else if((team1Run == team2Run) && (team2Prog.length == 6 || wickCount2 == 2)) {
                resultText.textContent = "Match Tied";
                buttonValue.setAttribute("disabled", true);
            }

        }
        updateScore();
        }
        
    }
}