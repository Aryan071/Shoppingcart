function addOptionsForLoserTeam(arrayOfObjects) {
  let sel = document.getElementById("t2Sel");
  document.getElementById("team2Selection").hidden = false;

  for (var i = 0; i < arrayOfObjects.length; i++) {
    var option = document.createElement("option");
    option.text = `${arrayOfObjects[i].name} (${arrayOfObjects[i].playingRole}) (Credit: ${arrayOfObjects[i].credit})`;
    option.value = arrayOfObjects[i].name;
    sel.add(option);
  }

  

  for (let i = 0; i < teamDetails.length; i++) {
    if (!teamDetails[i].isTossWinner) {
      document.getElementById("loser").textContent = teamDetails[i].name;
    }
  }
}

function displaySelectedPlayersForTossLoser() {
  
  let credit;
  let sel = document.getElementById("t2Sel");

  let selectedValue = sel.options[sel.selectedIndex].value;

  for (let i = 0; i < cricketers.length; i++) {
    if (cricketers[i].name == selectedValue) {
      credit = cricketers[i].credit;

      tossLosersTeam.push(cricketers[i]);

      if (validateTeamPlayers(tossLosersTeam) == false) {
        tossLosersTeam.pop();
        return;
      }

      sel.options[sel.selectedIndex].remove();

      let selected = document.getElementById("selected2");

      const tr = `<option value = '${cricketers[i].name}'> ${cricketers[i].name} (${cricketers[i].playingRole}) credit (${cricketers[i].credit})</option>`;

      selected.insertAdjacentHTML("afterbegin", tr);
      break;
    }
  }
  displayCredit(credit, document.getElementById("playerCredit2"));
  displayPlayerCount(1, document.getElementById("playerCount2"));
}

function removeOptionsForTossLoser() {
  let select = document.getElementById("t2Sel");
  let selected = document.getElementById("selected2");
  let creditPrint = document.getElementById("playerCredit2");
  let countPrint = document.getElementById("playerCount2");

  removePlayerFromOptions(select, selected, tossLosersTeam, creditPrint, countPrint);
}

function displayLoserTeamsDiv() {
  if (tossWinnersTeam.length == 11) {
    document.getElementById("team2Selection").hidden = false;
    document.getElementById("team1Selection").hidden = true;

    let team2OptionsArr = [];
    let isSelected;

    for (let i = 0; i < cricketers.length; i++) {
      isSelected = false;
      for (let j = 0; j < tossWinnersTeam.length; j++) {
        if (cricketers[i].name == tossWinnersTeam[j].name) {
          isSelected = true;
          break;
        }
      }
      if (!isSelected) {
        team2OptionsArr.push(cricketers[i]);
      }
    }
    addOptionsForLoserTeam(team2OptionsArr);
    saveTossWinnersTeam();
  } else {
    alert("Please select 11 players first!");
  }
}

function saveTossLosersTeam() {
 
  saveTeamDetails(-1, tossLosersTeam);
  displayCaptainSelectionMenu();
}

