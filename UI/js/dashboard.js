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
        window.location.replace('../index.html');
    }
})
}
// Implement auto current date
let Today = new Date();
document.getElementById('date').innerHTML=Today;
