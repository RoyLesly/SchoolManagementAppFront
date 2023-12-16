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
    href: "/StudentsPages",
  },
  {
    navlabel: true,
    subheader: "Results",
  },
  {
    id: uniqueId(),
    title: "Results",
    icon: IconUserPlus,
    href: "/StudentsPages/PageStudentResults",
  },
  {
    navlabel: true,
    subheader: "Profiles",
  },
  {
    id: uniqueId(),
    title: "Profile",
    icon: IconUserPlus,
    href: "/StudentsPages/PageProfileStudent",
  },
];

export default Menuitems;
