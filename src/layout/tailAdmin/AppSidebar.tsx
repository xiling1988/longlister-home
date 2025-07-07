'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/context/SidebarContext'
import fullLogoRed from '@/images/full_logo_red.png'
import listLogoRed from '@/images/list_logo_red.png'
import { ChevronDownIcon, HorizontaLDots } from '../../icons'
import { useAuth } from '@/context/auth/auth-context'
import {
  NavItem,
  navItems,
  recruiterNavItems,
  othersItems,
} from '@/common/constants'

// type NavItem = {
//   name: string
//   icon: React.ReactNode
//   path?: string
//   subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[]
// }

// const navItems: NavItem[] = [
//   {
//     icon: <GridIcon />,
//     name: 'Dashboard',
//     path: '/vacancies',
//     // subItems: [{ name: 'Ecommerce', path: '/', pro: false }],
//   },
//   {
//     icon: <Briefcase />,
//     name: 'Vacancies',
//     path: '/vacancies',
//   },
//   {
//     icon: <GroupIcon />,
//     name: 'Candidates',
//     path: '/candidates',
//     // subItems: [{ name: 'Form Elements', path: '/form-elements', pro: false }],
//   },
//   {
//     icon: <UserCircleIcon />,
//     name: 'User Profile',
//     path: '/profile',
//   },

//   {
//     name: 'Tables',
//     icon: <TableIcon />,
//     subItems: [{ name: 'Basic Tables', path: '/basic-tables', pro: false }],
//   },
//   {
//     name: 'Pages',
//     icon: <PageIcon />,
//     subItems: [
//       { name: 'Blank Page', path: '/blank', pro: false },
//       { name: '404 Error', path: '/error-404', pro: false },
//     ],
//   },
// ]

// const othersItems: NavItem[] = [
//   {
//     icon: <PieChartIcon />,
//     name: 'Charts',
//     subItems: [
//       { name: 'Line Chart', path: '/line-chart', pro: false },
//       { name: 'Bar Chart', path: '/bar-chart', pro: false },
//     ],
//   },
//   {
//     icon: <BoxCubeIcon />,
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
//   {
//     icon: <PlugInIcon />,
//     name: 'Authentication',
//     subItems: [
//       { name: 'Sign In', path: '/signin', pro: false },
//       { name: 'Sign Up', path: '/signup', pro: false },
//     ],
//   },
// ]

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar()
  const pathname = usePathname()
  const { user } = useAuth()

  const navigationItems =
    user?.userType === 'recruiter' ? recruiterNavItems : navItems

  const renderMenuItems = (
    navigationItems: NavItem[],
    menuType: 'main' | 'others',
  ) => (
    <ul className="flex flex-col gap-4">
      {navigationItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`group menu-item ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? 'menu-item-active'
                  : 'menu-item-inactive'
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? 'lg:justify-center'
                  : 'lg:justify-start'
              }`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? 'menu-item-icon-active'
                    : 'menu-item-icon-inactive'
                }`}
              >
                {(() => {
                  const IconComponent = nav.icon
                  return <IconComponent />
                })()}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto h-5 w-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? 'rotate-180 text-brand-500'
                      : ''
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`group menu-item ${
                  isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? 'menu-item-icon-active'
                      : 'menu-item-icon-inactive'
                  }`}
                >
                  {(() => {
                    const IconComponent = nav.icon
                    return <IconComponent />
                  })()}
                  {/* {nav.icon} */}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : '0px',
              }}
            >
              <ul className="mt-2 ml-9 space-y-1">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? 'menu-dropdown-item-active'
                          : 'menu-dropdown-item-inactive'
                      }`}
                    >
                      {subItem.name}
                      <span className="ml-auto flex items-center gap-1">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? 'menu-dropdown-badge-active'
                                : 'menu-dropdown-badge-inactive'
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? 'menu-dropdown-badge-active'
                                : 'menu-dropdown-badge-inactive'
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  )

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: 'main' | 'others'
    index: number
  } | null>(null)
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({})
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // const isActive = (path: string) => path === pathname;
  const isActive = useCallback((path: string) => path === pathname, [pathname])

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false
    ;['main', 'others'].forEach((menuType) => {
      const items = menuType === 'main' ? navigationItems : othersItems
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as 'main' | 'others',
                index,
              })
              submenuMatched = true
            }
          })
        }
      })
    })

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null)
    }
  }, [pathname, isActive])

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }))
      }
    }
  }, [openSubmenu])

  const handleSubmenuToggle = (index: number, menuType: 'main' | 'others') => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null
      }
      return { type: menuType, index }
    })
  }

  return (
    <aside
      className={`fixed top-0 left-0 z-50 mt-16 flex h-screen flex-col border-r border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out lg:mt-0 dark:border-gray-800 dark:bg-gray-900 ${
        isExpanded || isMobileOpen
          ? 'w-[290px]'
          : isHovered
            ? 'w-[290px]'
            : 'w-[90px]'
      } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex py-8 ${
          !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-center'
        }`}
      >
        <Link href="/home">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src={fullLogoRed}
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="mx-auto hidden dark:block"
                src={fullLogoRed}
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image src={listLogoRed} alt="Logo" width={32} height={32} />
          )}
        </Link>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 flex text-xs leading-[20px] text-gray-400 uppercase ${
                  !isExpanded && !isHovered
                    ? 'lg:justify-center'
                    : 'justify-start'
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  'Menu'
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(navigationItems, 'main')}
            </div>

            <div className="">
              <h2
                className={`mb-4 flex text-xs leading-[20px] text-gray-400 uppercase ${
                  !isExpanded && !isHovered
                    ? 'lg:justify-center'
                    : 'justify-start'
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  'Others'
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, 'others')}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  )
}

export default AppSidebar
