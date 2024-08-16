"use client";                                  // to make this file client side only
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter } from "next/navigation";                // next/router is deprecated
import axios from "axios";                           // axios is a promise based HTTP client for the browser and node.js




export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
    });
    const [buttondisabled, setbuttondisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log(response.data);
            console.log("User signed up");
        }
        catch (error) {
            console.log("Error signing up: ", error);
        }
        finally {
            setLoading(false);
        }

    useEffect(() => {
        if(user.password.length > 0 && user.email.length > 0 && user.username.length > 0){
            setbuttondisabled(false);
        }
        else{
            setbuttondisabled(true)
        }
    }, [user]);


        
    return (
        <div className = "flex ">
            <h1 className = "text-center text-white text-2xl">Signup</h1>
            <input
                className="mb-4"
                type = "text"
                placeholder = "Username"
                value = {user.username}
                onChange = {(e) => setUser({...user, username: e.target.value})}
            />
            <input
                className="mb-4"
                type = "email"
                placeholder = "Email"
                value = {user.email}
                onChange = {(e) => setUser({...user, email: e.target.value})}
            />
            <input
                className="mb-4"
                type = "password"
                placeholder = "Password"
                value = {user.password}
                onChange = {(e) => setUser({...user, password: e.target.value})}
            />
            <button 
                className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick = {onSignup}>{ buttondisabled ? "no signup" : "signup" }</button>
            <Link href="/login">
                visit the login page
            </Link>
        </div>
    );
};
}