function playerRoleValidation(arr, role, count) {
  let roleArr = arr.filter((obj) => {
    if (obj.playingRole == role) {
      return obj;
    }
  });
  if (roleArr.length > count) {
    alert(`Only ${count} ${role} per team is allowed!!`);
    return false;
  }
  return true;
}

function teamLengthValidation(arr) {
  if (arr.length > 11) {
    alert('Only a "11" players per team is allowed!!');
    return false;
  }
  return true;
}

function creditPointValidation(arr) {
  let credit = 0;

  for (let i = 0; i < arr.length; i++) {
    credit += arr[i].credit;
  }
  if (credit > 100) {
    alert("Limit exceeded of 100 credit points!!");
    return false;
  }
  return true;
}

function validateTeamPlayers(arr) {
  let bowlers = playerRoleValidation(arr, "Bowler", 5);
  let batsman = playerRoleValidation(arr, "Batsman", 5);
  let Wicketkeeper = playerRoleValidation(arr, "Wicketkeeper", 1);
  let teamLength = teamLengthValidation(arr);
  let creditPoint = creditPointValidation(arr);

  let result;
  if (bowlers == true && batsman == true && Wicketkeeper == true && teamLength == true && creditPoint == true) {
    result = true;
  }
  else {
    result = false;
  }


  return result;
}
