import React from "react"


const Head = ({m, y, num}) => {
    return (
      <div id="cardContent">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <img
            style={{
              height: "30px",
            }}
            src="https://github.com/pizza3/asset/blob/master/chip4.png?raw=true"
          />
          <img
            style={{
              height: "20px",
            }}
            src="https://cdn.visa.com/cdn/assets/images/logos/visa/logo.png"
          />
        </div>
        <div id="num">{num}</div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <div id="label">
            Expires
            <div id="expiry">
              {m}/{y}
            </div>
          </div>
          <div id="num" style={{ fontSize: "13px" }}>
            VALENTINE KAZANCEV
          </div>
        </div>
      </div>
    );
  };


export default Head;