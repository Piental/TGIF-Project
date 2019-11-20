if (document.title == "Congress House") {
  var members = data2.results[0].members;
  var temp = "";
} else if (document.title == "Congress Senate") {
  var members = data.results[0].members;
}

var drop = new Array();
for (i = 0; i < members.length; i++) {
  drop[i] = members[i].state;
}
drop.sort();
drop = [...new Set(drop)];

dropMenu = '<option class ="option" value="all">All</option>';

for (x = 0; x < drop.length; x++) {
  dropMenu +=
    '<option class ="option" value="' + drop[x] + '">' + drop[x] + "</option>";
}
stateList.innerHTML = dropMenu;

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

selectCheck();

/*var link = document.createElement("a");
<td><a
         link.setAttribute("href", table.url);
link.innerHTML =  firstName + " " + middleName + " " + lastName; */
