let runs = 0;
let wickets = 0;
let ballsCount = 0;

let curPlayingBatsman = "";
let curPlayingBowler = "";

let battingIndex;
let bowlingIndex;
let teamsData = [];

function loadplaygame(isTossWinner) {
  // enter 1 as argument for toss winner team and any other no. for toss losers team

  if (isTossWinner == 1) {
    setPropertiesToObj();
    if (!validateCapAndViceCap(0) || !validateCapAndViceCap(1)) {
      return;
    }
  } else {
    reset();
    document.getElementById("hitBtn").disabled = false;
  }
  let obj = getBattingAndBowlingIndex(isTossWinner);

  battingIndex = obj.battingIndex;
  bowlingIndex = obj.bowlingIndex;

  curPlayingBatsman = getRandomPlayer(battingIndex, "Batsman");
  curPlayingBowler = getRandomPlayer(bowlingIndex, "Bowler");
  displayOnPageLoad();
  hideButtonsOnPageLoad();
}

function displayOnPageLoad() {
  displayTextInPage(curPlayingBatsman.name, document.getElementById("playingBatsman"));
  displayTextInPage(curPlayingBowler.name, document.getElementById("playingBowler"));
  displayTextInPage(`Batting Team: ${teamDetails[battingIndex].name}`, document.getElementById("battingTeam"));
  displayTextInPage(`Bowling Team: ${teamDetails[bowlingIndex].name}`, document.getElementById("bowlingTeam"));
  displayTextInPage(0, document.getElementById("overs"));
  displayTextInPage(0, document.getElementById("score"));
  displayTextInPage(" ", document.getElementById("commentaryList"));
  displayTextInPage(" ", document.getElementById("shotType"));
}

function hideButtonsOnPageLoad() {
  document.getElementById("nextBtn").hidden = true;
  document.getElementById("hitBtn").hidden = false;
  document.getElementById("resultBtn").hidden = true;
  document.getElementById("cricketTime").hidden = false;
  document.getElementById("captainSelection").hidden = true;
}

function getBattingAndBowlingIndex(isTossWinner) {
  let indexes = getTossWinnerAndLosersIndex();
  let obj = {};

  if (isTossWinner == 1) {
    obj.battingIndex = indexes.tossWinnerIndex;
    obj.bowlingIndex = indexes.tossLoserIndex;
    return obj;
  }
  obj.bowlingIndex = indexes.tossWinnerIndex;
  obj.battingIndex = indexes.tossLoserIndex;
  return obj;
}

function displayTextInPage(text, position) {
  position.innerHTML = text;
}

function setRunAndPointProperty() {
  for (let i = 0; i < teamDetails.length; i++) {
    for (let j = 0; j < teamDetails[i].teamMembers.length; j++) {
      teamDetails[i].teamMembers[j].runs = 0;
      teamDetails[i].teamMembers[j].points = 0;
    }
  }
}

function setWicketProperty() {
  for (let i = 0; i < teamDetails.length; i++) {
    for (let j = 0; j < teamDetails[i].teamMembers.length; j++) {
      if (teamDetails[i].teamMembers[j].playingRole == "Bowler") {
        teamDetails[i].teamMembers[j].wickets = 0;
      }
    }
  }
}

function setPropertiesToObj() {
  setPlayedBallsProperty();
  setRunAndPointProperty();
  setWicketProperty();
}

function setPlayedBallsProperty() {
  for (let i = 0; i < teamDetails.length; i++) {
    for (let j = 0; j < teamDetails[i].teamMembers.length; j++) {
      teamDetails[i].teamMembers[j].ballsPlayed = 0;
    }
  }
}

function getRandomPlayer(index, role) {
  let found = false;
  let playerObj;

  while (!found) {
    let random = Math.floor(Math.random() * 11);
    if (
      !teamDetails[index].teamMembers[random].hasPlayed &&
      teamDetails[index].teamMembers[random].playingRole == role
    ) {
      playerObj = teamDetails[index].teamMembers[random];
      found = true;
    }
  }
  setPlayerAsPlayed(playerObj.name);
  return playerObj;
}

function changeBowler() {
  let bowler = getRandomPlayer(bowlingIndex, "Bowler");
  document.getElementById("playingBowler").innerHTML = bowler.name;
  curPlayingBowler = bowler;
}

function changeBatsman() {
  let batsman = getRandomPlayer(battingIndex, "Batsman");
  document.getElementById("playingBatsman").innerHTML = batsman.name;
  curPlayingBatsman = batsman;
}

function getRandomShot() {
  let random = Math.floor(Math.random() * shotTypes.length);

  return shotTypes[random].name;
}

function getFantasyPoint(shot, multiply) {
  let points;
  if (shot == "Duck") {
    points = -2;
  }
  for (let i = 0; i < shotTypes.length; i++) {
    if (shotTypes[i].name == shot) {
      points = shotTypes[i].point;
      break;
    }
  }
  return +(+points * +multiply);
}

function getRuns(shotName) {
  for (let i = 0; i < shotTypes.length; i++) {
    if (shotTypes[i].name == shotName) {
      return shotTypes[i].runs;
    }
  }
}

function setPlayerAsPlayed(playerName) {
  for (let i = 0; i < teamDetails.length; i++) {
    for (let j = 0; j < teamDetails[i].teamMembers.length; j++) {
      if (teamDetails[i].teamMembers[j].name == playerName) {
        teamDetails[i].teamMembers[j].hasPlayed = true;
      }
    }
  }
}

function getPointsMultiplier(team, obj) {
  for (let i = 0; i < team.length; i++) {
    for (let j = 0; j < team[i].teamMembers.length; j++) {
      if (team[i].teamMembers[j].name == obj.name) {
        return team[i].teamMembers[j].isCaptain
          ? 2
          : team[i].teamMembers[j].isViceCaptain
          ? 1.5
          : 1;
      }
    }
  }
}

function generateCommentary(shot) {
  let overs = getOvers(ballsCount);

  let time = getDateAndTime();

  return `${overs} - ${time} - ${shot} `;
}

function getOvers(balls) {
  let preFix = Math.trunc(balls / 6);
  let postFix = balls % 6;
  return `${preFix}.${postFix}`;
}

function getShotCommentary(shot) {
  return `It's a ${shot}`;
}

function getDateAndTime() {
  let date = new Date();
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

function storePlayersRuns(obj, runs) {
  for (let j = 0; j < teamDetails.length; j++) {
    for (let i = 0; i < teamDetails[j].teamMembers.length; i++) {
      if (teamDetails[j].teamMembers[i].name == obj.name) {
        teamDetails[j].teamMembers[i].runs += runs;
      }
    }
  }
}

function storePlayersPoints(obj, points) {
  for (let j = 0; j < teamDetails.length; j++) {
    for (let i = 0; i < teamDetails[j].teamMembers.length; i++) {
      if (teamDetails[j].teamMembers[i].name == obj.name) {
        teamDetails[j].teamMembers[i].points += points;
      }
    }
  }
}

function checkDismissal() {
  for (let i = 0; i < teamDetails.length; i++) {
    for (let j = 0; j < teamDetails[i].teamMembers.length; j++) {
      if (
        teamDetails[i].teamMembers[j].name == curPlayingBatsman.name &&
        teamDetails[i].teamMembers[j].playedBalls < 2
      ) {
        return true;
      }
    }
  }
  return false;
}

function storeRunsAndPoints(shot) {
  if (shot == "Wicket" || shot == "DotBall") {
    incrementBallsPlayed(curPlayingBatsman);
    storeBowlersPoints(shot);
    if (shot == "Wicket") {
      wickets++;
      incrementWickets(curPlayingBowler);
      if (checkDismissal()) {
        storeBatsmanPoints("Duck");
      }
      changeBatsman();
    }
    if (ballsCount == 6 || ballsCount == 12 || ballsCount == 18 || ballsCount == 24) {
      changeBowler();}
  } else {
    incrementBallsPlayed(curPlayingBatsman);
    storeBatsmanPoints(shot);
    storePlayersRuns(curPlayingBatsman, getRuns(shot));
    if (ballsCount == 6 || ballsCount == 12 || ballsCount == 18 || ballsCount == 24) {
      changeBowler();
    }
  }
}

function storeBowlersPoints(shot) {
  storePlayersPoints(
    curPlayingBowler,
    getFantasyPoint(shot, getPointsMultiplier(teamDetails, curPlayingBowler))
  );
}
function storeBatsmanPoints(shot) {
  storePlayersPoints(
    curPlayingBatsman,
    getFantasyPoint(shot, getPointsMultiplier(teamDetails, curPlayingBatsman))
  );
}

function getTotalRuns(battingIndex) {
  let totalRuns = 0;
  for (let i = 0; i < teamDetails[battingIndex].teamMembers.length; i++) {
    totalRuns += teamDetails[battingIndex].teamMembers[i].runs;
  }
  return totalRuns;
}

function getTotalFantasyPoint(index) {
  let totalPoints = 0;
  for (let i = 0; i < teamDetails[index].teamMembers.length; i++) {
    totalPoints += teamDetails[index].teamMembers[i].points;
  }
  return totalPoints;
}

function battingTeamsPoints() {
  return getTotalFantasyPoint(battingIndex);
}

function bowlingTeamsPoints() {
  return getTotalFantasyPoint(bowlingIndex);
}

function playBtnListener(dataSet) {
  if (wickets == 11 || ballsCount == 30) {
    alert("Your turn is now over");
    document.getElementById("hitBtn").disabled = true;

    if (dataSet == 1) {
      document.getElementById("nextBtn").hidden = false;
      document.getElementById("hitBtn").dataset.property = 2;
    } else {
      document.getElementById("resultBtn").hidden = false;
    }
  } else {
    let shot = getRandomShot();
    document.getElementById("nextBtn").hidden = true;
    ballsCount++;
    storeRunsAndPoints(shot);
    displayAllOnClick(shot);
    // document.getElementById("hitBtn").disabled = true;
    // setTimeout(() => {
    //   document.getElementById("hitBtn").disabled = false;
    // }, 5000);
  }
}

function displayAllOnClick(shot) {
  displayTextInPage(`Batsman: ${curPlayingBatsman.name}`, document.getElementById("playingBatsman"));
  displayTextInPage(`Bowler: ${curPlayingBowler.name}`, document.getElementById("playingBowler"));
  displayTextInPage(`overs: ${getOvers(ballsCount)}`, document.getElementById("overs"));
  displayTextInPage(`score : ${getTotalRuns(battingIndex)}/${wickets}`, document.getElementById("score"));
  displayTextInPage(`points :${battingTeamsPoints()}`, document.getElementById("tossWinnerFantasyPoint"));
  displayTextInPage(`points :${bowlingTeamsPoints()}`, document.getElementById("tossLoserFantasyPoint"));
  document.getElementById("commentaryList").insertAdjacentHTML("beforeend", getCommentary(shot));
  displayTextInPage(getShotCommentary(shot), document.getElementById("shotType"));
}

function getCommentary(shot) {
  return `<li>${generateCommentary(shot)}</li>`;
}

function reset() {
  ballsCount = 0;
  wickets = 0;
  runs = 0;
  resetHasPlayedProp();
}

function resetHasPlayedProp() {
  for (let i = 0; i < teamDetails.length; i++) {
    for (let j = 0; j < teamDetails[i].teamMembers.length; j++) {
      teamDetails[i].teamMembers[j].hasPlayed = false;
    }
  }
}

function incrementBallsPlayed(obj) {
  for (let i = 0; i < teamDetails.length; i++) {
    for (let j = 0; j < teamDetails[i].teamMembers.length; j++) {
      if (teamDetails[i].teamMembers[j].name == obj.name) {
        teamDetails[i].teamMembers[j].ballsPlayed++;
      }
    }
  }
}

function incrementWickets(obj) {
  let playersIndex = findIndexOfPlayer(bowlingIndex, obj.name);
  teamDetails[bowlingIndex].teamMembers[playersIndex].wickets++;
}
