import SideNav from "../nav/SideNav";
import TopNav from "../nav/TopNav";

type Props = {
  children: React.ReactNode;
};

export default function WithNavLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-light-gray">
      <TopNav />
      <SideNav />
      <main className="ml-60 mt-18 p-8">
        {children}
      </main>
    </div>
  )
}

