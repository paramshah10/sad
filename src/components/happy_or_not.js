import React, { useState } from 'react';
import "assets/styles/tailwind.css";

export default function HappyOrNot(props) {
  return (
    <div className="grid grid-cols-5 gap-4">
      <Emoji symbol="beaming" className=""/>
      <Emoji symbol="grinning" className=""/>
      <Emoji symbol="neutral" className=""/>
      <Emoji symbol="frowning" className=""/>
      <Emoji symbol="confounded" className=""/>
    </div>
  )
}

const Emoji = (props) => {
  return (
    <div>
      <img
        // style={{ height: "50px", width: "50px"}}
        src={require(`../assets/img/${props.symbol}-face.png`)}
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
        alt={`${props.symbol}-face emoji`}
        />
    </div>
  )
}