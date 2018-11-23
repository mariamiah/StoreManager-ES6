const current_username = localStorage.getItem('username')
document.getElementById('welcome').innerHTML = "Welcome " + current_username+"!"+ "(Attendant)";

// Implement log out functionality
const url = 'https://storemanager15.herokuapp.com/api/v2/auth/logout'
const current_token = localStorage.getItem('token')
document.getElementById('logout').addEventListener
('click', logout);

function logout(e){
    e.preventDefault();
    fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json, */*',
            'Authorization': 'Bearer ' + current_token
        }  
    })
    .then(function(response){
        return response.json();
    })
    .then(function(json){
    console.log(json)
    if(json.message=="log out successful"){
        localStorage.removeItem('token');
        window.location.replace('../index.html');
    }
})
}
// Implement auto current date
let today = new Date();
document.getElementById('date').innerHTML = today;

// Search through sale records
function saleSearch(){
    let input = document.getElementById("myInput");
    let searchFilter = input.value.toUpperCase();
    let table = document.getElementById('all-sales');
    let tr = table.getElementsByTagName("tr");
    let i;
    for(i=0; i<tr.length; i++){
        td = tr[i].getElementsByTagName('td')[2];
        if (td){
            if (td.innerHTML.toUpperCase().indexOf(searchFilter)>-1){
                tr[i].style.display = "";
            }else{
                tr[i].style.display = "none";
            }

        }
    }
}
