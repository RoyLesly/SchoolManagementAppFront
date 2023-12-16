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
    href: "/LecturersPages",
  },
  {
    navlabel: true,
    subheader: "Courses",
  },

  {
    id: uniqueId(),
    title: "Courses",
    icon: IconUserPlus,
    href: "/LecturersPages/PageLecturersCourses",
  },
  {
    navlabel: true,
    subheader: "Profiles",
  },

  {
    id: uniqueId(),
    title: "Profile",
    icon: IconUserPlus,
    href: "/LecturersPages/PageProfileLecturer",
  },
];

export default Menuitems;
