import { Button } from "@chakra-ui/react";
import { Image, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Welcome_message() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("Home");
  };
  return (
    <div>
      <div id="logo">
        <Box boxSize="280px">
          <Image src="/media/logo.png" />
        </Box>
      </div>
      <h1>Welcome to 2D Array Sorter</h1>
      <div>
        <p className="introduction">
          Here, you can learn about 2D arrays and sort them to your heart's
          content!
        </p>
        <Button
          onClick={navigateToHome}
          variant="outline"
          size="lg"
          colorScheme="gray"
        >
          Continue
        </Button>
        <div id="papalogo">
          <Box boxSize="200px">
            <Image src="/media/papa.png" />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Welcome_message;
