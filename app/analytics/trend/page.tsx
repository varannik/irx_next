import { Container } from '@/components/Container'

import { PeriodTrends } from '@/components/PeriodTrends';


export default function Trend() {

  return (
          <>
            <Container className="flex items-center justify-center  mt-9 mb-9 ">
              <div className="flex flex-col max-w-2xl  gap-3">
                <PeriodTrends/>
              </div>
            </Container>
          </>
  );
}