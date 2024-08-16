import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import {NextResponse, NextRequest} from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"; 


connect();

export async function POST(request: NextRequest) {
    try {
        const {email, password} = await request.json();
        if (!email || !password) {
            return NextResponse.json({error: "Please provide all fields"}, {status: 400});
        }

        console.log("User: ", email, password);

        await User.findOne({email}).then((user) => {
            if (user) {
                const validpassword = await bcrypt.compare(password, user.password);
                if(validpassword){
                    const tokendata = {
                        id : user._id,
                        email : user.email,
                        username : user.username
                    }
                    const token = jwt.sign(tokendata, process.env.JWT_SECRET!, {expiresIn: "1d"});
                    console.log("User logged in");
                    const response = NextResponse.json({
                        message : "User logged in",
                        success : true,
                    });
                    response.cookies.set("token", token, {
                        httpOnly : true,
                    }
                    )
                    return response;
            }
                else{
                    return NextResponse.json({
                        error : "wrong password"
                    },{ status : 400})
                }
            }
            else{
                return NextResponse.json({
                    message : "User does not exist"
                })
            }
        });
    }
    catch (error){
            console.log("Error signing up: ", error);
            return NextResponse.json({error: "Error loggin in"}, {status: 500});
    };
}