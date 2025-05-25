
import MainLayout from "./Layouts/mainLayout";
import Header from "./components/Header/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="w-full max-w-[1440px] mx-auto px-4 pt-4 pb-12">  
        <MainLayout />  
      </div> 
    </>
  );
}
