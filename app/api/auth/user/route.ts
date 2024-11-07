
// import { getSession } from 'next-auth/react';
// import { NextApiRequest, NextApiResponse } from 'next';

// export async function GET(req:NextApiRequest,  res:NextApiResponse ) {

//   // Get the user's session
//   const session = await getSession({ req });

//   if (!session) {

//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   // Authorized: Proceed with the API logic
//   return res.status(200).json({ message: 'Protected data', user: session.user });

// }



import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(
    { message: 'Protected data', user: session.user },
    { status: 200 }
  );
}

