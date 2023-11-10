import Navbar from "../components/Navbar";

function Welcome() {
  return (
    <div className="Home">
      <header>
        <Navbar />
        <br />
        <br />
        <br />
        <p>Εδω ισως καποιες πληροφοριες για τον σκοπο της εργασιας κλπ</p>
        <br />
        <p>
          Ενω στο κουμπι πανω δεξια που λεει your feedback σκεφτομουν μηπως
          βαζαμε καποιο ερωτηματολογιο προς τον χρηστη για το πως κρινει την
          εφαρμογη και το τι θα ηθελε σε επομενο update και καλα.
        </p>

        <br />
        <br />
      </header>
    </div>
  );
}

export default Welcome;
