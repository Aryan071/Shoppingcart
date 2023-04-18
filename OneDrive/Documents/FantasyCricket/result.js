class teamScore {
  constructor(teamName, runs, wickets, ballsCount, fantasyPoints) {
    this.teamName = teamName;
    this.runs = runs;
    this.wickets = wickets;
    this.ballsCount = ballsCount;
    this.fantasyPoints = fantasyPoints;
  }
}

function getTotalWickets(index) {
  let totalWickets = 0;
  for (let i = 0; i < teamDetails[index].teamMembers.length; i++) {
    if (teamDetails[index].teamMembers[i].playingRole == "Bowler") {
      totalWickets += teamDetails[index].teamMembers[i].wickets;
    }
  }
  return totalWickets;
}

function getTotalBalls(index) {
  let totalBalls = 0;
  for (let i = 0; i < teamDetails[index].teamMembers.length; i++) {
    totalBalls += teamDetails[index].teamMembers[i].ballsPlayed;
  }
  return totalBalls;
}

function saveTeamsScore() {
  let team1Score = new teamScore(
    teamDetails[0].name,
    getTotalRuns(0),
    getTotalWickets(1),
    getTotalBalls(0),
    getTotalFantasyPoint(0)
  );
  let team2Score = new teamScore(
    teamDetails[1].name,
    getTotalRuns(1),
    getTotalWickets(0),
    getTotalBalls(1),
    getTotalFantasyPoint(1)
  );
  teamsData.push(team1Score, team2Score);
}

function getWinningTeam() {
  if (teamsData[0].fantasyPoints > teamsData[1].fantasyPoints) {
    return teamsData[0].teamName;
  } else if (teamsData[0].fantasyPoints == teamsData[1].fantasyPoints) {
    return "It's a Tie";
  }
  return teamsData[1].teamName;
}

function generateBatsmanDetail(index) {
  let orderedList = document.createElement("ol");

  for (let i = 0; i < teamDetails[index].teamMembers.length; i++) {
    let li = `<li>${teamDetails[index].teamMembers[i].name} - (${teamDetails[index].teamMembers[i].runs} runs in ${teamDetails[index].teamMembers[i].ballsPlayed} balls) - (Fantasy Points - ${teamDetails[index].teamMembers[i].points})</li>`;
    orderedList.insertAdjacentHTML("beforeend", li);
  }
  return orderedList;
}

function generateBowlersDetail(index) {
  let orderedList = document.createElement("ol");

  for (let i = 0; i < teamDetails[index].teamMembers.length; i++) {
    if (teamDetails[index].teamMembers[i].playingRole == "Bowler") {
      let li = `<li>${teamDetails[index].teamMembers[i].name} - ${teamDetails[index].teamMembers[i].wickets}</li>`;
      orderedList.insertAdjacentHTML("beforeend", li);
    }
  }
  return orderedList;
}

function displayScoreBoard(index) {
  let batsmenData = generateBatsmanDetail(index - 1);
  let bowlersData = generateBowlersDetail(index - 1);
  let teamName = `${teamsData[index - 1].teamName}`;
  let score = `${teamsData[index - 1].runs}/${teamsData[index - 1].wickets}`;
  let fantasyPoints = `${teamsData[index - 1].fantasyPoints}`;

  getById(`name${index}`).insertAdjacentHTML("afterbegin", teamName);
  getById(`fantasyPoints${index}`).insertAdjacentHTML("afterbegin", fantasyPoints);
  getById(`score${index}`).insertAdjacentHTML("afterbegin", score);
  getById(`batsman${index}`).appendChild(batsmenData);
  getById(`bowler${index}`).appendChild(bowlersData);
}

function displayResult() {
  getById("cricketTime").hidden = true;
  getById("result").style.display = "block";
  saveTeamsScore();
  let winner = `Winner : ${getWinningTeam()}`;
  getById(`matchWinner`).insertAdjacentHTML("afterbegin", winner);
  displayScoreBoard(1);
  displayScoreBoard(2);
}
