'use client';

import { usePathname } from 'next/navigation';//Para ressaltar el link activo.
import clsx from 'clsx';//Para aplicar estilos condicionalmente. Los dos se usan para resaltar el link activo
import Link from 'next/link';
import GroupIcon from '@mui/icons-material/Group';
import BuildIcon from '@mui/icons-material/Build';
import HomeIcon from '@mui/icons-material/Home';

const links = [
    { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
    { name: 'Becarios', href: '/dashboard/scholars', icon: GroupIcon },
    { name: 'Gestion de Parametros', href: '/paramsmanagement', icon: BuildIcon },
    
    //Añadir links segun necesario aca.
];

export default function SideNavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link key={link.name} href={link.href} className={clsx(
            'flex h-16 grow items-center justify-center gap-2 text-white p-3 text-sm font-medium hover:bg-gradient-to-t hover:from-orange-500 hover:to-transparent md:hover:bg-gradient-to-l md:hover:from-orange-500 md:hover:to-transparent md:flex-none md:justify-start md:p-2 md:px-3',
            {
              'bg-gradient-to-t from-orange-500 to-transparent md:bg-gradient-to-l md:from-orange-500 md:to-transparent': pathname === link.href, //esto se aplica cuando el link esta activo
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
