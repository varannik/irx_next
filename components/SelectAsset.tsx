
export default async function SelectAsset() {

  const res = await fetch('http://172.19.0.6:3000/api/analytics/countries')
                      .then(res => res.json())
                      .then(data => {
                         const assets = data[0].XE
                         console.log(assets)
                        })
                      .catch(rejected => {
                          console.log(rejected);
                      });
  return ()
}



