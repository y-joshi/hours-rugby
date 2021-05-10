import React, { useContext, useState } from 'react'
import { SidebarContext } from '../context/SidebarContext'
import {
  SearchIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from '../icons'
import { Avatar, Badge, Input, Dropdown, DropdownItem, WindmillContext } from '@windmill/react-ui'

function Header() {
  const { mode, toggleMode } = useContext(WindmillContext)
  const { toggleSidebar } = useContext(SidebarContext)

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen)
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">

          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === 'dark' ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
          {/* <!-- Notifications menu --> */}
          <li className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={handleNotificationsClick}
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <BellIcon className="w-5 h-5" aria-hidden="true" />
              {/* <!-- Notification badge --> */}
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
              ></span>
            </button>

            <Dropdown
              align="right"
              isOpen={isNotificationsMenuOpen}
              onClose={() => setIsNotificationsMenuOpen(false)}
            >
              <DropdownItem tag="a" href="#" className="justify-between">
                <span>Messages</span>
                <Badge type="danger">13</Badge>
              </DropdownItem>
              <DropdownItem tag="a" href="#" className="justify-between">
                <span>Sales</span>
                <Badge type="danger">2</Badge>
              </DropdownItem>
              <DropdownItem onClick={() => alert('Alerts!')}>
                <span>Alerts</span>
              </DropdownItem>
            </Dropdown>
          </li>
          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <Avatar
                className="align-middle"
                src="data:image/jpeg;base64,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"
                alt=""
                aria-hidden="true"
              />
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem tag="a" href="#">
                <OutlinePersonIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                <span>Profile</span>
              </DropdownItem>
              <DropdownItem tag="a" href="#">
                <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem onClick={() => alert('Log out!')}>
                <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                <span>Log out</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
