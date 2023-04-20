let tossWinnersIndex;
let tossLosersIndex;

function captRadioGenerator(position, obj) {
  let teamName = `<p>Captain selection for team : ${obj.name}</p>`;
  let arr = obj.teamMembers;
  position.insertAdjacentHTML("beforebegin", teamName);

  for (let i = 0; i < arr.length; i++) {
    let options = `<option value="${arr[i].name}"> ${arr[i].name} - (${arr[i].playingRole}) - (${arr[i].credit}) </option>`;
    position.insertAdjacentHTML("beforeend", options);
  }
  displayTeamName();
}

function displayCaptainSelectionMenu() {
  if (teamDetails[teamIndex].teamMembers.length == 11) {
    document.getElementById("captainSelection").hidden = false;
    document.getElementById("team1Selection").hidden = true;
    let indexes = getTossWinnerAndLosersIndex();
    tossWinnersIndex = indexes.tossWinnerIndex;
    tossLosersIndex = indexes.tossLoserIndex;
    captRadioGenerator(document.getElementById("winnersCap"), teamDetails[tossWinnersIndex]);
    captRadioGenerator(document.getElementById("losersCap"), teamDetails[tossLosersIndex]);
  } else {
    alert("Please select 11 players first");
  }
}

function displayTeamName() {
  document.getElementById("t1CapLabel").innerHTML = `${teamDetails[tossWinnersIndex].name}'s Captain`;
  document.getElementById("t1ViceCapLabel").innerHTML = `${teamDetails[tossWinnersIndex].name}'s Vice-Captain`;
  document.getElementById("t2CapLabel").innerHTML = `${teamDetails[tossLosersIndex].name}'Captain`;
  document.getElementById("t2ViceCapLabel").innerHTML = `${teamDetails[tossLosersIndex].name}'Vice-captain`;
}

function displayCaptain(position, name) {
  position.innerHTML = name;
}

function removePlayerFromList(position) {
  let select = position;
  let selectedValue = select.options[select.selectedIndex].value;
  select.options[select.selectedIndex].remove();
  return selectedValue;
}

function assignRoles(role, winnerPos, loserPos) {
  let tossWinnerCap = removePlayerFromList(document.getElementById("winnersCap"));
  let tossLoserCap = removePlayerFromList(document.getElementById("losersCap"));
  displayCaptain(winnerPos, tossWinnerCap);
  displayCaptain(loserPos, tossLoserCap);

  teamDetails[tossWinnersIndex].teamMembers[findIndexOfPlayer(tossWinnersIndex, tossWinnerCap)][
    role
  ] = true;
  teamDetails[tossLosersIndex].teamMembers[findIndexOfPlayer(tossLosersIndex, tossLoserCap)][
    role
  ] = true;

  hideCapAndViceCapButton(role);
}

function findIndexOfPlayer(index, name) {
  let playersIndex = teamDetails[index].teamMembers.findIndex((obj) => {
    return obj.name == name;
  });
  return playersIndex;
}

function hideCapAndViceCapButton(role) {
  if (role == "isCaptain") {
    document.getElementById("captainBtn").hidden = true;
  } else if (role == "isViceCaptain") {
    document.getElementById("viceCaptainBtn").hidden = true;
  }
}

function addPropertyToObj(prop, count) {
  obj[count][prop] = true;
}

function findPlayersIndex(arr, name) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name == name) {
      return i;
    }
  }
}

function assignCaptains() {
  let tossWinnerTeam = document.getElementById("t1Cap");
  let tossLoserTeam = document.getElementById("t2Cap");
  assignRoles("isCaptain", tossWinnerTeam, tossLoserTeam);
}

function assignViceCaptains() {
  let tossWinnerTeam = document.getElementById("t1ViceCap");
  let tossLoserTeam = document.getElementById("t2ViceCap");
  assignRoles("isViceCaptain", tossWinnerTeam, tossLoserTeam);
}

function resetCaptainSelection() {
  resetTeamDetails();
  resetSelectMenu();
  resetHtml();
}

function resetTeamDetails() {
  for (let i = 0; i < teamDetails.length; i++) {
    for (let j = 0; j < 11; j++) {
      if (teamDetails[i].teamMembers[j].isCaptain || teamDetails[i].teamMembers[j].isViceCaptain) {
        delete teamDetails[i].teamMembers[j].isCaptain;
        delete teamDetails[i].teamMembers[j].isViceCaptain;
      }
    }
  }
}

function resetSelectMenu() {
  if (!document.getElementById("t1Cap").innerHTML == "") {
    addPlayerToList(document.getElementById("t1Cap").innerHTML, tossWinnersIndex, document.getElementById("winnersCap"));
    addPlayerToList(document.getElementById("t2Cap").innerHTML, tossLosersIndex, document.getElementById("losersCap"));
  }
  if (!document.getElementById("t1ViceCap").innerHTML == "") {
    addPlayerToList(document.getElementById("t1ViceCap").innerHTML, tossWinnersIndex, document.getElementById("winnersCap"));
    addPlayerToList(document.getElementById("t2ViceCap").innerHTML, tossLosersIndex, document.getElementById("losersCap"));
  }
}

function addPlayerToList(name, index, position) {
  let option = generateOptions(getPlayersObj(name, teamDetails[index].teamMembers));
  position.insertAdjacentHTML("afterbegin", option);
}

function resetHtml() {
  document.getElementById("t1Cap").innerHTML = "";
  document.getElementById("t2Cap").innerHTML = "";
  document.getElementById("t1ViceCap").innerHTML = "";
  document.getElementById("t2ViceCap").innerHTML = "";
  document.getElementById("captainBtn").hidden = false;
  document.getElementById("viceCaptainBtn").hidden = false;
}

function generateOptions(obj) {
  return `<option value="${obj.name}"> ${obj.name} - (${obj.playingRole}) - (${obj.credit}) </option>`;
}

function getPlayersObj(name, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (name == arr[i].name) {
      return arr[i];
    }
  }
}

function validateCapAndViceCap(index) {
  let teamCap = false;
  let teamViceCap = false;

  for (let i = 0; i < teamDetails[index].teamMembers.length; i++) {
    if (teamDetails[index].teamMembers[i].isCaptain) {
      teamCap = true;
    }
    if (teamDetails[index].teamMembers[i].isViceCaptain) {
      teamViceCap = true;
    }
  }
  if (!teamCap || !teamViceCap) {
    alert(`select Captain & vice-captain first`);
    return false;
  }
  return true;
}
