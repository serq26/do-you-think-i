import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useTheme } from "../contexts/ThemeContext";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({ userName, setLocale }) {
  const { theme, setTheme } = useTheme();
  const authentication = getAuth();

  const { t } = useTranslation();

  const navigation = [
    { name: t("menu_home"), href: "/", current: true },
    { name: t("menu_categories"), href: "/categories", current: false },
    { name: t("menu_addQuestion"), href: "/add-question", current: false },
    { name: t("menu_login"), href: "/login", current: false },
    { name: t("menu_signin"), href: "/signin", current: false },
  ];

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Disclosure as="nav" className="dark:bg-gray-900 bg-white drop-shadow-lg">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-0">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md dark:text-gray-400 text-gray-700 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <a href="/" title="Do You Think I">
                    <span className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-200">
                      Do You Think I
                    </span>
                  </a>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-700 text-white"
                            : "dark:text-gray-300 text-gray-600 hover:bg-gray-600 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <label className="swap swap-rotate mr-2">
                  <input type="checkbox" onChange={changeTheme} />
                  <svg
                    className="swap-on fill-current w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  <svg
                    className="swap-off fill-current w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
                <button
                  type="button"
                  className="dark:bg-gray-800 bg-white p-1 rounded-full dark:text-gray-400 text-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-7 w-7" aria-hidden="true" />
                </button>
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative z-50">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/#"
                            className={classNames(
                              active ? "dark:bg-gray-600 bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                            )}
                          >
                            {t("your_profile")}
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/#"
                            className={classNames(
                              active ? "dark:bg-gray-600 bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                            )}
                          >
                            {t("settings")}
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/#"
                            className={classNames(
                              active ? "dark:bg-gray-600 bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                            )}
                            onClick={() => {
                              authentication.signOut();
                              localStorage.removeItem("emailForSignIn");
                            }}
                          >
                            {t("sign_out")}
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <span className="text-white font-medium mx-2">{userName}</span>
                <strong className="mx-2"> | </strong>
                <div className="dropdown">
                  <div tabIndex={0} className="btn btn-ghost gap-1 normal-case">
                      <svg
                        className="inline-block h-4 w-4 fill-current md:h-5 md:w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 512 512"
                      >
                        <path d="M363,176,246,464h47.24l24.49-58h90.54l24.49,58H480ZM336.31,362,363,279.85,389.69,362Z"></path>
                        <path d="M272,320c-.25-.19-20.59-15.77-45.42-42.67,39.58-53.64,62-114.61,71.15-143.33H352V90H214V48H170V90H32v44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-32.68-43.44-47.14-75.88-47.33-76.22L143,152l-38,22,6.87,13.86c.89,1.56,17.19,37.9,54.71,86.57.92,1.21,1.85,2.39,2.78,3.57-49.72,56.86-89.15,79.09-89.66,79.47L64,368l23,36,19.3-11.47c2.2-1.67,41.33-24,92-80.78,24.52,26.28,43.22,40.83,44.3,41.67L255,362Z"></path>
                      </svg>
                  </div>
                  <div className="dropdown-content text-base-content rounded-t-box rounded-b-box top-px mt-12 w-56 overflow-y-auto shadow-2xl z-[50]">
                    <ul tabIndex={0} className="menu menu-compact gap-1 p-3">
                      <li>
                        <button className={`flex ${i18next.language === 'en' && 'active'}`} onClick={() => i18next.changeLanguage("en")}>
                          <svg
                            className="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 36 36"
                          >
                            <path
                              fill="#00247D"
                              d="M0 9.059V13h5.628zM4.664 31H13v-5.837zM23 25.164V31h8.335zM0 23v3.941L5.63 23zM31.337 5H23v5.837zM36 26.942V23h-5.631zM36 13V9.059L30.371 13zM13 5H4.664L13 10.837z"
                            />
                            <path
                              fill="#CF1B2B"
                              d="M25.14 23l9.712 6.801c.471-.479.808-1.082.99-1.749L28.627 23H25.14zM13 23h-2.141l-9.711 6.8c.521.53 1.189.909 1.938 1.085L13 23.943V23zm10-10h2.141l9.711-6.8c-.521-.53-1.188-.909-1.937-1.085L23 12.057V13zm-12.141 0L1.148 6.2C.677 6.68.34 7.282.157 7.949L7.372 13h3.487z"
                            />
                            <path
                              fill="#EEE"
                              d="M36 21H21v10h2v-5.836L31.335 31H32c1.117 0 2.126-.461 2.852-1.199L25.14 23h3.487l7.215 5.052c.093-.337.158-.686.158-1.052v-.058L30.369 23H36v-2zM0 21v2h5.63L0 26.941V27c0 1.091.439 2.078 1.148 2.8l9.711-6.8H13v.943l-9.914 6.941c.294.07.598.116.914.116h.664L13 25.163V31h2V21H0zM36 9c0-1.091-.439-2.078-1.148-2.8L25.141 13H23v-.943l9.915-6.942C32.62 5.046 32.316 5 32 5h-.663L23 10.837V5h-2v10h15v-2h-5.629L36 9.059V9zM13 5v5.837L4.664 5H4c-1.118 0-2.126.461-2.852 1.2l9.711 6.8H7.372L.157 7.949C.065 8.286 0 8.634 0 9v.059L5.628 13H0v2h15V5h-2z"
                            />
                            <path
                              fill="#CF1B2B"
                              d="M21 15V5h-6v10H0v6h15v10h6V21h15v-6z"
                            />
                          </svg>
                          <span className="flex flex-1 justify-between">
                            EN
                          </span>
                        </button>
                      </li>
                      <li>
                        <button className={`flex ${i18next.language === 'tr' && 'active'}`} onClick={() => i18next.changeLanguage("tr")}>
                          <svg
                            className="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 36 36"
                          >
                            <path
                              fill="#E30917"
                              d="M36 27c0 2.209-1.791 4-4 4H4c-2.209 0-4-1.791-4-4V9c0-2.209 1.791-4 4-4h28c2.209 0 4 1.791 4 4v18z"
                            />
                            <path
                              fill="#EEE"
                              d="M16 24c-3.314 0-6-2.685-6-6 0-3.314 2.686-6 6-6 1.31 0 2.52.425 3.507 1.138-1.348-1.524-3.312-2.491-5.507-2.491-4.061 0-7.353 3.292-7.353 7.353 0 4.062 3.292 7.354 7.353 7.354 2.195 0 4.16-.967 5.507-2.492C18.521 23.575 17.312 24 16 24zm3.913-5.77l2.44.562.22 2.493 1.288-2.146 2.44.561-1.644-1.888 1.287-2.147-2.303.98-1.644-1.889.22 2.494z"
                            />
                          </svg>
                          <span className="flex flex-1 justify-between">
                            TR
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <label className="swap">
                  <input type="checkbox" />
                  <div
                    className="swap-on"
                    onClick={() => i18next.changeLanguage("tr")}
                  >
                    TR
                  </div>
                  <div
                    className="swap-off"
                    onClick={() => i18next.changeLanguage("en")}
                  >
                    EN
                  </div>
                </label> */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
