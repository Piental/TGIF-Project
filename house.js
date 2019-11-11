var members = data2.results[0].members;
var temp = "";

members.forEach(function(oneMember, index) {
  var middleName = oneMember.middle_name;
  if (oneMember.middle_name === null) {
    middleName = "";
  }
  var newIndex = index + 1;
  temp += "<tr><td>" + newIndex + "</td>";
  temp +=
    "<td>" +
    oneMember.first_name +
    " " +
    middleName +
    " " +
    oneMember.last_name +
    "</td>";
  temp += "<td>" + oneMember.party + "</td>";
  temp += "<td>" + oneMember.state + "</td>";
  temp += "<td>" + oneMember.seniority + "</td>";
  temp += "<td>" + oneMember.votes_with_party_pct + " %" + "</td>";
});

document.getElementById("data2").innerHTML = temp;
