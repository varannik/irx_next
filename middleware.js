
import { NextResponse } from "next/server"

export default function (request){
    console.log('Running')
    return NextResponse.next()
}