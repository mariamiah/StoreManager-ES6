const url = 'https://storemanager15.herokuapp.com/api/v2/auth/login'
let request = new Request(url)

document.getElementById('loginUser').addEventListener
('submit', login);

function login(e){
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('current-password').value;
    fetch(request, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username:username, password:password})
    })
    .then((res)=> {
        return res.json();
    })
    .then(function(json){
        if ('token' in json){
            localStorage.setItem('token', json['token'])
            localStorage.setItem('username', username)
            let base64token = json['token'].split('.')[1];
            let realtoken = base64token.replace(/-/g, '+').replace(/_/g, '/');
            let decoded_token = JSON.parse(window.atob(realtoken));
            if(decoded_token['roles']=="Admin"){
                window.location.assign('UI/admin_dashboard.html');
            }else{
                window.location.assign('UI/dashboard.html');
            }
        }else{
            console.log(json)
            document.getElementById('errmessage').innerHTML=json.message;
        }
    })
    .catch(err => console.log(err));
}
