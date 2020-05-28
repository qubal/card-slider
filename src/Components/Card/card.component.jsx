import React, {useState} from 'react'
import { useDrag } from "react-use-gesture";
import "../Head/head.component"
import { useSprings, interpolate, animated, useSpring } from "react-spring";
import Head from '../Head/head.component'

const setBoxShadow = (isActive, alreadyOnTop) => {
    if (isActive && alreadyOnTop) {
      // return "rgba(0, 0, 0, 0.44) 0px 0px 34px 0px";
      return "0px 27px 43px -24px rgba(0, 0, 0, 0.438)";
    } else if (alreadyOnTop) {
      return "none";
    } else {
      return "0px 27px 43px -24px rgba(0, 0, 0, 0.438)";
    }
  };

function Card(props) {
    const { arr, num, currentCard, data, setCurrentCard } = props;
    //checks if the card should be able to move.
    const shouldMove = num === 1 + currentCard;
    //checks if the card is already on top.
    const alreadyOnTop = currentCard >= num;
    // check if card is active on top.
    const isActive = currentCard === num;
    // handle zindexes.
    const [zIndex, setZindex] = useState(arr.length - num);
    // handle position on interactions.
    const [{ posx, posy }, setPos] = useState(() => ({
      posx: 0,
      posy: isActive ? -155 : 0,
    }));
    const bind = useDrag(
      ({ down, movement: [, my], distance, direction: [, yDir], velocity }) => {
        const dir = yDir < 0 ? -1 : 1;
        const rest = alreadyOnTop ? -155 : 0;
        const shouldTrigger = !down && velocity > 0.2 && num !== 0;
        if (isActive - 1 || alreadyOnTop) {
          if (dir === -1 && shouldTrigger && !alreadyOnTop) {
            setPos({ posx: 0, posy: -155 });
            setTimeout(() => {
              setCurrentCard(1 + currentCard);
              setZindex(arr.length + num);
            }, 280);
          } else if (dir === 1 && shouldTrigger && alreadyOnTop) {
            setPos({ posx: 0, posy: 0 });
            setTimeout(() => {
              setCurrentCard(currentCard - 1);
              setZindex(arr.length - num);
            }, 280);
          } else if (down && shouldMove) {
            setPos({
              posy: down ? (isActive ? my - 155 : my) : rest,
            });
            setZindex(10);
          } else {
            setPos({
              posy: down ? (isActive ? my - 155 : my) : rest,
            });
            setTimeout(() => {
              if (alreadyOnTop) {
                setZindex(arr.length + num);
              } else {
                setZindex(arr.length - num);
              }
            }, 280);
          }
        }
      }
    );
    const yDir = alreadyOnTop ? -155 : shouldMove ? posy : 0;
    const yOffset = isActive ? 0 : 30 * (num - currentCard);
    const [{ x, y, scale, top }, set] = useSpring(() => ({
      x: 0,
      y: yDir,
      scale: alreadyOnTop ? 1 : 1 - (num - currentCard - 1) / 10,
      top: yDir + yOffset,
    }));
    if (isActive) {
      set({ x: 0, y: posy, top: posy + yOffset, scale: 1 });
    } else if (shouldMove) {
      set({ x: 0, y: yDir, top: yDir + yOffset, scale: 1 });
    } else if (alreadyOnTop) {
      set({ x: 0, top: -155, y: -155, scale: 1 });
    } else {
      set({
        x: 0,
        y: 1 - (num - currentCard) / 10,
        top: yDir + yOffset,
        scale: 1 - (num - currentCard - 1) / 10,
      });
    }
    return (
      <animated.div
        id="card"
        {...bind()}
        style={{
          zIndex: zIndex,
          boxShadow: setBoxShadow(isActive, alreadyOnTop),
          ...data.style,
          transform: interpolate(
            [
              y
                .interpolate({ range: [0, -155], output: [60, 0] })
                .interpolate((y) => `rotate3d(1, 0, 0, ${y}deg)`),
              top.interpolate((top) => `translate3D(0px, ${top}px, 0px )`),
              scale.interpolate((scale) => `scale(${scale})`),
            ],
            (rotate3d, translate3D, scale) =>
              `${rotate3d} ${translate3D} ${scale}`
          ),
        }}
      >
        {Head(data.detail)}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            transition: ".3s",
            opacity: isActive ? 0 : (num + 2 - currentCard) / 10,
          }}
        />
      </animated.div>
    );
  }

  export default Card