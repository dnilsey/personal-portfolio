import TopNav from "../nav/TopNav";

type Props = {
  children: React.ReactNode;
};

export default function WithNavLayout({ children }: Props) {
  return (
    <div className="min-h-screen w-full bg-alice-blue pt-20">
      <TopNav />
      {children}
    </div>
  )
}

