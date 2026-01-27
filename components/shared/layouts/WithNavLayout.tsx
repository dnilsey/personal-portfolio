import { SideNavProvider } from "../../../context/NavContext";
import FloatingActionButton from "../fab/FloatingActionButton";
import TopNav from "../nav/TopNav";

type Props = {
  children: React.ReactNode;
};

export default function WithNavLayout({ children }: Props) {
  return (
    <SideNavProvider>
      <div className="min-w-full min-h-screen bg-light-orange dark:bg-dark-gray">
        <TopNav />
        <FloatingActionButton />
        <main className="py-14 sm:py-20 max-w-7xl mx-auto">{children}</main>
      </div>
    </SideNavProvider>
  );
}
