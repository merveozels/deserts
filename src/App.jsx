import { use, useReducer, useRef } from 'react';
import { useState } from 'react'

const Deserts = [
  {
    name: 'waffle',
    description: "Waffle with Berries",
    id: 1,
    quantity: 1,
    price: 6.50,
    photo: "./assets/img/waffle.png",
    isBasket: false
  },

  {
    name: 'brule',
    description: "Vanilla Bean Crème Brûlée",
    id: 2,
    quantity: 1,
    price: 7.00,
    photo: "./assets/img/creme-brule.png",
    isBasket: false
  },

  {
    name: 'macaron',
    description: "Macaron Mix of Five",
    id: 3,
    quantity: 1,
    price: 8.00,
    photo: "./assets/img/Macaroon.png",
    isBasket: false
  },

  {
    name: 'tiramisu',
    id: 4,
    quantity: 1,
    price: 5.50,
    photo: "./assets/img/tramisu.png",
    description: "Classic Tiramisu",
    isBasket: false
  },

  {
    name: 'baklava',
    id: 5,
    quantity: 1,
    price: 4.00,
    photo: "./assets/img/baklava.png",
    description: "Pistachio Baklava",
    isBasket: false
  },

  {
    name: 'pie',
    id: 6,
    quantity: 1,
    price: 5.00,
    photo: "./assets/img/pie.png",
    description: "Lemon Meringue Pie",
    isBasket: false
  },

  {
    name: 'cake',
    id: 7,
    quantity: 1,
    price: 4.50,
    photo: "./assets/img/redVelvet.png",
    description: "Red Velvet Cake",
    isBasket: false

  },

  {
    name: 'brownie',
    id: 8,
    quantity: 1,
    price: 5.50,
    photo: "./assets/img/brownie.png",
    description: "Salted Caramel Brownie",
    isBasket: false

  },

  {
    name: 'cota',
    id: 9,
    quantity: 1,
    price: 6.50,
    photo: "./assets/img/panaCota.png",
    description: "Vanilla Panna Cotta",
    isBasket: false

  },

];


function App() {
  const [basket, setBasket] = useState([])
  const dialogRef = useRef(null)

  function handleBasket(x) {
    setBasket([...basket, x]);
  }

  function handleIncrease(id) {
    basket.find(x => x.id === id).quantity++;
    setBasket([...basket]);
  }

  function handleDecrease(id) {
    if (basket.find(x => x.id === id).quantity - 1 === 0) {
      setBasket(basket.filter(y => y.id !== id));
    } else {
      basket.find(x => x.id === id).quantity--;
      setBasket([...basket])
    }
  }

  function handleResult() {
    if (basket.length === 0) {
      alert("Your basket is empty!");
      return;
    }
    dialogRef.current.showModal();
  }

  function handleDelete(id) {
    console.log(basket.find(x => x.id === id))
    setBasket((prevBasket) => prevBasket.filter((x) => x.id !== id))
  }

  function handleRestart() {
    setBasket([]);
    dialogRef.current.close();
  }

  return (
    <>
      <div className="container">
        <div className="productArea">
          <h1>Desserts</h1>
          <div className="deserts-inner">
            {
              Deserts.map((x) => (
                <div className="card-inner" key={x.id}>
                  <div className="card-top">
                    <img className='card-img' src={x.photo} alt="" />
                    {
                      basket.find(y => y.id === x.id)
                        ?
                        <button className='active-btn'>
                          <img onClick={() => handleDecrease(x.id)} src="assets/img/mines-icon.svg" alt="" />
                          {basket.find(z => z.id === x.id).quantity}
                          <img onClick={() => handleIncrease(x.id)} src="./assets/img/plus-icon.svg" alt="" />
                        </button>
                        :
                        <button className='default-btn' onClick={() => handleBasket(x)}><img src="./assets/img/shop-basket-red.svg" alt="" />Add to cart</button>
                    }

                  </div>
                  <div className="card-bottom">
                    <p>{x.name}</p>
                    <h3>{x.description}</h3>
                    <span>${x.price.toFixed(2)}</span>
                  </div>

                </div>
              ))
            }
          </div>
        </div>
        <div className="basketArea">
          {
            basket.length === 0
              ?
              <div className="basket-chart-empty">
                <h4>Your Chart()</h4>
                <img src="./assets/img/basket-empty.svg" alt="" />
                <p>Your added items will appear here</p>
              </div>
              :
              <div className="basket-chart-full">
                <h4 className='basketTitle'>Your Chart ({basket.length})</h4>
                <div className='result-part'>
                  {basket.map((y) => (
                    <div className='result-column' key={y.id}>
                      <div className="result-left">
                        <h5>{y.description}</h5>
                      </div>
                      <div className="denemeflex">
                        <div className="result-left-inner">
                          <span className='quantity'>{y.quantity}x</span>
                          <span className='price'> @ ${y.price}  <strong className='strong'>${((y.price) * (y.quantity)).toFixed(2)} </strong> </span>
                        </div>
                          <div className="btn-div"><button className='deleteBtn' onClick={() => handleDelete(y.id)}>  <img src="./assets/img/deletebtn.svg" alt="" />  </button></div>
                      </div>

                    </div>
                  ))}
                </div>
                <div className="order-total">
                  <div>
                    <p>Order Total:</p>
                  </div>
                  <div>
                    <h6>
                      ${basket.reduce(
                        (total, item) => total + item.price * item.quantity, 0
                      ).toFixed(2)}
                    </h6>
                  </div>
                </div>
                <div className="carbon-div">
                  <img src="./assets/img/carbon-icon.svg" alt="" />
                  <p>This is a <strong>carbon-neutral</strong> delivery</p>
                </div>
                <button className='confirmBtn' onClick={handleResult}>Confirm Order</button>

              </div>

          }
        </div>
      </div>
      <dialog ref={dialogRef} className="order-dialog">
        <div className="dialog-header">
          <img src="./assets/img/check-icon.svg" alt="" />
          <h2>Order Confirmed</h2>
          <p>We hope you enjoy your food!</p>
        </div>
        <div className="dialog-details">
          {
            basket.map(d =>
              <div key={d.id} className="dialog-card">
                <img className='detailImg' src={d.photo} alt="" />
                <div className="dialog-text">
                  <h5>{d.description}</h5>
                  <div className='flex'>
                    <span>{d.quantity}x</span>
                    <h5 className='dialog-price'>@${(d.price).toFixed(2)}</h5>
                  </div>
                </div>
                <span className='dialog-total'> ${(d.price * d.quantity).toFixed(2)}</span>
              </div>
            )
          }
          <div className="dialog-total-order">
            <h4>Order Total</h4>
            <p>$ {basket
              .reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )
              .toFixed(2)}</p>
          </div>
        </div>

        <button className='restartBtn' onClick={handleRestart}>Start New Order</button>

      </dialog>
    </>
  )
}

export default App
