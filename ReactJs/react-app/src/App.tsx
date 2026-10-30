import Message from  "./Message"
import ListGroup from "./componets/ListGroup"
import Alert from "./componets/Alert";
import Button from "./componets/Button";
import { useState } from "react";

function App(){
  const name = 'Cherry'
  // return <div><Message></Message></div>
  // return <h1>Hey I'm {name}</h1>
  // return <div><ListGroup></ListGroup></div>
  const cityItems = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

    // return (
    // <div>
    //   <ListGroup
    //     items={cityItems}
    //     heading="Cities"
    //     onSelectItem={handleSelectItem}
    //   />
    // </div>

  //   return (
  //     <>
  //     {Alert}
  //     </>
  // );

  const [alertVisible, setAlertVisibility] = useState(false);
  
  return (
    <div>
      {alertVisible && (
        <Alert>
          My Dynamic Alert Message!
        </Alert>
      )}
      <Button color="primary" onClick={() => setAlertVisibility(true)}>
        My Button
      </Button>
    </div>
  );
}

export default App