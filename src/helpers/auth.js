import { API } from "./backend"; // Importing API endpoint

// Sign Up

export const vendor_signup = (user) => {
    return fetch(`${API}/vendor_signup`, {
        method: "POST",
        body: user,
    })
        .then(r => r.json())
        .catch(e => e)
};

// Sign In

export const signin = (user) => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((response) => response.json())
        .catch((err) => err);
};

// Save JWT to Local Storage

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

// Is Authenticated Check

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};

// Sign Out

export const signout = (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");

        return fetch(`${API}/signout`, {
            method: "GET",
        })
            .then((response) => response.json())
            .catch((err) => console.log(err));
    }
    next();
};

// verify OTP

export const verify_otp = ({ contact_no, otp }) => {
    return fetch(`${API}/verify_otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact_no: +contact_no, otp: +otp })
    })
        .then(r => r.json())
        .catch((e) => e)
};