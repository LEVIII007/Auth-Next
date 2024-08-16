"use client";                                  // to make this file client side only
import Link from "next/link";
import React, { useEffect } from "react";

import {useRouter } from "next/navigation";                // next/router is deprecated
import axios from "axios";                              // axios is a promise based HTTP client for the browser and node.js




export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = React.useState(false);
    const [buttondisabled, setbuttondisabled] = React.useState(false);
    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log(response.data);
            router.push("/profile");

        }
        catch (error : any) {
            console.log("Error signing up: ", error);
        }
        finally {
            setLoading(false);
        }

    useEffect(() => {
        if(user.password.length > 0 && user.email.length > 0){
            setbuttondisabled(false);
        }
        else{
            setbuttondisabled(true)
        }
    }, [user]);
        
    return (
        <div className = "flex ">
            <h1 className = "text-center text-white text-2xl">{loading ? "processing" : "login " }</h1>
            
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
            onClick = {onLogin}>{ buttondisabled ? "not login" : "login" }</button>
            <Link href="/login">
                <a className = "text-blue-500 hover:text-blue-800">Login</a>
                visit the Signup page
            </Link>
        </div>
    );
};
}