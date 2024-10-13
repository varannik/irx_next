import { Container } from '@/components/Container'

import { PredictNextDay } from '@/components/PredictNextDay';


export default function Trend() {

  return (
          <>
            <Container className="flex items-center justify-center  mt-9 mb-9 ">
              <div className="flex flex-col max-w-2xl  gap-3">
              <PredictNextDay />
              </div>
            </Container>
          </>
  );
}