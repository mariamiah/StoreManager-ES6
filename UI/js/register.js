const url = "http://localhost:5000/api/v2/auth/signup"

document.getElementById('registerUser').addEventListener
('submit', register);

function register(e){
    e.preventDefault();
    let employeeName = document.getElementById('employeeName').value;
    let email = document.getElementById('email').value;
    let gender = document.getElementById('gender').value;
    let userName= document.getElementById('userName').value;
    let currentPassword = document.getElementById('currentPassword').value;
    let confirmPassword= document.getElementById('confirmPassword').value;
    let option = document.getElementById('select').value;
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')

        },
        body: JSON.stringify({employee_name:employeeName, 
                              email: email,
                              gender: gender,
                              username: userName,
                              password: currentPassword,
                              confirm_password: confirmPassword,
                              role: option
                            })
    })
    .then((res)=> {
        return res.json();
    })
    .then(function(json){
        if(json['message'] == 'User registered successfully'){
            console.log(json);
            document.getElementById('adminerrormessage').innerHTML=json.message;
            window.location.assign('employees.html')
        }else if(json['message']=='Invalid'){
            document.getElementById('adminerrormessage').innerHTML="Username already exists, try another";
        }else{
            console.log(json);
            document.getElementById('adminerrormessage').innerHTML=json.message;
        }        
        })
}
