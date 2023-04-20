function addOptionsForWinnerTeam(arrayOfObjects) {
  let sel = document.getElementById("t1Sel");
  document.getElementById("team1Selection").hidden = false;

  for (var i = 0; i < arrayOfObjects.length; i++) {
    var option = document.createElement("option");
    option.text = `${arrayOfObjects[i].name} (${arrayOfObjects[i].playingRole}) (Credit: ${arrayOfObjects[i].credit})`;
    option.value = arrayOfObjects[i].name;
    sel.add(option);
  }



  for (let i = 0; i < teamDetails.length; i++) {
    if (teamDetails[i].isTossWinner) {
      document.getElementById("winner").textContent = teamDetails[i].name;
    }
  }
}

function displayOption() {
  if (teamDetails.length == 0) {
    alert("please toss first")

  } else {
    addOptionsForWinnerTeam(cricketers);
    document.getElementById("toss").remove();
  }
}

function displaySelectedPlayersForTossWinner() {

  let credit;
  let sel = document.getElementById("t1Sel");

  let selectedValue = sel.options[sel.selectedIndex].value;

  for (let i = 0; i < cricketers.length; i++) {
    if (cricketers[i].name == selectedValue) {
      credit = cricketers[i].credit;

      saveTossWinnersTeam.push(cricketers[i]);

      if (validateTeamPlayers(tossWinnersTeam) == false) {
        tossWinnersTeam.pop();
        return;
      }


    }
  }
  displayCredit(credit, document.getElementById("playerCredit"));
  displayPlayerCount(1, document.getElementById("playerCount"));
}

function displayLoserTeamsDiv() {
  if (tossWinnersTeam.length == 11) {
    
    saveTossWinnersTeam();
  } else {
    alert("Please select 11 players first!");
  }
}

let select = document.getElementById("t1Sel");
let selected = document.getElementById("selected");
let creditPrint = document.getElementById("playerCredit");
let countPrint = document.getElementById("playerCount");
function removeOptionsForTossWinner() {

  removePlayerFromOptions(select, selected, tossWinnersTeam, creditPrint, countPrint);
}

function saveTossWinnersTeam() {
 
    saveTeamDetails(1, tossWinnersTeam);
 

  
}

