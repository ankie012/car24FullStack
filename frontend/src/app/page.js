
import MainLayout from "./Layouts/mainLayout";
import Header from "./components/Header";


export default function Home() {
  return (<>
    <Header />
    <div className="flex m-10">
      <MainLayout />
    </div>
  </>

  );
}
