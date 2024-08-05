import Image from "next/image";
import Link from "next/link";
import LabTrackLogo from "./ui/labtrack-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Principal() {
  return (
    <main className="flex flex-col p-2 min-h-screen bg-gray-100">
      <div className="flex shrink-0 p-6 items-end rounded-lg bg-gray-200 p-6 h-[20%]">
        <LabTrackLogo />
      </div>
      <div className="flex flex-col grow gap-5 md:flex-row">
        <div className="flex flex-col gap-5 justify-center px-5 py-5 md:w-[40%]">
          <p className="text-xl md:text-3xl text-blue-900">
            <strong className="text-orange-400">
              Bienbenido a LabTrack.
            </strong>
            Click a continuación para iniciar sesión o registrarse.
          </p>
          <div className="flex gap-5">
            <Link href="/login" className="flex flex-1 self-start justify-center items-center gap-5 rounded-lg bg-orange-400 px-6 py-3 h-[75px] md:h-[50px] text-sm font-medium text-white transition-colors hover:bg-orange-300 md:text-base">
              <span>
                Iniciar Sesión
              </span>
              <ArrowRightIcon className="w-5 h-5 shrink-0"/>
            </Link>
            <Link href="/register" className="flex flex-1 self-start justify-center items-center gap-5 rounded-lg bg-orange-400 px-6 py-3 h-[75px] md:h-[50px] text-sm font-medium text-white transition-colors hover:bg-orange-300 md:text-base">
              <span>
                Registrarse   
              </span>
              <ArrowRightIcon className="w-5 h-5 shrink-0"/>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image src="/research-desktop.png" width={405} height={450} className="hidden md:block" alt="Versión Escritorio Imagen"/>
          <Image src="/research-mobile.png" width={252} height={279} className="block md:hidden" alt="Versión Mobile Imagen"/>
        </div>
      </div>
      <div className="flex shrink-0 p-2 items-end rounded-lg bg-gray-200 h-[10%] ">
        <p className="text-xs text-blue-900 font-medium">Proyecto PPS - Giménez - 2024</p>
      </div>
    </main>
  );
}