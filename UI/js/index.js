const url = 'https://storemanager15.herokuapp.com/api/v2/auth/login'
let request = new Request(url)

document.getElementById('loginuser').addEventListener
('submit', login);

function login(e){
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    fetch(request, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({username:username, password:password})
    })
    .then((res)=> res.json())
    .then((data)=> console.log(data))
    .catch(function(error){
        console.log(error);
    })
}
