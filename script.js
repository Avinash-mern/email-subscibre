//Signup script

    <script>
        const signupForm = document.getElementById('signup-form');
        const message = document.getElementById('message');
        const signupScriptURL = 'Enter apps url';

        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(signupForm);

            fetch(signupScriptURL, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.result === "success") {
                    message.innerHTML = "Signup Successful! Redirecting to login...";
                    setTimeout(() => window.location.href = "login.html", 2000);
                } else {
                    message.innerHTML = data.message || "Signup failed. Try again.";
                }
            })
            .catch(error => {
                message.innerHTML = "Error: " + error.message;
            });
        });
    </script>



//Login Script

    <script>
        const loginForm = document.getElementById('login-form');
        const message = document.getElementById('message');
        const loginScriptURL = 'Enter apps url';

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(loginForm);
            const email = formData.get('Email');
            const password = formData.get('Password');

            fetch(`${loginScriptURL}?email=${email}&password=${password}`)
                .then(response => response.json())
                .then(data => {
                    if (data.result === "success") {
                        message.innerHTML = "Login Successful! Redirecting...";
                        setTimeout(() => window.location.href = "index.html", 2000);
                    } else {
                        message.innerHTML = "Invalid email or password.";
                    }
                })
                .catch(error => {
                    message.innerHTML = "Error: " + error.message;
                });
        });
    </script>
