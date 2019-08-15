const apiUrl = "http://localhost:8000/api";

function headers() {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
    return headers;
}

function login(username, password) {
    const user = {
        "user": {
            username,
            password
        }
    }

    const options = {
        method: 'POST',
        headers: headers(),
        credentials: 'same-origin',
        body: JSON.stringify(user)
    };

    return new Promise((resolve) => {
        fetch(`${apiUrl}/users/login`, options).then(res => {
            if(res.ok) {
                console.log("Successful. Getting response data:");
                console.log(res.cookie);
                res.json().then(function(data) {
                    console.log(data);
                    window.location.href = "/secret";
                })
            }else {
                console.log("Failed");
            }
        }).catch(e => console.log(e));
    });
}

function isLoggedIn() {
    const options = {
        method: 'GET',
        headers: headers(),
        credentials: 'same-origin',
    }

    return new Promise((resolve) => {
        fetch(`${apiUrl}/users/isLoggedIn`, options).then(res => {
            if(res.ok) {
                console.log("Logged In");
            }else {
                console.log("Not logged in");
            }
        }).catch(e => console.log(e));
    })
}