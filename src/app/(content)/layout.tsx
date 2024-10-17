import NavBar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <main className="">
        {children}
      </main>
    </div>
  );
};

export default DashBoardLayout;
