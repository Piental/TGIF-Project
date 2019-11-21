if (
  document.title == "House Attendance" ||
  document.title == "House Loyality"
) {
  var url = "https://api.propublica.org/congress/v1/113/house/members.json";
} else if (
  document.title == "Senate Attendance" ||
  document.title == "Senate Loyality"
) {
  var url = "https://api.propublica.org/congress/v1/113/senate/members.json";
}

/*fetching the data from propublica*/
fetch(url, {
  headers: {
    "X-API-Key": "5sHtF1X9QGj8XEqYQe0Ca90vdJqO2CjvVBWtQzta"
  }
})
  .then(function(data) {
    return data.json();
  })
  .then(function(myData) {
    console.log(myData);
    members = myData.results[0].members;

    helper();
    /*helper runs each function below just when the data is fetched*/
  });

/* my statistic object <3 */

var stat = [
  {
    "No of Democrats": 0,
    "No of Republicans": 0,
    "No of Independents": 0,
    "Average Democrats": 0,
    "Average Republicans": 0,
    "Average Independents": 0,
    "Average All": 0,
    "Least engaged names": 0,
    "Least engaged missed votes": 0,
    "Least engaged %": 0,
    "Most engaged names": 0,
    "Most engaged missed votes": 0,
    "Most engaged %": 0,
    "Least loyal names": 0,
    "Least loyal votes": 0,
    "Least loyal % party votes": 0,
    "Most loyal names": 0,
    "Most loyal votes": 0,
    "Most loyal % party votes": 0
  }
];

/* calculation of the numbers of the particular parties */

var independents = "I";
var republicans = "R";
var democrats = "D";
var all = "all";

function avg(a) {
  var sum = 0;
  var count = 0;
  var arr = [];
  for (i = 0; i < members.length; i++) {
    if (a === "all") {
      sum += members[i].votes_with_party_pct;
      arr.push(members[i]);
      count += 1;
    } else if (members[i].party == a) {
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

/* Most&Least Engaged&Loyal (10% Attendance) */

var mvp = "missed_votes_pct";
var mv = "missed_votes";
var vwpp = "votes_with_party_pct";
var tv = "total_votes";

function eng(c, d) {
  var names = [];
  var missedVotes = [];
  var missedVotesPct = [];
  var names2 = [];
  var missedVotes2 = [];
  var missedVotesPct2 = [];

  members.sort(function(a, b) {
    return a[c] - b[c];
  });
  var percent10top = members[(members.length / 10 - 1).toFixed(0)][c];
  var percent10bottom =
    members[members.length - (members.length / 10).toFixed(0)][c];

  for (i = 0; i < members.length; i++) {
    if (members[i][c] <= percent10top) {
      var middleName = members[i].middle_name;
      if (members[i].middle_name === null) {
        names.push(members[i].first_name + " " + members[i].last_name);
        missedVotes.push(members[i][d]);
        missedVotesPct.push(members[i][c]);
      } else {
        names.push(
          members[i].first_name + " " + middleName + " " + members[i].last_name
        );
        missedVotes.push(members[i][d]);
        missedVotesPct.push(members[i][c]);
      }
    } else if (members[i][c] >= percent10bottom) {
      var middleName = members[i].middle_name;
      if (members[i].middle_name === null) {
        names2.unshift(members[i].first_name + " " + members[i].last_name);
        missedVotes2.unshift(members[i][d]);
        missedVotesPct2.unshift(members[i][c]);
      } else {
        names2.unshift(
          members[i].first_name + " " + middleName + " " + members[i].last_name
        );
        missedVotes2.unshift(members[i][d]);
        missedVotesPct2.unshift(members[i][c]);
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

/* sending all data to statistic object */

function send() {
  stat[0]["No of Democrats"] = avg(democrats)[1];
  stat[0]["No of Republicans"] = avg(republicans)[1];
  stat[0]["No of Independents"] = avg(independents)[1];
  stat[0]["Average Democrats"] = avg(democrats)[2];
  stat[0]["Average Republicans"] = avg(republicans)[2];
  stat[0]["Average Independents"] = avg(independents)[2];
  stat[0]["Average All"] = avg(all)[2];
  stat[0]["Least engaged names"] = eng(mvp, mv)[3];
  stat[0]["Least engaged missed votes"] = eng(mvp, mv)[4];
  stat[0]["Least engaged %"] = eng(mvp, mv)[5];
  stat[0]["Most engaged names"] = eng(mvp, mv)[0];
  stat[0]["Most engaged missed votes"] = eng(mvp, mv)[1];
  stat[0]["Most engaged %"] = eng(mvp, mv)[2];
  stat[0]["Least loyal names"] = eng(vwpp, tv)[0];
  stat[0]["Least loyal votes"] = eng(vwpp, tv)[1];
  stat[0]["Least loyal % party votes"] = eng(vwpp, tv)[2];
  stat[0]["Most loyal names"] = eng(vwpp, tv)[3];
  stat[0]["Most loyal votes"] = eng(vwpp, tv)[4];
  stat[0]["Most loyal % party votes"] = eng(vwpp, tv)[5];
}

/*tables */

var men = "Most engaged names";
var me = "Most engaged %";
var memv = "Most engaged missed votes";
var table3 = "data3";

var len = "Least engaged names";
var lemv = "Least engaged missed votes";
var le = "Least engaged %";
var table2 = "data2";

var mln = "Most loyal names";
var mlv = "Most loyal votes";
var mlpv = "Most loyal % party votes";
var table5 = "data5";

var lln = "Least loyal names";
var llv = "Least loyal votes";
var llpv = "Least loyal % party votes";
var table4 = "data4";

/* function for creating tables with top/bottom 10% */

function flexTable(a, b, c, d) {
  document.getElementById(d).innerHTML = "";
  for (i = 0; i < stat[0][a].length; i++) {
    var newRow = document.createElement("tr");
    newRow.insertCell().innerHTML = stat[0][a][i];
    newRow.insertCell().innerHTML = stat[0][b][i];
    newRow.insertCell().innerHTML = stat[0][c][i] + " %";

    document.getElementById(d).appendChild(newRow);
  }
}

/* at Glance */

function glance() {
  var totalAmt =
    stat[0]["No of Republicans"] +
    stat[0]["No of Democrats"] +
    stat[0]["No of Independents"];

  temp1 =
    "<tr><td>Republicans</td><td>" +
    +stat[0]["No of Republicans"] +
    "</td><td>" +
    stat[0]["Average Republicans"] +
    " % </td></tr>";
  temp1 +=
    "<tr><td>Democrats</td><td>" +
    stat[0]["No of Democrats"] +
    "</td><td>" +
    stat[0]["Average Democrats"] +
    " % </td></tr>";
  temp1 +=
    "<tr><td>Independents</td><td>" +
    stat[0]["No of Independents"] +
    "</td><td>" +
    stat[0]["Average Independents"] +
    " % </td></tr>";
  temp1 +=
    "<tr><td>Total</td><td>" +
    totalAmt +
    "</td><td>" +
    stat[0]["Average All"] +
    " % </td></tr>";

  document.getElementById("data1").innerHTML = temp1;
}

function helper() {
  eng(mvp, mv);
  eng(vwpp, tv);
  send();
  if (
    document.title == "House Attendance" ||
    document.title == "Senate Attendance"
  ) {
    flexTable(men, memv, me, table3);
    flexTable(len, lemv, le, table2);
  } else if (
    document.title == "House Loyality" ||
    document.title == "Senate Loyality"
  ) {
    flexTable(lln, llv, llpv, table4);
    flexTable(mln, mlv, mlpv, table5);
  }
  glance();
}
