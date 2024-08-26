import SideNav from '@/app/components/guest/sidenav';
import { getTypeGuest } from '../lib/queries/usertype';
import { auth } from '../lib/auth';
import { redirect } from 'next/navigation';
 
export default async function Layout({ children }: { children: React.ReactNode }) {
  const guestType = await getTypeGuest();
  const session = await auth();
  if (!session?.user) redirect("/");
  if (session?.user.usertype_id != guestType) {
      return (
          <div className="flex flex-col text-xl md:text-3xl text-gray-700 text-center font-bold">
              <p className="mt-16">
                No tienes permiso para ver esta página.
              </p>
          </div>
      )
  }

  return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-60">
          <SideNav />
        </div>
        <div className="flex-grow bg-gray-100 md:overflow-y-auto">{children}</div>
      </div>
  );
}