'use client'

import { User } from '@/common/models'
import { useAuth } from '@/context/auth/auth-context'
import getMe from '@/context/auth/get-me'
import { SidebarProvider, useSidebar } from '@/context/SidebarContext'
import AppHeader from '@/layout/tailAdmin/AppHeader'
import AppSidebar from '@/layout/tailAdmin/AppSidebar'
import Backdrop from '@/layout/tailAdmin/Backdrop'
import React from 'react'

export default function AdminLayoutContent({
  user,
  children,
}: {
  user: User | null
  children: React.ReactNode
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar()

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? 'ml-0'
    : isExpanded || isHovered
      ? 'lg:ml-[290px]'
      : 'lg:ml-[90px]'

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader user={user} />
        {/* Page Content */}
        <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
