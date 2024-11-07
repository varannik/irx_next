// app/api/maxmin/route.ts
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/utils/db'
// import User from '@/models/User';
// import { getSession } from 'next-auth/react';


export async function GET(req:NextApiRequest,  res:NextApiResponse ) {

  // Get the user's session
  const session = await getSession({ req });
  console.log(session)
  if (!session) {
    console.log('Bega')
    return NextResponse.json({ message: 'User dosent exist'}, { status: 404 });
  }
  console.log(session)
  // Authorized: Proceed with the API logic
  return NextResponse.json({ message: 'Protected data', user: session.user }, { status: 200 });



}




// export default async function handler(req:NextApiRequest, res:NextApiResponse) {
//   // Retrieve the session
//   const session = await getSession({ req });

//   if (!session) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   // Authorized: Proceed with the API logic
//   res.status(200).json({ message: 'Protected data', user: session.user });
// }



