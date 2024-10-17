import NavBar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <main className="">
<<<<<<< HEAD
        
=======
        <NavBar/>
>>>>>>> 12550ce2b30c2da9931bc53a9b52e37067641583
        {children}
      </main>
    </div>
  );
};

export default DashBoardLayout;
