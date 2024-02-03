import React from "react";
import { BsCircle } from "react-icons/bs";


const user = localStorage.getItem("user")
const isAdmin = JSON.parse(user)?.userDetials.Role
console.log(isAdmin);
export const SidebarData = [];

if (isAdmin == 2) {
  SidebarData.push({
    title: "Admin",
    path: "/dashboard/admin",
    icon: <BsCircle />,
  },

    {
      title: "Users",
      path: "/dashboard/user",
      icon: <BsCircle />,

    },)
} else {
  SidebarData.push({
    title: "Home",
    path: "Home",
    icon: <BsCircle />,
  },

    {
      title: "Setting",
      path: "/setting",
      icon: <BsCircle />,

    }
    ,
    {
      title: "Setting",
      path: "/setting",
      icon: <BsCircle />,

    }
  )
}