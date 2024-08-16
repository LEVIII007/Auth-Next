import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
    try {
        const id = await getDataFromToken(request);
        const user = await User.findById(id).select("-password");                   // select("-password") is used to exclude password from the response

        return NextResponse.json({ message : "User data", data : user });
 
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}