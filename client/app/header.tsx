import { NavLink } from "react-router";

import React from "react";

export default function Header() {
  return (
    <div className="header m-2 flex">
    
      <div className="logo w-full flex min-h-8 px-5 py-2 text-5xl my-4">
        budgeting App
      </div>
      <nav className="nav flex text-xl p-5 m-5 w-[50%] gap-4">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/budgets">budgets</NavLink>
      </nav>
    </div>
  );
}
