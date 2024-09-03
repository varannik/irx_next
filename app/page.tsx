import CheapestDayofTheWeek from '@/components/CheapestDayofTheWeek';
import { Container } from '@/components/Container'
import MaxMinGauge from '@/components/GaugeChart';

export default function Home() {

  return (
          <>
            <Container className="mt-9 ">
              <div className="max-w-2xl">
                <MaxMinGauge />
                <CheapestDayofTheWeek />
              </div>
            </Container>
          </>
  );
}


