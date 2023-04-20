let teamIndex;
let playersArray;

function setTeamsIndex(isTossWinner) {
  let obj = getTossWinnerAndLosersIndex();
  teamIndex = isTossWinner == 1 ? obj.tossWinnerIndex : obj.tossLoserIndex;
}

function setPlayersDetails(isTossWinner) {
  playersArray = isTossWinner == 1 ? cricketers : getRemainingPlayers(tossWinnersTeam);
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

  document.getElementById("winner").textContent = teamDetails[teamIndex].name;
}

function displayOption(isTossWinner) {
  document.getElementById("toss").remove();
  document.getElementById("loadCap").hidden = true;
  document.getElementById("team1Selection").hidden = false;
  setTeamsIndex(isTossWinner);
  setPlayersDetails(isTossWinner);

  addOptions(playersArray);
  displayTeamsName();
}

function storeSelectedPlayer(playersName) {
  let player = cricketers.find((player) => player.name == playersName);

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
  let player = cricketers.find((obj) => obj.name == playerName);
  const playersOption = generateOptions(player);
  location.insertAdjacentHTML("afterbegin", playersOption);
}

function getPlayersCredit(playerName) {
  let player = cricketers.find((obj) => obj.name == playerName);
  return player.credit;
}

function playerSelector() {
  let select = document.getElementById("t1Sel");
  let SelectedPlayers = document.getElementById("selected");
  let playerName = select.options[select.selectedIndex].value;

  if (storeSelectedPlayer(playerName)) {
    removeSelectedPlayerFromDisplay(select);
    displayRemovedPlayerToSelectionList(playerName, SelectedPlayers);
    updateCreditAndCount(getPlayersCredit(playerName), 1);
  }
}

function updateCreditAndCount(credit, count) {
  let currentCredit = document.getElementById("playerCredit").textContent;
  let currentCount = document.getElementById("playerCount").textContent;

  document.getElementById("playerCredit").textContent = credit + +currentCredit;
  document.getElementById("playerCount").textContent = count + +currentCount;
}

function storeTeam() {


  teamDetails[teamIndex].teamMembers = tossWinnersTeam;
}






function playerRemover() {
  let select = document.getElementById("selected");
  let SelectedPlayers = document.getElementById("t1Sel");
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
  removeOptions(document.getElementById("t1Sel"));
  removeOptions(document.getElementById("selected"));
  document.getElementById("playerCount").textContent = 0;
  document.getElementById("playerCredit").textContent = 0;
  tossWinnersTeam = [];
}

function getRemainingPlayers(arr) {
  let remainingPlayers = cricketers.filter((main) => {
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

  document.getElementById("loadCap").hidden = false;
  document.getElementById("teamSaver").hidden = true;



  saveTossWinnersTeam();
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
