import React from 'react'
import { dashboardCardMap } from '../data/dashboardCardMap'
import Item from 'antd/es/list/Item'

function Dashboard() {
  return (
    <section className="dashboard">
      <h1 className="dashboard-title">Dashboard admin</h1>
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