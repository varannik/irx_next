'use client'
import { Container } from "@/components/Container";
import { Forecast } from "@/components/Forecast";
import { Card } from "@/components/UI/cardTremor";
import SpinerIcon from "@/components/UI/icons/Spinner";
import useSelectedAsset from "@/stores/useSelectedAssetStore";
import { Input, Slider, SliderValue } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";



export default function Home() {
  const [currentRate, setCurrentRate] = useState(null)
  const [percent, setPercent] = useState<SliderValue>(0)
  const [newPercent, setNewPercent] = useState<SliderValue>(0)
  const [newValue, setNewValue] = useState('0')
  const [currentData, setcurrentData] = useState(null)
  const { currentAsset } = useSelectedAsset()
  const { data: session, status } = useSession()

  const today = new Date();
  const currentDay = today.toISOString().split('T')[0];
  today.setDate(today.getDate() + 1); // Adds one day
  const nextDay = today.toISOString().split('T')[0];

  function userEmail(status: string) {
    if (status === "authenticated" && session !== null) {
      return session.user?.email
    } else {
      return "No Profile founded"
    }
  }

  // useEffect(() => {
  //   async function checkSession() {
  //     const session = await getServerSession(authOptions);
  //     if (!session) {
  //       // Handle unauthorized access, such as redirecting to a login page
  //       console.log('kos amat')
  //     }else{
  //       console.log(session)
  //     }
  //   }
  //   checkSession();
  // }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics/current');
        if (!response.ok) {

          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        const data = result[0].currentrate;
        setcurrentData(data)

      } catch (error) {
        console.log('Current data is not reachable');
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics/current');
        if (!response.ok) {

          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        const data = result[0].currentrate;
        setcurrentData(data)

      } catch (error) {
        console.log('Current data is not reachable');
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    if (currentData !== null) {
      let cr = currentData[String(currentAsset.name)]['price']['sell']
      setCurrentRate(cr)
      setNewValue(String(cr))
    }
  }, [currentData, currentAsset])



  useEffect(() => {
    let newv = Number(currentRate) + (Number(currentRate) * (Number(percent) / 100))
    setNewValue(String(newv))
  }, [percent, currentRate])



  useEffect(() => {
    if (currentRate !== null) {
      let newp = (Number(currentRate) - Number(newValue)) / Number(currentRate) * 100 * -1
      setNewPercent(newp)
    }

  }, [currentData, newValue])


  if (currentRate == null || newPercent == null) {
    return (
      <Card  >
        <SpinerIcon />
      </Card>
    )
  }

  return (
    <>
      <Container className="flex items-center justify-center  mt-9 mb-9 ">
        <div className="flex flex-col max-w-2xl  gap-3">
          <Forecast />
          <Card>
            <div>
              <div>
                  Profile :
              </div>
              <div>
                  {userEmail(status)}
              </div>
            </div>


            <div>
              Current Date:
            </div>
            <div>
              {currentDay}
            </div>


            <div>
              Your prediction for:
            </div>
            <div>
              {nextDay}
            </div>


            <div>
              Asset
            </div>
            <div>
              {currentAsset.name}
            </div>


            <div>
              <Input className=""
                min={Number(currentRate) - (Number(currentRate) * .05)}
                max={Number(currentRate) + (Number(currentRate) * .05)}

                type="number"
                label="Rate"
                placeholder="0.0"
                labelPlacement="outside"
                value={newValue}
                step={100}
                onValueChange={setNewValue}
                classNames={{
                  input: "border-none border-0"
                }}
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">IRR</span>
                  </div>
                }
              />
              <Slider
                label="Rate Shift %"
                value={newPercent}
                onChange={setPercent}
                color={"primary"}
                size="sm"
                step={0.2}
                maxValue={5}
                minValue={-5}
                fillOffset={0}
                defaultValue={0}
                className="max-w-md"
                formatOptions={{ signDisplay: 'always' }}
              />
            </div>
          </Card>
        </div>

      </Container>
    </>
  );
}