import React, { useContext } from 'react';
import { dashboardCardMap } from '../data/dashboardCardMap';
import { Button, Popconfirm } from 'antd';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {

  const { Logout } = useContext(AuthContext)

  const confirm = () => {
    Logout()
  };

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
        {
          dashboardCardMap.map((Item) => (
            <div className="dashboard-card-item" key={Item.id}>
              <p className='dashboard-card-item-title'>{Item.title}</p>
              <h1 className="dashboard-card-item-num">{Item.users_num}</h1>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default Dashboard