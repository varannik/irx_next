
import { Container } from '@/components/Container'
import MaxMin from '@/components/MaxMin';

export default function Home() {

  return (
          <>
            <Container className="flex items-center justify-center  mt-9 mb-9 ">
              <div className="flex flex-col max-w-2xl  gap-3">
                <MaxMin />
              </div>
            </Container>
          </>
  );
}
