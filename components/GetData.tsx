// pages/ssg.js
import React from 'react';

export async function getStaticProps() {
  const res = await fetch('http://172.19.0.6:3000/api/analytics/current');
  const data = await res.json();
  const keys = Object.keys(data[0].currentrate);

  return { props: { data } };
}

const SSGPage = ({ data }) => {
  return (
    <div>
      <h1>Static Site Generation</h1>
    </div>
  );
};

export default SSGPage;