
import MainLayout from "./Layouts/mainLayout";
import Header from "./components/Header/Header";


export default function Home() {
  return (<>
    <Header />
    <div className="flex m-5">  
      <MainLayout />  
    </div> 
  </>

  );
} 
