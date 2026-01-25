import { SideNavProvider } from "../../../context/NavContext";
import FloatingActionButton from "../fab/FloatingActionButton";
import TopNav from "../nav/TopNav";

type Props = {
  children: React.ReactNode;
};

export default function WithNavLayout({ children }: Props) {
  return (
    <SideNavProvider>
      <div className="min-h-screen bg-light-orange dark:bg-dark-gray">
        <TopNav />
        <FloatingActionButton />
        <main className="p-8">{children}</main>
      </div>
    </SideNavProvider>
  );
}
