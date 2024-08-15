'use client';

import { usePathname } from 'next/navigation';//Para ressaltar el link activo.
import clsx from 'clsx';//Para aplicar estilos condicionalmente. Los dos se usan para resaltar el link activo
import Link from 'next/link';
import GroupIcon from '@mui/icons-material/Group';
import BuildIcon from '@mui/icons-material/Build';
import HomeIcon from '@mui/icons-material/Home';

const linksadmin = [
    { name: 'Inicio', href: '/dashboard/home', icon: HomeIcon },
    { name: 'Proyectos', href: '/dashboard/projects', icon: HomeIcon },
    { name: 'Gestión de Usuarios', href: '/dashboard/usermanagement', icon: GroupIcon },
    { name: 'Gestion de Parametros', href: '/dashboard/paramsmanagement', icon: BuildIcon },
    
    //Añadir links segun necesario aca.
];

const linksscholar = [
  { name: 'Inicio', href: '/dashboard/home', icon: HomeIcon },
  
  //Añadir links segun necesario aca.
];

const linksguest = [
  { name: 'Inicio', href: '/dashboard/home', icon: HomeIcon },
  
  //Añadir links segun necesario aca.
];

export function SideNavLinksAdmin() {
  const pathname = usePathname();
  return (
    <>
      {linksadmin.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`); // Verifica si el pathname es igual o comienza con el href seguido de una barra

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-16 grow items-center justify-center gap-2 text-white p-3 text-sm font-medium hover:bg-gradient-to-t hover:from-orange-500 hover:to-gray-800 md:hover:bg-gradient-to-l md:hover:from-orange-500 md:hover:to-gray-800 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gradient-to-t from-orange-500 to-transparent md:bg-gradient-to-l md:from-orange-500 md:to-gray-800': isActive,
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

export function SideNavLinksScholar() {
  const pathname = usePathname();
  return (
    <>
      {linksscholar.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`); // Verifica si el pathname es igual o comienza con el href seguido de una barra

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-16 grow items-center justify-center gap-2 text-white p-3 text-sm font-medium hover:bg-gradient-to-t hover:from-orange-500 hover:to-gray-800 md:hover:bg-gradient-to-l md:hover:from-orange-500 md:hover:to-gray-800 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gradient-to-t from-orange-500 to-transparent md:bg-gradient-to-l md:from-orange-500 md:to-gray-800': isActive,
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

export function SideNavLinksGuest() {
  const pathname = usePathname();
  return (
    <>
      {linksguest.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`); // Verifica si el pathname es igual o comienza con el href seguido de una barra

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-16 grow items-center justify-center gap-2 text-white p-3 text-sm font-medium hover:bg-gradient-to-t hover:from-orange-500 hover:to-gray-800 md:hover:bg-gradient-to-l md:hover:from-orange-500 md:hover:to-gray-800 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gradient-to-t from-orange-500 to-transparent md:bg-gradient-to-l md:from-orange-500 md:to-gray-800': isActive,
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