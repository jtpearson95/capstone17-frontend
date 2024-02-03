import React, { useContext } from "react";
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import MyContext from "./context";

function Cart() {
  const { cart, setCart } = useContext(MyContext);

  const addItem = (item) => {
    let updatedCart = { ...cart };
    let foundItem = updatedCart.items.find((i) => i.name === item.name);

    if (!foundItem) {
      // If the item is not in the cart, add it with quantity 1
      let newItem = { ...item, quantity: 1 };
      updatedCart.items.push(newItem);
    } else {
      // If the item is already in the cart, increase the quantity
      foundItem.quantity = (foundItem.quantity || 0) + 1;
    }

    // Recalculate total amount
    updatedCart.totalAmount = calculateTotalAmount(updatedCart.items);

    // Update the context with the modified cart
    setCart(updatedCart);
  };

  const removeItem = (item) => {
    let updatedCart = { ...cart };
    let foundItem = updatedCart.items.find((i) => i.name === item.name);

    if (foundItem) {
      // If the item is in the cart and its quantity is greater than 1, decrease the quantity
      if (foundItem.quantity > 1) {
        foundItem.quantity--;
      } else {
        // If the quantity is 1, remove the item from the cart
        updatedCart.items = updatedCart.items.filter(
          (i) => i.name !== item.name
        );
      }

      // Recalculate total amount
      updatedCart.totalAmount = calculateTotalAmount(updatedCart.items);

      // Update the context with the modified cart
      setCart(updatedCart);
    }
  };

  const calculateTotalAmount = (items) => {
    return items.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 1),
      0
    );
  };

  const renderItems = () => {
    if (cart.items && cart.items.length) {
      return cart.items.map((item) => (
        <div className="items-one" style={{ marginBottom: 15 }} key={item.id}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
              id="item-name"
            >
              {item.name}
            </span>
            <div>
              <span
                style={{
                  cursor: "pointer",
                  marginRight: "10px",
                  color: "gray",
                }}
                onClick={() => addItem(item)}
              >
                add
              </span>
              <span
                style={{ cursor: "pointer", color: "gray" }}
                onClick={() => removeItem(item)}
              >
                remove
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ marginLeft: 5 }} id="item-quantity">
              &nbsp; {item.quantity} x &nbsp; ${item.price}
            </span>
            <span id="total-price" style={{ fontWeight: "bold" }}>
              ${(item.quantity * item.price).toFixed(2)}
            </span>
          </div>
          <hr />
        </div>
      ));
    } else {
      return <div></div>;
    }
  };

  return (
    <div>
      <Card style={{ padding: "10px 5px" }} className="cart">
        <CardTitle
          tag="h5"
          style={{
            color: "rgb(203, 24, 0)",
            fontSize: "2.5rem",
            fontFamily: "CHEESE PIZZA, sans-serif",
          }}
        >
          🍕 Your Cart
        </CardTitle>
        <CardBody style={{ padding: 10 }}>
          <div>{renderItems()}</div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              marginTop: "10px",
              fontSize: "1.3rem",
            }}
          >
            <span>Order total:</span>
            <span>${cart.totalAmount.toFixed(2)}</span>
          </div>
        </CardBody>
      </Card>
      <style jsx>{`
        #item-price {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
        #item-quantity {
          font-size: 0.95em;
          padding-bottom: 4px;
          color: rgba(158, 158, 158, 1);
        }
        #item-name {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
      `}</style>
    </div>
  );
}

export default Cart;
