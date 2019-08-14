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
        body: JSON.stringify(user)
    };

    return new Promise((resolve) => {
        fetch(`${apiUrl}/users/login`, options).then(response => {
            if(response.ok) {
                console.log("Successful. Getting response data:");
                /*response.json().then(data => {
                    console.log(data);
                })*/
            }else {
                console.log("Failed");
            }
        }).catch(e => console.log(e));
    });
}
