// This file is frontend/components/Sidebar.tsx
"use client"; // This component needs to be a client component

import {
  BookOpenIcon,
  CommandLineIcon,
  DocumentArrowUpIcon,
  ShieldCheckIcon,
  SparklesIcon, // Added for the logo
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Hook to read the current URL

// Helper function to combine class names
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
  const pathname = usePathname(); // Get the current path

  const navigation = [
    // This is the link to our main dashboard page
    { name: 'AI Generator', href: '/dashboard', icon: CommandLineIcon },
    // These links don't go anywhere yet
    { name: 'Upload Spec', href: '/upload', icon: DocumentArrowUpIcon },
    { name: 'Rules & Linter', href: '/rules', icon: ShieldCheckIcon },
    { name: 'API Docs', href: '/docs', icon: BookOpenIcon },
  ];

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 w-72">
      {/* Logo/Link back to the landing page */}
      <Link href="/" className="flex h-16 shrink-0 items-center">
        <SparklesIcon className="h-8 w-auto text-yellow-400" />
        <span className="text-2xl font-bold text-white ml-2">SpecForge</span>
      </Link>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      // Check if the current URL matches the item's href
                      pathname === item.href
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}