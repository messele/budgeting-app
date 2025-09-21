import { Link, NavLink } from "react-router";

import React from "react";
import { Menubar, MenubarMenu } from "@radix-ui/react-menubar";
import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import { NavigationMenuItem, NavigationMenuList } from "./ui/navigation-menu";

export default function Header() {

  return (
    <div className="flex w-full">
    
      <div className="logo w-full flex min-h-8 px-5 py-2 text-3xl my-4 text-center">
        <Link className="text-center m-auto ml-0" to="/">budgeting App</Link>
      </div>
      {/* <nav className="nav flex text-xl p-5 m-5 w-[50%] gap-4">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/budgets">budgets</NavLink>
      </nav> */}
     <NavigationMenu className="m-auto">
      <NavigationMenuList>
        {MENU_ITEMS.map(item => 
          <NavigationMenuItem key={item.path}>
            <NavLink className={`text-2xl hover:text-blue-400 p-2`} to={item.path}>{item.label}</NavLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
     </NavigationMenu>
    </div>
  );
}

const MENU_ITEMS = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/budgets",
    label: "budgets",
  }
]