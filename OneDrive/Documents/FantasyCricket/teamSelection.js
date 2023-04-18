
let teamIndex;
let playersArray;

function setTeamsIndex(isTossWinner) {
  let obj = getTossWinnerAndLosersIndex();
  teamIndex = isTossWinner == 1 ? obj.tossWinnerIndex : obj.tossLoserIndex;
}

function setPlayersDetails(isTossWinner) {
  playersArray = isTossWinner == 1 ? players : getRemainingPlayers(tossWinnersTeam);
}

function addOptions(array) {
  let sel = document.getElementById("t1Sel");
  document.getElementById("team1Selection").hidden = false;

  for (var i = 0; i < array.length; i++) {
    var option = document.createElement("option");
    option.text = `${array[i].name} (${array[i].playingRole}) (Credit: ${array[i].credit})`;
    option.value = array[i].name;
    sel.add(option);
  }
}

function displayTeamsName() {
  getById("winner").textContent = teamDetails[teamIndex].name;
}

function displayOption(isTossWinner) {
  getById("toss").remove();
  getById("loadCap").hidden = true;
  getById("team1Selection").hidden = false;
  setTeamsIndex(isTossWinner);
  setPlayersDetails(isTossWinner);
  addOptions(playersArray);
  displayTeamsName();
}


function storeSelectedPlayer(playersName) {
  let player = players.find((player) => player.name == playersName);

  tossWinnersTeam.push(player);
  if (validateTeamPlayers(tossWinnersTeam)) {
    return true;
  } else {
    tossWinnersTeam.pop();
    return false;
  }
}

function removeSelectedPlayerFromDisplay(location) {
  location.options[location.selectedIndex].remove();
}

function displayRemovedPlayerToSelectionList(playerName, location) {
  let player = players.find((obj) => obj.name == playerName);
  const playersOption = generateOptions(player);
  location.insertAdjacentHTML("afterbegin", playersOption);
}

function getPlayersCredit(playerName) {
  let player = players.find((obj) => obj.name == playerName);
  return player.credit;
}

function playerSelector() {
  let select = getById("t1Sel");
  let SelectedPlayers = getById("selected");
  let playerName = select.options[select.selectedIndex].value;

  if (storeSelectedPlayer(playerName)) {
    removeSelectedPlayerFromDisplay(select);
    displayRemovedPlayerToSelectionList(playerName, SelectedPlayers);
    updateCreditAndCount(getPlayersCredit(playerName), 1);
  }
}

function updateCreditAndCount(credit, count) {
  let currentCredit = getById("playerCredit").textContent;
  let currentCount = getById("playerCount").textContent;

  getById("playerCredit").textContent = credit + +currentCredit;
  getById("playerCount").textContent = count + +currentCount;
}

function storeTeam() {
  teamDetails[teamIndex].teamMembers = tossWinnersTeam;
}

function playerRemover() {
  let select = getById("selected");
  let SelectedPlayers = getById("t1Sel");
  let playerName = select.options[select.selectedIndex].value;
  
  removeSelectedPlayerFromList(playerName);
  removeSelectedPlayerFromDisplay(select);
  displayRemovedPlayerToSelectionList(playerName, SelectedPlayers);
  updateCreditAndCount(-getPlayersCredit(playerName), -1);
}

function removeSelectedPlayerFromList(name) {
  let player = tossWinnersTeam.find((obj) => obj.name == name);
  tossWinnersTeam.splice(tossWinnersTeam.indexOf(player), 1);
}

function resetTeamSelectionMenu() {
  removeOptions(getById("t1Sel"));
  removeOptions(getById("selected"));
  getById("playerCount").textContent = 0;
  getById("playerCredit").textContent = 0;
  tossWinnersTeam = [];
}

function getRemainingPlayers(arr) {
  let remainingPlayers = players.filter((main) => {
    return !arr.find((sub) => {
      return sub.name == main.name;
    });
  });
  return remainingPlayers;
}

function removeOptions(selectElement) {
  let length = selectElement.options.length - 1;
  for (let i = length; i >= 0; i--) {
    selectElement.remove(i);
  }
}

function displayRemainingPlayers(isTossWinner) {
  getById("loadCap").hidden = false;
  getById("teamSaver").hidden = true;
  storeTeam();
  setTeamsIndex(isTossWinner);
  setPlayersDetails(isTossWinner);
  resetTeamSelectionMenu();
  addOptions(playersArray);
  displayTeamsName();
}

function loadCaptainSelection() {
  
  storeTeam();
  displayCaptainSelectionMenu();
}
