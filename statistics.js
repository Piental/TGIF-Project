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

/* calculation of the numbers of particular parties */

var numDem = 0;
var numRep = 0;
var numInd = 0;
var numTot = 0;

for (var i = 0; i < members.length; i++) {
  if (members[i].party === "D") {
    numDem += 1;
  } else if (members[i].party === "R") {
    numRep += 1;
  } else if (members[i].party === "I") {
    numInd += 1;
  }
}
numTot = numDem + numRep + numInd;

/* calculation of the votes of particular parties */

var voteDem = 0;
var voteRep = 0;
var voteInd = 0;
var voteTot = 0;

for (var i = 0; i < members.length; i++) {
  if (members[i].party === "D") {
    voteDem += members[i].votes_with_party_pct;
  }
  if (members[i].party === "R") {
    voteRep += members[i].votes_with_party_pct;
  }
  if (members[i].party === "I") {
    voteInd += members[i].votes_with_party_pct;
  }
}
voteTot = ((voteDem + voteRep + voteInd) / numTot).toFixed(2);
voteDem = (voteDem / numDem).toFixed(2);
voteRep = (voteRep / numRep).toFixed(2);
if (voteInd != 0) {
  voteInd = (voteInd / numInd).toFixed(2);
} else {
  voteInd = 0;
}

/*---TABLES---*/
/* at Glance */

temp1 =
  "<tr><td>Republicans</td><td>" +
  numRep +
  "</td><td>" +
  voteRep +
  " % </td></tr>";
temp1 +=
  "<tr><td>Democrats</td><td>" +
  numDem +
  "</td><td>" +
  voteDem +
  " % </td></tr>";
temp1 +=
  "<tr><td>Independents</td><td>" +
  numInd +
  "</td><td>" +
  voteInd +
  " % </td></tr>";
temp1 +=
  "<tr><td>Total</td><td>" + numTot + "</td><td>" + voteTot + " % </td></tr>";

document.getElementById("data1").innerHTML = temp1;

/* Least Engaged (Top 10% Attendance) */

function lowEng(temp2 = "") {
  members.sort(function(a, b) {
    return b.missed_votes_pct - a.missed_votes_pct;
  });
  var percent10 =
    members[(members.length / 10 - 1).toFixed(0)].missed_votes_pct;

  for (i = 0; i < members.length; i++) {
    if (members[i].missed_votes_pct >= percent10) {
      var middleName = members[i].middle_name;
      if (members[i].middle_name === null) {
        middleName = "";
      }
      temp2 +=
        "<tr><td>" +
        members[i].first_name +
        " " +
        middleName +
        " " +
        members[i].last_name +
        "</td>";
      temp2 += "<td>" + members[i].missed_votes + "</td>";
      temp2 += "<td>" + members[i].missed_votes_pct + " %" + "</td></tr>";
    }
  }
  document.getElementById("data2").innerHTML = temp2;
}

/* Most Engaged (Top 10% Attendance) */

function highEng(temp3 = "") {
  members.sort(function(a, b) {
    return a.missed_votes_pct - b.missed_votes_pct;
  });
  var percent10 =
    members[(members.length / 10 - 1).toFixed(0)].missed_votes_pct;

  for (i = 0; i < members.length; i++) {
    if (members[i].missed_votes_pct <= percent10) {
      var middleName = members[i].middle_name;
      if (members[i].middle_name === null) {
        middleName = "";
      }
      temp3 +=
        "<tr><td>" +
        members[i].first_name +
        " " +
        middleName +
        " " +
        members[i].last_name +
        "</td>";
      temp3 += "<td>" + members[i].missed_votes + "</td>";
      temp3 += "<td>" + members[i].missed_votes_pct + " %" + "</td></tr>";
    }
  }
  document.getElementById("data3").innerHTML = temp3;
}

/*Least Loyal (Bottom 10 % of Party) */

function lowLoy(temp4 = "") {
  members.sort(function(a, b) {
    return a.votes_with_party_pct - b.votes_with_party_pct;
  });
  var percent10 =
    members[(members.length / 10 - 1).toFixed(0)].votes_with_party_pct;

  for (i = 0; i < members.length; i++) {
    if (members[i].votes_with_party_pct <= percent10) {
      var middleName = members[i].middle_name;
      if (members[i].middle_name === null) {
        middleName = "";
      }
      temp4 +=
        "<tr><td>" +
        members[i].first_name +
        " " +
        middleName +
        " " +
        members[i].last_name +
        "</td>";
      temp4 += "<td>" + members[i].total_votes + "</td>";
      temp4 += "<td>" + members[i].votes_with_party_pct + " %" + "</td></tr>";
    }
  }
  document.getElementById("data4").innerHTML = temp4;
}

/* Most Loyal (Top 10% Attendance) */

function mostLoy(temp5 = "") {
  members.sort(function(a, b) {
    return b.votes_with_party_pct - a.votes_with_party_pct;
  });
  var percent10 =
    members[(members.length / 10 - 1).toFixed(0)].votes_with_party_pct;

  for (i = 0; i < members.length; i++) {
    if (members[i].votes_with_party_pct >= percent10) {
      var middleName = members[i].middle_name;
      if (members[i].middle_name === null) {
        middleName = "";
      }
      temp5 +=
        "<tr><td>" +
        members[i].first_name +
        " " +
        middleName +
        " " +
        members[i].last_name +
        "</td>";
      temp5 += "<td>" + members[i].total_votes + "</td>";
      temp5 += "<td>" + members[i].votes_with_party_pct + " %" + "</td></tr>";
    }
  }
  document.getElementById("data5").innerHTML = temp5;
}

if (document.title == "Senate Loyality" || document.title == "House Loyality") {
  lowLoy();
  mostLoy();
} else if (
  document.title == "Senate Attendance" ||
  document.title == "House Attendance"
) {
  highEng();
  lowEng();
}
