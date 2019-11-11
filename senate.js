var members;
fetch("pro-congress-113-senate.js").then(function(data) {
  return data;
});

members = data.results[0].members;

table();

function table() {
    var tableBody = 
    
  for (var i = 0; i < members.length; i++) {
    var tableRow = document.createElement("tr");
    var firstName = members[i].first_name;
    var middleName = members[i].middle_name;
    if (middleName === null) {
      middleName = "";
    }
    var lastName = members[i].last_name;
    var completeName = firstName + " " + middleName + " " + lastName;
    var party = members[i].party;
    var state = members[i].state;
    var seniority = members[i].seniority;
    var votesParty = "% " + members[i].votes_with_party_pct;
    var cells = [completeName, party, state, seniority, votesParty];
    {
      for (var j = 0; j < cells.length; j++) {
        var tableCell = document.createElement("td");
        tableCell.append(cells[j]);
        tableRow.append(tableCell);
      }
      document.getElementById("tableBody").append(tableRow);
    }
  }
}
