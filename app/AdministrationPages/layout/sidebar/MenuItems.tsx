import { AdminUrl } from "@/Utils/Config";
import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/AdministrationPages",
  },
  {
    id: uniqueId(),
    title: "Results",
    icon: IconLayoutDashboard,
    href: "/AdministrationPages/PageResults",
  },

  {
    navlabel: true,
    subheader: "Profiles",
  },
  {
    id: uniqueId(),
    title: "Lecturers",
    icon: IconUserPlus,
    href: "/AdministrationPages/PageLecturers",
  },
  {
    id: uniqueId(),
    title: "Students",
    icon: IconUserPlus,
    href: "/AdministrationPages/PageStudents",
  },
  {
    id: uniqueId(),
    title: "Users",
    icon: IconUserPlus,
    href: "/AdministrationPages/PageUsers",
  },


  {
    navlabel: true,
    subheader: "settings",
  },
  {
    id: uniqueId(),
    title: "Settings",
    icon: IconTypography,
    href: "/AdministrationPages/PageSettings",
  },
  {
    id: uniqueId(),
    title: "Permissions",
    icon: IconCopy,
    href: "/AdministrationPages/PagePermissions",
  },
  {
    id: uniqueId(),
    title: "Admin",
    icon: IconCopy,
    href: AdminUrl,
  },
];

export default Menuitems;
