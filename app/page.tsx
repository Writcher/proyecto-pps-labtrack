import Image from "next/image";
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LabTrackLogoWhite from "./ui/labtrack-logo";

export default function Principal() {
  return (
    <main className="flex flex-col h-screen w-screen bg-gray-100">
      <div className="absolute flex w-screen h-20 md:h-32 inset-0 bg-gradient-to-t from-black to-gray-600 opacity-80"/>
      <div className="flex w-screen h-20 md:h-32" style={{ backgroundImage: "url('/research-background.png')" }}>
        <div className="relative flex items-end p-4 px-16 w-screen h-20 md:h-32">
          <LabTrackLogoWhite />
        </div>
      </div>
      <div className="w-screen h-2 bg-gradient-to-b from-orange-500 to-orange-400"/>
      <div className="flex flex-col md:flex-row items-center justify-center grow">
        <div className="flex-col w-8/10 md:w-2/5 p-16">
          <p className="text-xl md:text-3xl text-gray-700 font-medium">
            <strong className="text-orange-500">
              Bienbenido a LMS.
            </strong>
            Click a continuación para iniciar sesión o registrarse si es un docente.
          </p>
          <div className="flex justify-start gap-5 mt-5">
              <Button variant="contained" href="/login" size="large" color="warning" disableElevation endIcon={<KeyboardArrowRightIcon />}>
                Iniciar Sesión
              </Button>
              <Button variant="contained" href="/register" size="large" color="warning" disableElevation endIcon={<KeyboardArrowRightIcon />}>
                Registrarse
              </Button>
          </div>
        </div>
        <div className="flex justify-center md:w-3/5">
          <Image src="/research-desktop.png" width={410} height={450} className="hidden md:block" alt="Versión Escritorio Imagen"/>
          <Image src="/research-mobile.png" width={189} height={210} className="block md:hidden" alt="Versión Mobile Imagen"/>
        </div>
      </div>
      <div className="w-screen h-2 bg-gradient-to-t from-orange-500 to-orange-400"/>
      <div className="flex items-end p-2 w-screen h-10 md:h-16 bg-gradient-to-b from-black to-gray-600 opacity-80 text-white">
        <p>Proyecto PPS - Giménez - 2024</p>
      </div>
    </main>
  );
}