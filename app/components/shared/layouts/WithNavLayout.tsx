import { SideNavProvider } from "../../context/NavContext";
import SideNav from "../nav/SideNav";
import TopNav from "../nav/TopNav";

type Props = {
  children: React.ReactNode;
};

export default function WithNavLayout({ children }: Props) {
  return (
    <SideNavProvider>
      <div className="min-h-screen bg-white dark:bg-gray-800">
        <TopNav />
        <SideNav />
        <main className="ml-0 sm:ml-60 mt-18 p-0 sm:p-8">
          {children}
        </main>
      </div>
    </SideNavProvider>
  )
}

