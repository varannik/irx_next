
import { Container } from '@/components/Container'
import UserStats from '@/components/UserStats'
// import SelectAsset from '@/components/SelectAsset'
import SSGPage , {getStaticProps} from '@/components/GetData'
import AssetsList from '@/components/UI/assetslist';

const data = getStaticProps()


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


