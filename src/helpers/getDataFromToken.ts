import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";



export const getDataFromToken = (request : NextRequest) => {
    try{
        const token = request.cookies.get("token")?.value || "";
        const data:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return data.id;
    }
    catch(error : any){
        return null;
    }

}