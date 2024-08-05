'use client';

import { usePathname } from 'next/navigation';//Para ressaltar el link activo.
import clsx from 'clsx';//Para aplicar estilos condicionalmente. Los dos se usan para resaltar el link activo
import Link from 'next/link';

import { 
    UserGroupIcon, 
    HomeIcon,
    //Añadir iconos segun necesario aca.
} from '@heroicons/react/24/outline';

const links = [
    { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
    { name: 'Becarios', href: '/dashboard/scholars', icon: UserGroupIcon },
    //Añadir linnks segun necesario aca.
];

export default function SideNavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link key={link.name} href={link.href} className={clsx(
            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 text-blue-900 p-3 text-sm font-medium hover:bg-orange-200 hover:text-blue-900 md:flex-none md:justify-start md:p-2 md:px-3',
            {
              'bg-orange-200': pathname === link.href, //esto se aplica cuando el link esta activo
            },
          )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
