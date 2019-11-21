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

    /*helper runs each function below just when the data is fetched*/

    helper();
  });

function helper() {
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

  function avg(let) {
    var sum = 0;
    var count = 0;
    var arr = [];
    for (i = 0; i < members.length; i++) {
      if (let === "all") {
        sum += members[i].votes_with_party_pct;
        arr.push(members[i]);
        count += 1;
      } else if (members[i].party == let) {
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
      members[members.length - (members.length / 10).toFixed(0)]
        .missed_votes_pct;

    for (i = 0; i < members.length; i++) {
      if (members[i].missed_votes_pct <= percent10top) {
        var middleName = members[i].middle_name;
        if (members[i].middle_name === null) {
          names.push(members[i].first_name + " " + members[i].last_name);
          missedVotes.push(members[i].missed_votes);
          missedVotesPct.push(members[i].missed_votes_pct);
        } else {
          names.push(
            members[i].first_name +
              " " +
              middleName +
              " " +
              members[i].last_name
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
            members[i].first_name +
              " " +
              middleName +
              " " +
              members[i].last_name
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

  eng();

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
      members[members.length - (members.length / 10).toFixed(0)]
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
            members[i].first_name +
              " " +
              middleName +
              " " +
              members[i].last_name
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
            members[i].first_name +
              " " +
              middleName +
              " " +
              members[i].last_name
          );
          totalVotes2.unshift(members[i].total_votes);
          votesWithParty2.unshift(members[i].votes_with_party_pct);
        }
      }
    }
    return [
      nam,
      totalVotes,
      votesWithParty,
      nam2,
      totalVotes2,
      votesWithParty2
    ];
  }

  loy();

  /* sending all data to statistic object */

  stat[0]["No of Democrats"] = avg(democrats)[1];
  stat[0]["No of Republicans"] = avg(republicans)[1];
  stat[0]["No of Independents"] = avg(independents)[1];
  stat[0]["Average Democrats"] = avg(democrats)[2];
  stat[0]["Average Republicans"] = avg(republicans)[2];
  stat[0]["Average Independents"] = avg(independents)[2];
  stat[0]["Average All"] = avg(all)[2];
  stat[0]["Least engaged names"] = eng()[3];
  stat[0]["Least engaged missed votes"] = eng()[4];
  stat[0]["Least engaged %"] = eng()[5];
  stat[0]["Most engaged names"] = eng()[0];
  stat[0]["Most engaged missed votes"] = eng()[1];
  stat[0]["Most engaged %"] = eng()[2];
  stat[0]["Least loyal names"] = loy()[0];
  stat[0]["Least loyal votes"] = loy()[1];
  stat[0]["Least loyal % party votes"] = loy()[2];
  stat[0]["Most loyal names"] = loy()[3];
  stat[0]["Most loyal votes"] = loy()[4];
  stat[0]["Most loyal % party votes"] = loy()[5];

  /*tables */

  function tableMostEngaged() {
    document.getElementById("data3").innerHTML = "";
    for (i = 0; i < stat[0]["Most engaged names"].length; i++) {
      var newRow = document.createElement("tr");
      newRow.insertCell().innerHTML = stat[0]["Most engaged names"][i];
      newRow.insertCell().innerHTML = stat[0]["Most engaged missed votes"][i];
      newRow.insertCell().innerHTML = stat[0]["Most engaged %"][i] + " %";

      document.getElementById("data3").appendChild(newRow);
    }
  }

  function tableLeastEngaged() {
    document.getElementById("data2").innerHTML = "";
    for (i = 0; i < stat[0]["Least engaged names"].length; i++) {
      var newRow = document.createElement("tr");
      newRow.insertCell().innerHTML = stat[0]["Least engaged names"][i];
      newRow.insertCell().innerHTML = stat[0]["Least engaged missed votes"][i];
      newRow.insertCell().innerHTML = stat[0]["Least engaged %"][i] + " %";

      document.getElementById("data2").appendChild(newRow);
    }
  }

  function tableLeastLoyal() {
    document.getElementById("data4").innerHTML = "";
    for (i = 0; i < stat[0]["Least loyal names"].length; i++) {
      var newRow = document.createElement("tr");
      newRow.insertCell().innerHTML = stat[0]["Least loyal names"][i];
      newRow.insertCell().innerHTML = stat[0]["Least loyal votes"][i];
      newRow.insertCell().innerHTML =
        stat[0]["Least loyal % party votes"][i] + " %";

      document.getElementById("data4").appendChild(newRow);
    }
  }

  function tableMostLoyal() {
    document.getElementById("data5").innerHTML = "";
    for (i = 0; i < stat[0]["Most loyal names"].length; i++) {
      var newRow = document.createElement("tr");
      newRow.insertCell().innerHTML = stat[0]["Most loyal names"][i];
      newRow.insertCell().innerHTML = stat[0]["Most loyal votes"][i];
      newRow.insertCell().innerHTML =
        stat[0]["Most loyal % party votes"][i] + " %";

      document.getElementById("data5").appendChild(newRow);
    }
  }

  if (
    document.title == "House Attendance" ||
    document.title == "Senate Attendance"
  ) {
    tableMostEngaged();
    tableLeastEngaged();
  } else if (
    document.title == "House Loyality" ||
    document.title == "Senate Loyality"
  ) {
    tableLeastLoyal();
    tableMostLoyal();
  }

  /* at Glance */

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
