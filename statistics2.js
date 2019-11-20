if (
  document.title == "House Attendance" ||
  document.title == "House Loyality"
) {
  var members = data2.results[0].members;
} else if (
  document.title == "Senate Attendance" ||
  document.title == "Senate Loyality"
) {
  var members = data.results[0].members;
}

var stat = [
  {
    "Number of Democrats": 0,
    "Number of Republicans": 0,
    "Number of Independents": 0,
    "Average 'Votes with party' for Democrats": 0,
    "Average 'Votes with party' for Republicans": 0,
    "Average 'Votes with party' for Independents": 0,
    "Average 'Votes with party' for All": 0,
    "Least engaged names": 0,
    "Least engaged number of missed votes": 0,
    "Least engaged percentage tableLeastEngagedmissed votes": 0,
    "Most engaged names": 0,
    "Most engaged number of missed votes": 0,
    "Most engaged percentage of missed votes": 0,
    "Least loyal names": 0,
    "Least loyal number of votes": 0,
    "Least loyal percentage party votes": 0,
    "Most loyal names": 0,
    "Most loyal number of votes": 0,
    "Most loyal percentage party votes": 0
  }
];

/* calculation of the numbers of the particular parties */

var independents = "I";
var republicans = "R";
var democrats = "D";
var all = "all";

function avg(letter) {
  var sum = 0;
  var count = 0;
  var arr = [];
  for (i = 0; i < members.length; i++) {
    if (letter === "all") {
      sum += members[i].votes_with_party_pct;
      arr.push(members[i]);
      count += 1;
    } else if (members[i].party == letter) {
      sum += members[i].votes_with_party_pct;
      arr.push(members[i]);
      count += 1;
    }
  }
  if (count == 0) {
    return [0, 0, 0];
  } else {
    return [arr, count, (sum / count).toFixed(2)];
  }
}

/* Most&Least Engaged (10% Attendance) */

function eng(mvp) {
  var names = [];
  var missedVotes = [];
  var missedVotesPct = [];
  var names2 = [];
  var missedVotes2 = [];
  var missedVotesPct2 = [];

  members.sort(function(a, b) {
    return a.missed_votes_pct - b.missed_votes_pct;
  });
  var percent10top =
    members[(members.length / 10 - 1).toFixed(0)].missed_votes_pct;
  var percent10bottom =
    members[(members.length - members.length / 10).toFixed(0)].missed_votes_pct;

  for (i = 0; i < members.length; i++) {
    if (members[i].missed_votes_pct <= percent10top) {
      var middleName = members[i].middle_name;
      if (members[i].middle_name === null) {
        names.push(members[i].first_name + " " + members[i].last_name);
        missedVotes.push(members[i].missed_votes);
        missedVotesPct.push(members[i].missed_votes_pct);
      } else {
        names.push(
          members[i].first_name + " " + middleName + " " + members[i].last_name
        );
        missedVotes.push(members[i].missed_votes);
        missedVotesPct.push(members[i].missed_votes_pct);
      }
    } else if (members[i].missed_votes_pct >= percent10bottom) {
      var middleName = members[i].middle_name;
      if (members[i].middle_name === null) {
        names2.unshift(members[i].first_name + " " + members[i].last_name);
        missedVotes2.unshift(members[i].missed_votes);
        missedVotesPct2.unshift(members[i].missed_votes_pct);
      } else {
        names2.unshift(
          members[i].first_name + " " + middleName + " " + members[i].last_name
        );
        missedVotes2.unshift(members[i].missed_votes);
        missedVotesPct2.unshift(members[i].missed_votes_pct);
      }
    }
  }
  return [
    names,
    missedVotes,
    missedVotesPct,
    names2,
    missedVotes2,
    missedVotesPct2
  ];
}

/*Most&Least 10% Loyal (10% Attendance) */

function loy() {
  var nam = [];
  var totalVotes = [];
  var votesWithParty = [];
  var nam2 = [];
  var totalVotes2 = [];
  var votesWithParty2 = [];

  members.sort(function(a, b) {
    return a.votes_with_party_pct - b.votes_with_party_pct;
  });
  var percent10bottomLoy =
    members[(members.length / 10 - 1).toFixed(0)].votes_with_party_pct;
  var percent10topLoy =
    members[(members.length - members.length / 10).toFixed(0)]
      .votes_with_party_pct;

  for (i = 0; i < members.length; i++) {
    var middleName = members[i].middle_name;

    if (members[i].votes_with_party_pct <= percent10bottomLoy) {
      if (members[i].middle_name === null) {
        nam.push(members[i].first_name + " " + members[i].last_name);
        totalVotes.push(members[i].total_votes);
        votesWithParty.push(members[i].votes_with_party_pct);
      } else {
        nam.push(
          members[i].first_name + " " + middleName + " " + members[i].last_name
        );
        totalVotes.push(members[i].total_votes);
        votesWithParty.push(members[i].votes_with_party_pct);
      }
    } else if (members[i].votes_with_party_pct >= percent10topLoy) {
      var middleName = members[i].middle_name;
      if (members[i].middle_name === null) {
        nam2.unshift(members[i].first_name + " " + members[i].last_name);
        totalVotes2.unshift(members[i].total_votes);
        votesWithParty2.unshift(members[i].votes_with_party_pct);
      } else {
        nam2.unshift(
          members[i].first_name + " " + middleName + " " + members[i].last_name
        );
        totalVotes2.unshift(members[i].total_votes);
        votesWithParty2.unshift(members[i].votes_with_party_pct);
      }
    }
  }
  return [nam, totalVotes, votesWithParty, nam2, totalVotes2, votesWithParty2];
}

stat[0]["Number of Democrats"] = avg(democrats)[1];
stat[0]["Number of Republicans"] = avg(republicans)[1];
stat[0]["Number of Independents"] = avg(independents)[1];
stat[0]["Average 'Votes with party' for Democrats"] = avg(democrats)[2];
stat[0]["Average 'Votes with party' for Republicans"] = avg(republicans)[2];
stat[0]["Average 'Votes with party' for Independents"] = avg(independents)[2];
stat[0]["Average 'Votes with party' for All"] = avg(all)[2];
stat[0]["Least engaged names"] = eng()[3];
stat[0]["Least engaged number of missed votes"] = eng()[4];
stat[0]["Least engaged percentage of missed votes"] = eng()[5];
stat[0]["Most engaged names"] = eng()[0];
stat[0]["Most engaged number of missed votes"] = eng()[1];
stat[0]["Most engaged percentage of missed votes"] = eng()[2];
stat[0]["Least loyal names"] = loy()[0];
stat[0]["Least loyal number of votes"] = loy()[1];
stat[0]["Least loyal percentage party votes"] = loy()[2];
stat[0]["Most loyal names"] = loy()[3];
stat[0]["Most loyal number of votes"] = loy()[4];
stat[0]["Most loyal percentage party votes"] = loy()[5];

function tableMostEngaged() {
  document.getElementById("data3").innerHTML = "";
  for (i = 0; i < stat[0]["Most engaged names"].length; i++) {
    var newRow = document.createElement("tr");
    newRow.insertCell().innerHTML = stat[0]["Most engaged names"][i];
    newRow.insertCell().innerHTML =
      stat[0]["Most engaged number of missed votes"][i];
    newRow.insertCell().innerHTML =
      stat[0]["Most engaged percentage of missed votes"][i] + " %";

    document.getElementById("data3").appendChild(newRow);
  }
}

tableMostEngaged();
