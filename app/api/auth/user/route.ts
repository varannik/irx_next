import { authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log('ridi')
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  
  return NextResponse.json(
    { message: 'Protected data', user: session.user },
    { status: 200 }
  );
}

