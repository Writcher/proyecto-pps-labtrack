
import Link from "next/link";
import SideNavLinks from "./sidenav-links";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { doLogout } from "@/app/actions";
import LabTrackLogoWhite from "../labtrack-logo";
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from "@mui/material/IconButton";

export default async function SideNav() {
  const session = await auth();
  if (!session?.user) redirect("/");
  return (
    <div className="flex flex-col h-full bg-gradient-to-r from-gray-800 to-gray-700 border-b-4 md:border-r-4 md:border-b-0 border-orange-500">
      <Link className="flex mt-10 mb-6 h-10 md:h-40 justify-center items-center" href="/">
        <div>
          <LabTrackLogoWhite/>
        </div>
      </Link>
      <div className="flex flex-row grow justify-between md:flex-col gap-2">
        <SideNavLinks />
        <div className="hidden h-auto w-full grow md:block"/>
        <div className="flex flex-col items-center justify-center w-full">
          <p className="flex items-center justify-center text-white font-medium md:justify-start md:py-6 hidden md:block">
            {session?.user?.name}
          </p>
        </div>
        <form action={doLogout}>
          <div className="flex items-center justify-center gap-2 text-white p-3 text-sm font-medium hover:bg-gradient-to-l hover:from-red-700 hover:to-transparent hidden md:block">
            <Button variant="text" size="large" color="inherit" disableElevation startIcon={<LogoutIcon />} fullWidth>
              <input type="submit" value="CERRAR SESIÓN"/>
            </Button>
          </div>
          <div className="flex h-16 grow items-center justify-center gap-2 block md:hidden">
            <IconButton color="error">
              <LogoutIcon/>
              <input type="submit" value=" "/>
            </IconButton>
          </div>
        </form>
      </div>
    </div>
  );
}