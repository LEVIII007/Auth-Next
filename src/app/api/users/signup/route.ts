import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";              // just like request and response in express
import bcrypt from "bcrypt";   


connect();                       // bcrypt is a password hashing function

export async function POST(request: NextRequest) {
    try {
        const {username, email, password} = await request.json();
        if (!username || !email || !password) {
            return NextResponse.json({error: "Please provide all fields"}, {status: 400});
        }
        console.log("User: ", username, email, password);

        await User.findOne({email}).then((user) => {
            if (user) {
                return NextResponse.json({error: "User already exists"}, {status: 400});
            }
    });

        // Hash password
        const salt = await bcrypt.genSalt(10);                                 //creating a salt
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password : hashedPassword,
        })
        const savedUser = await newUser.save()
        console.log(savedUser);

        return NextResponse.json({
            message : "User"
        })


    } catch (error) {
        console.log("Error signing up: ", error);
        return NextResponse.json({error: "Error signing up"}, {status: 500});
    }
}