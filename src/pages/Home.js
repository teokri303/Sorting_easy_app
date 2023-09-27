import "../styles/home.css";
import Navbar from "../components/Navbar";
import Test from "../components/test_button"

function Home() {
  return (
    <div className="Home">
      <header>
        <Navbar />
        
      </header>
      <Test/>
  
    </div>
  );
}

export default Home;
