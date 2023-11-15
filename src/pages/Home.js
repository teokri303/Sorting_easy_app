import "../styles/home.css";
import Navbar from "../components/Navbar";
import Main_Comp from "../components/Main_Grid";

function Home() {
  return (
    <div className="Home">
      <header>
        <Navbar />
      </header>
      <Main_Comp />
    </div>
  );
}

export default Home;
