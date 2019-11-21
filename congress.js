if (document.title == "Congress House") {
  var url = "https://api.propublica.org/congress/v1/113/house/members.json";
} else if (document.title == "Congress Senate") {
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
    selectCheck();
  });

function helper() {
  var drop = new Array();
  for (i = 0; i < members.length; i++) {
    drop[i] = members[i].state;
  }
  drop.sort();
  drop = [...new Set(drop)];

  dropMenu = '<option class ="option" value="all">All</option>';

  for (x = 0; x < drop.length; x++) {
    dropMenu +=
      '<option class ="option" value="' +
      drop[x] +
      '">' +
      drop[x] +
      "</option>";
  }
  stateList.innerHTML = dropMenu;
}
function selectCheck() {
  var state = (select = document.getElementById("stateList"));
  var check = document.getElementsByClassName("check");
  var table = document.getElementById("data");
  table.innerHTML = "";
  temp = "";
  members.forEach(function(oneMember, index) {
    for (j = 0; j < check.length; j++) {
      if (
        oneMember.party == check[j].id &&
        check[j].checked == true &&
        (state.value == "all" || oneMember.state == state.value)
      ) {
        if (oneMember.middle_name === null) {
          middleName = "";
        }
        temp +=
          '<tr><td><a href="' +
          oneMember.url +
          '">' +
          oneMember.first_name +
          " " +
          middleName +
          " " +
          oneMember.last_name +
          "</a></td>";
        temp += "<td>" + oneMember.party + "</td>";
        temp += "<td>" + oneMember.state + "</td>";
        temp += "<td>" + oneMember.seniority + "</td>";
        temp += "<td>" + oneMember.votes_with_party_pct + " %" + "</td></tr>";
      }
    }
  });
  table.innerHTML = temp;
  if (temp === "") {
    alert(
      "We are sorry, for the provided filter criteria there are no members selected!"
    );
  }
}
