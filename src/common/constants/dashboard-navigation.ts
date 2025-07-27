import {
  BriefcaseIcon,
  GridIcon,
  GroupIcon,
  List,
  ListIcon,
  SearchCheckIcon,
  UserCircleIcon,
} from 'lucide-react'

export type NavItem = {
  name: string
  icon: React.ComponentType
  path?: string
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[]
}

export const navItems: NavItem[] = [
  {
    icon: GridIcon,
    name: 'Dashboard',
    path: '/',
    // subItems: [{ name: 'Ecommerce', path: '/', pro: false }],
  },
  {
    icon: BriefcaseIcon,
    name: 'Vacancies',
    path: '/vacancies',
  },
  // {
  //   icon: GroupIcon,
  //   name: 'Candidates',
  //   path: '/candidates',
  //   // subItems: [{ name: 'Form Elements', path: '/form-elements', pro: false }],
  // },
  {
    icon: UserCircleIcon,
    name: 'User Profile',
    path: '/profile',
  },

  //   {
  //     name: 'Tables',
  //     icon: TableIcon,
  //     subItems: [{ name: 'Basic Tables', path: '/basic-tables', pro: false }],
  //   },
  //   {
  //     name: 'Pages',
  //     icon: PageIcon,
  //     subItems: [
  //       { name: 'Blank Page', path: '/blank', pro: false },
  //       { name: '404 Error', path: '/error-404', pro: false },
  //     ],
  //   },
]

export const recruiterNavItems: NavItem[] = [
  {
    icon: GridIcon,
    name: 'Dashboard',
    path: '/',
    // subItems: [{ name: 'Ecommerce', path: '/', pro: false }],
  },
  {
    icon: BriefcaseIcon,
    name: 'Vacancies',
    path: '/vacancies',
  },
  {
    icon: GroupIcon,
    name: 'Candidates',
    path: '/candidates',
    // subItems: [{ name: 'Form Elements', path: '/form-elements', pro: false }],
  },
  {
    icon: SearchCheckIcon,
    name: 'Explore Longlister',
    path: '/explore',
  },
  {
    icon: UserCircleIcon,
    name: 'User Profile',
    path: '/profile',
  },

  //   {
  //     name: 'Tables',
  //     icon: TableIcon,
  //     subItems: [{ name: 'Basic Tables', path: '/basic-tables', pro: false }],
  //   },
  //   {
  //     name: 'Pages',
  //     icon: PageIcon,
  //     subItems: [
  //       { name: 'Blank Page', path: '/blank', pro: false },
  //       { name: '404 Error', path: '/error-404', pro: false },
  //     ],
  //   },
]

export const othersItems: NavItem[] = [
  //   {
  //     icon: PieChartIcon,
  //     name: 'Charts',
  //     subItems: [
  //       { name: 'Line Chart', path: '/line-chart', pro: false },
  //       { name: 'Bar Chart', path: '/bar-chart', pro: false },
  //     ],
  //   },
  //   {
  //     icon: BoxCubeIcon,
  //     name: 'UI Elements',
  //     subItems: [
  //       { name: 'Alerts', path: '/alerts', pro: false },
  //       { name: 'Avatar', path: '/avatars', pro: false },
  //       { name: 'Badge', path: '/badge', pro: false },
  //       { name: 'Buttons', path: '/buttons', pro: false },
  //       { name: 'Images', path: '/images', pro: false },
  //       { name: 'Videos', path: '/videos', pro: false },
  //     ],
  //   },
  {
    icon: ListIcon,
    name: 'Invoices',
    path: '/invoices',
  },
]
