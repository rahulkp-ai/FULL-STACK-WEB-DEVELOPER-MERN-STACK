// import { Fragment } from "react";

// function ListGroup() {
//   return (
//     <Fragment>
//       <h1>List</h1>
//       <ul className="list-group">
//         <li className="list-group-item">An item01</li>
//         <li className="list-group-item">An item02</li>
//         <li className="list-group-item">An item03</li>
//         <li className="list-group-item">An item04</li>
//         <li className="list-group-item">An item05</li>
//       </ul>
//     </Fragment>
//   );
// }

// export default ListGroup;





import { useState } from "react";

function ListGroup() {
  const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  // State hook to track the active selected index (-1 means none selected)
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const getMessage = () => {
    return items.length === 0 ? <p>No item found</p> : null
  }

  return (
    <>
      <h1>List</h1>
      {/* Conditional rendering using logical && */}
      {/* {items.length === 0 && <p>No item found</p>} */}
      {getMessage}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
