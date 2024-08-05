import Link from "next/link";
import Image from "next/image";
import SideNavLinks from "./sidenav-links";
import LabTrackLogo from "../labtrack-logo";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col bg-gray-200 px-3 py-4 md:px-2">
      <Link className="mt-10 md:mt-0 flex h-20 justify-center items-center rounded-md bg-gray-200" href="/">
        <div>
          <Image src="/logo.png" width={1155} height={422} alt="Logo Imagen"/>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <SideNavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-100 md:block"/>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm text-blue-900 font-medium hover:bg-orange-200 hover:text-red-500 md:flex-none md:justify-start md:p-2 md:px-3 group">
            <PowerIcon className="w-6" />
            <div className="hidden md:block text-blue-900 group-hover:text-red-500">Cerrar Sesión</div>
          </button>
        </form>
      </div>
    </div>
  );
}


//en este archivo hay que añadir la funcion de auth para deslogearse
//estaria bueno poner para que muestre que usuario esta logeado tambien