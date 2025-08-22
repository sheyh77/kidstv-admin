// import React, { useContext } from 'react';
// import { dashboardCardMap } from '../data/dashboardCardMap';
// import { Button, Popconfirm } from 'antd';
// import { AuthContext } from '../context/AuthContext';

// function Dashboard() {

//   const { Logout } = useContext(AuthContext)

//   const confirm = () => {
//     Logout()
//   };

//   return (
//     <section className="dashboard">
//       <div className="dashboard-about">
//         <h1 className="dashboard-title">Dashboard admin</h1>
//         <Popconfirm
//           placement='bottomRight'
//           title="Log out"
//           description="Rostdan ham chiqmoqchimisiz?"
//           onConfirm={confirm}
//           okText="Yes"
//           cancelText="No"
//         >
//           <Button danger>Log out</Button>
//         </Popconfirm>
//       </div>
// <div className="dashboard-card">
//   {
//     dashboardCardMap.map((Item) => (
//       <div className="dashboard-card-item" key={Item.id}>
//         <p className='dashboard-card-item-title'>{Item.title}</p>
//         <h1 className="dashboard-card-item-num">{Item.users_num}</h1>
//       </div>
//     ))
//   }
// </div>
//     </section>
//   )
// }

// export default Dashboard

import React, { useContext, useEffect, useState } from 'react';
import { Button, Popconfirm } from 'antd';
import { AuthContext } from '../context/AuthContext';
import { dashboardCardMap } from '../data/dashboardCardMap';
import Date from "../pages/Date"
import DashboardChart from './DashboardCharts';

function Dashboard() {
  const { Logout } = useContext(AuthContext);
  const [multCount, setMultCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const confirm = () => {
    Logout();
  };

  useEffect(() => {
    // multfilmlar soni
    fetch("https://ceed8a646c7fba8b.mokky.dev/multcard")
      .then(res => res.json())
      .then(data => {
        setMultCount(data.length);
      })
      .catch(err => console.error("Xato:", err));

    // foydalanuvchilar soni
    fetch("https://ceed8a646c7fba8b.mokky.dev/foydalanuvchi")
      .then(res => res.json())
      .then(data => {
        setUserCount(data.length);
      })
      .catch(err => console.error("Xato:", err));
  }, []);

  return (
    <section className="dashboard">
      <div className="dashboard-about">
        <h1 className="dashboard-title">Dashboard admin</h1>
        <Popconfirm
          placement='bottomRight'
          title="Log out"
          description="Rostdan ham chiqmoqchimisiz?"
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Log out</Button>
        </Popconfirm>
      </div>
      <div className="dashboard-card">
        {dashboardCardMap.map((item) => (
          <div className="dashboard-card-item" key={item.id}>
            <p className='dashboard-card-item-title'>{item.title}</p>
            <h1 className="dashboard-card-item-num">{item.users_num}</h1>
          </div>
        ))}
        {/* Multfilmlar soni */}
        <div className="dashboard-card-item">
          <p className='dashboard-card-item-title'>Barcha multfilmlar</p>
          <h1 className="dashboard-card-item-num">{multCount}</h1>
        </div>
        {/* Foydalanuvchilar soni */}
        <div className="dashboard-card-item">
          <p className='dashboard-card-item-title'>Ro‘yxatdan o‘tgan foydalanuvchilar</p>
          <h1 className="dashboard-card-item-num">{userCount}</h1>
        </div>
        <div className="dashboard-date">
          <Date />
        </div>
      </div>
      <div className="dashboard-charts">
        <DashboardChart />
      </div>
    </section>
  );
}

export default Dashboard;