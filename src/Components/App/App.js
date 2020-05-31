import React from "react";
import "./App.css";
import { useSprings, interpolate, animated, useSpring } from "react-spring";

import { arr } from "../../data.js";
import Card from "../Card/card.component";

const App = () => {
  const [currentCard, setCurrentCard] = React.useState(0);
  const props = useSpring({
    bal: arr[currentCard].detail.balance,
    cvc: arr[currentCard].detail.cvc,
    m: arr[currentCard].detail.m,
    y: arr[currentCard].detail.y,
  });
  return (
    <div id="container">
      <div id="details">
        <div id="detail">
          <animated.div>
            {props.bal.interpolate((x) => "$ " + x.toFixed(0))}
          </animated.div>
          <div id="infolabel">Balance</div>
        </div>
        <div id="detail">
          <div id="exp">
            <animated.div>
              {props.m.interpolate((x) => x.toFixed(0) + "/")}
            </animated.div>
            <animated.div>
              {props.y.interpolate((x) => x.toFixed(0))}
            </animated.div>
          </div>
          <div id="infolabel">Expires</div>
        </div>
        <div id="detail">
          Valentine<div id="infolabel">Card Holder</div>
        </div>
        <div id="detail">
          <animated.div>
            {props.cvc.interpolate((x) => x.toFixed(0))}
          </animated.div>
          <div id="infolabel">CVC</div>
        </div>
      </div>
      <div id="app">
        {arr.map((val, i) => {
          return (
            <Card
              key={i}
              num={i}
              arr={arr}
              data={val}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
