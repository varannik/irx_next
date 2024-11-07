
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req:NextApiRequest,  res:NextApiResponse ) {

  // Get the user's session
  const session = await getSession({ req });

  if (!session) {

    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Authorized: Proceed with the API logic
  return res.status(200).json({ message: 'Protected data', user: session.user });

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



