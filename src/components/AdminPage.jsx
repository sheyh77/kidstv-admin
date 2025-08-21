import React, { useState } from 'react';
import DashboardIcon from '../assets/svg/DashboardIcon';
import BrainPlayerIcon from '../assets/svg/BrainPlayerIcon';
import HomePageIcon from "../assets/svg/HomePageIcon";
import MultIcon from "../assets/svg/MultIcon";
import Dashboard from "../pages/Dashboard";
import Brain from "../pages/Brain";
import HomePage from "../pages/HomePage";
import MultCard from "../pages/MultCard";

function AdminPage() {

  const [active, setActive] = useState("admin");

  return (
    <section className="admin">
      <div className="admin-menu">
        <h1 className="admin-menu-title">Multi Kids</h1>

        <div className="admin-image">
          <div className="admin-img">
            <img src="" alt="" />
          </div>
          <p className="admin-image-title">Shahriyor</p>
        </div>

        <div className={`admin-menu-page ${active === "admin" ? "active" : ""}`} onClick={() => setActive("admin")}>
          <DashboardIcon />
          <p className="admin-menu-page-title">Dashboard</p>
        </div>
        <div className={`admin-menu-page ${active === "brain_mult" ? "active" : ""}`} onClick={() => setActive("brain_mult")}>
          <BrainPlayerIcon />
          <p className="admin-menu-page-title">Brain mult</p>
        </div>
        <div className={`admin-menu-page ${active === "home_add" ? "active" : ""}`} onClick={() => setActive("home_add")}>
          <HomePageIcon />
          <p className="admin-menu-page-title">Home add</p>
        </div>
        <div className={`admin-menu-page ${active === "mult-add" ? "active" : ""}`} onClick={() => setActive("mult_add")}>
          <MultIcon />
          <p className="admin-menu-page-title">Mult add</p>
        </div>
      </div>
      <div className="admin-content">
        {
          active === "admin" && (
            <Dashboard />
          )
        }
        {
          active === "brain_mult" && (
            <Brain />
          )
        }
        {
          active === "home_add" && (
            <HomePage />
          )
        }
        {
          active === "mult_add" && (
            <MultCard />
          )
        }
      </div>
    </section>
  )
}

export default AdminPage