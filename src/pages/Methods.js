import "../styles/home.css";
import Navbar from "../components/Navbar";
import NumberInputComponent from "../components/input";

function Home() {
  return (
    <div className="Home">
      <header>
        <Navbar />
      </header>
      <NumberInputComponent />
    </div>
  );
}

export default Home;
