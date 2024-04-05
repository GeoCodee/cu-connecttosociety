import NavBar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 z-[80] bg-gray-900">
        <Sidebar></Sidebar>
      </div>
      <main className="lg:pl-72">
        <NavBar></NavBar>
        {children}
      </main>
    </div>
  );
};

export default DashBoardLayout;
