

import { Container } from '@/components/Container'

import UserStats from '@/components/UserStats'


export default function Home() {

  return (
          <>
            <Container className="mt-9">
              <div className="max-w-2xl">
              <UserStats />
              </div>
            </Container>
          </>
  );
}


