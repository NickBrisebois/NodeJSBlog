const apiUrl = "http://localhost:8000/api";

function headers() {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        credentials: 'include'
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
        body: JSON.stringify(user)
    };

    return new Promise((resolve) => {
        fetch(`${apiUrl}/users/login`, options).then(res => {
            if(res.ok) {
                console.log("Successful. Getting response data:");
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
