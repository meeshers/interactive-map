let makePolitician = function(name,color){
  let politician = {};
  politician.name = name;
  politician.electionResult = null;
  politician.votes = 0;
  politician.color = color
  politician.totalVotes =function(){
    for(let i = 0; i < this.electionResult.length; i++){
      this.votes += this.electionResult[i];
    }
  }
  return politician;
}

// Create politician objects
let vivi = makePolitician("Vivi",[245, 141, 136]);
let baymax = makePolitician("Baymax",[132, 17, 11]);

// Array of results
vivi.electionResult = [5,1,7,2,33,6,4,2,1,14,8,3,1,11,11,0,5,3,3,3,7,4,8,9,3,7,2,2,4,2,8,3,15,15,2,12,0,4,13,1,3,2,8,21,3,2,11,1,3,7,2];
baymax.electionResult = [4,2,4,4,22,3,3,1,2,15,8,1,3,9,0,6,1,5,5,1,3,7,8,1,3,3,1,3,2,2,6,2,14,0,1,6,7,3,7,3,6,1,3,17,3,1,2,11,2,3,1];

// Fix certain state results
vivi.electionResult[9] = 1;
baymax.electionResult[9] = 28;
vivi.electionResult[4] = 17;
baymax.electionResult[4] = 38;
vivi.electionResult[43] = 11;
baymax.electionResult[43] = 27;

// Add up votes
vivi.totalVotes();
baymax.totalVotes();

// Determine the winner
let winner = "";

if(vivi.votes > baymax.votes){
  winner = vivi.name;
} else if(vivi.votes < baymax.votes){
  winner = baymax.name;
} else {
  winner = "draw";
}

// Sets the state results with state as a parameter
function setStateResults(state){
  theStates[state].winner = null;
  
  
  if(vivi.electionResult[state] > baymax.electionResult[state]) {
    theStates[state].winner = vivi;
  } else if (vivi.electionResult[state] < baymax.electionResult[state]) {
    theStates[state].winner = baymax;
  }
  
  let stateWinner = theStates[state].winner;
  if(stateWinner !== null){
    theStates[state].rgbColor = stateWinner.color;
  } else {
    theStates[state].rgbColor = [11,32,57];
  }
  
  let stateInfo = document.getElementById('stateResults');
  let header = stateInfo.children[0];
  let body = stateInfo.children[1];
  let stateName = header.children[0].children[0];
  let abbrev = header.children[0].children[1];
  let candidate1 = body.children[0].children[0];
  let candidate2 = body.children[1].children[0];
  let candidate1Results = body.children[0].children[1];
  let candidate2Results = body.children[1].children[1];
  let winnersName = body.children[2].children[1];
  
  stateName.innerText = theStates[state].nameFull;
  abbrev.innerText = "(" + theStates[state].nameAbbrev + ")";
  candidate1.innerText = vivi.name;
  candidate2.innerText = baymax.name;
  candidate1Results.innerText = vivi.electionResult[state];
  candidate2Results.innerText = baymax.electionResult[state];
  
  if(theStates[state].winner === null){
    winnersName.innerText = "DRAW";
  } else {
    winnersName.innerText = theStates[state].winner.name;
  }
}

let countryInfo = document.getElementById('countryResults');
let row = countryInfo.children[0].children[0];

row.children[0].innerText = vivi.name;
row.children[1].innerText = vivi.votes;
row.children[2].innerText = baymax.name;
row.children[3].innerText = baymax.votes;
row.children[5].innerText = winner;