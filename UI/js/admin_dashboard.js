const current_username = localStorage.getItem('username')
document.getElementById('welcome').innerHTML = "Welcome " + current_username+"!"+ "(Admin)";
