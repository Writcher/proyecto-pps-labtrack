'use client';

import { usePathname } from 'next/navigation';//Para ressaltar el link activo.
import clsx from 'clsx';//Para aplicar estilos condicionalmente. Los dos se usan para resaltar el link activo
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

const links = [
    { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
    { name: 'ABM Tipo de Insumo', href: '/paramsmanagement/supplytype', icon: SettingsIcon },
    
    
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
            'flex h-16 grow items-center justify-center gap-2 text-white p-3 text-sm font-medium hover:bg-gradient-to-l hover:from-orange-500 hover:to-transparent md:flex-none md:justify-start md:p-2 md:px-3',
            {
              'bg-gradient-to-l from-orange-500 to-transparent': pathname === link.href, //esto se aplica cuando el link esta activo
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
