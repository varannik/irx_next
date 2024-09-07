import CheapestDayofTheWeek from '@/components/CheapestDayofTheWeek';
import { Container } from '@/components/Container'
import MaxMinGauge from '@/components/GaugeChart';
import { SimpleTrend } from '@/components/SimpleTrend';

export default function Home() {

  return (
          <>
            <Container className="mt-9 mb-9 ">
              <div className="flex flex-col max-w-2xl gap-3">
                <SimpleTrend />
                <MaxMinGauge />
                <CheapestDayofTheWeek />
              </div>
            </Container>
          </>
  );
}


