'use client'

import { usePathname } from 'next/navigation';//Para ressaltar el link activo.
import clsx from 'clsx';//Para aplicar estilos condicionalmente. Los dos se usan para resaltar el link activo
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import Badge from '@mui/material/Badge';
import { useEffect, useState } from 'react';

const linksscholar = [
  { name: 'Inicio', href: '/scholar/dashboard', icon: HomeIcon },
  { name: 'Mensajes', href: '/scholar/messages', icon: ChatIcon },
  
  //Añadir links segun necesario aca.
];

interface LinkProps {
  current_id_number: number;
}

export function SideNavLinksScholar({ current_id_number }: LinkProps) {
  const [unreadCount, setUnreadCount] = useState(0); // Estado local para el conteo de mensajes no leídos
  const pathname = usePathname();
  const [fetchData, setFetchData] = useState(false);

  useEffect(() => {
    async function fetchUnreadCount() {
        try {
          const response = await fetch(`/api/messages/unreadcount?currentid=${encodeURIComponent(current_id_number)}`, {
            method: 'GET',
          });
          const data = await response.json();
          setUnreadCount(data.unreadCount); // Actualizar el estado local
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
          } else {
            console.error("Error desconocido, la cagaste");
          }
      } 
    }

    fetchUnreadCount();
    setFetchData(false);
    const intervalId = setInterval(fetchUnreadCount, 50000);
    return () => clearInterval(intervalId);
  }, [fetchData, current_id_number]);

  const handleLinkClick = () => {
    setFetchData(true); // Establece el estado para ejecutar el efecto
  };

  return (
    <>
      {linksscholar.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`); // Verifica si el pathname es igual o comienza con el href seguido de una barra

        const renderBadge = link.name === 'Mensajes' && unreadCount > 0;

        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={handleLinkClick}
            className={clsx(
              'flex h-16 grow items-center justify-center gap-2 text-white p-3 text-sm font-medium hover:bg-gradient-to-t hover:from-orange-500 hover:to-gray-800 md:hover:bg-gradient-to-l md:hover:from-orange-500 md:hover:to-gray-800 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gradient-to-t from-orange-500 to-transparent md:bg-gradient-to-l md:from-orange-500 md:to-gray-800': isActive,
              },
            )}
          >
            <Badge
              badgeContent={unreadCount}
              color="error"
              invisible={!renderBadge}
              overlap="circular"
            >
              <LinkIcon className="w-6" />
            </Badge>
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}