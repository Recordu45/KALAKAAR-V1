/* ==========================================
   KALAKAAR AUTHENTICATION
   Supabase Login / Register
========================================== */

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


/* ==========================================
   MESSAGE
========================================== */

function showAuthMessage(message, success = false) {

    const box =
        document.getElementById("authMessage");

    if (!box) return;

    box.textContent = message;

    box.style.color =
        success
            ? "#6effb0"
            : "#ff829a";
}


/* ==========================================
   LOGIN
========================================== */

async function loginUser(event) {

    event.preventDefault();

    const email =
        document.getElementById("email")
            .value
            .trim();

    const password =
        document.getElementById("password")
            .value;

    if (!email || !password) {

        showAuthMessage(
            "Email and password required."
        );

        return;
    }


    showAuthMessage(
        "Logging in...",
        true
    );


    const {
        data,
        error
    } =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });


    if (error) {

        showAuthMessage(
            error.message
        );

        return;
    }


    showAuthMessage(
        "Login successful. Opening Kalakaar...",
        true
    );


    setTimeout(() => {

        window.location.href =
            "index.html";

    }, 700);
}


/* ==========================================
   REGISTER
========================================== */

async function registerUser() {

    const email =
        prompt(
            "Enter your email address:"
        );

    if (!email) return;


    const password =
        prompt(
            "Create a password (minimum 6 characters):"
        );

    if (!password) return;


    if (password.length < 6) {

        alert(
            "Password must be at least 6 characters."
        );

        return;
    }


    showAuthMessage(
        "Creating your Kalakaar account...",
        true
    );


    const {
        data,
        error
    } =
        await supabaseClient.auth.signUp({
            email: email,
            password: password
        });


    if (error) {

        showAuthMessage(
            error.message
        );

        return;
    }


    if (data.user) {

        showAuthMessage(
            "Account created! Check your email to verify your account.",
            true
        );

    }

}


/* ==========================================
   LOGIN FORM
========================================== */

const loginForm =
    document.getElementById(
        "loginForm"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        loginUser
    );

}


/* ==========================================
   CHECK EXISTING SESSION
========================================== */

async function checkAuthSession() {

    const {
        data
    } =
        await supabaseClient.auth.getSession();


    if (data.session) {

        console.log(
            "Kalakaar user logged in:",
            data.session.user.email
        );

    }

}


checkAuthSession();
