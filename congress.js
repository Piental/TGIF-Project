if (document.title == "Congress House") {
  var members = data2.results[0].members;
  var temp = "";
} else if (document.title == "Congress Senate") {
  var members = data.results[0].members;
  var temp = "";
}

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

document.getElementById("data").innerHTML = temp;

/*var link = document.createElement("a");
<td><a
         link.setAttribute("href", table.url);
link.innerHTML =  firstName + " " + middleName + " " + lastName; */
