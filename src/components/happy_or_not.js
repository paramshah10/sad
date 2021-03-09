import React, { useState } from 'react';
import "assets/styles/tailwind.css";
import firebase from 'firebase/app';

export default function HappyOrNot(props) {
  const [show, setShow] = useState(true);

  if (!show) {
    return <> </>
  }

  return (
    <div className="container mr-40 ml-40 mt-24 shadow py-1">
      <div className="text-center text-xl pb-8 font-semibold">
        How are you feeling today?
      </div>
      <div className="h-16 grid grid-cols-5">
        <Emoji symbol="beaming" {...props} onHide={_ => setShow(false)}/>
        <Emoji symbol="grinning" {...props} onHide={_ => setShow(false)}/>
        <Emoji symbol="neutral" {...props} onHide={_ => setShow(false)}/>
        <Emoji symbol="frowning" {...props} onHide={_ => setShow(false)}/>
        <Emoji symbol="confounded" {...props} onHide={_ => setShow(false)}/>
      </div>
    </div>
  )
}

const Emoji = (props) => {
  const handleOnClick = () => {
    let score = 0;
    switch (props.symbol) {
      case "beaming":
        score = 5;
        break;
      
      case "grinning":
        score = 1;
        break;
      
      case "neutral":
        break;
      
      case "frowning":
        score = -1;
        break;
      
      case "confounded":
        score = -5;
        break;
      
      default:
        break;
    }

    props.db.collection('sentiment').doc(props.city).collection('user_sentiment_data').doc()
      .set({
        sentimemt: score,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
    
    props.db.collection('users').doc(props.auth.currentUser.uid).collection('sentiment_data').doc()
      .set({
        sentimemt: score,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
    
      .then(() => {
        props.onHide()
      })
      .catch((error) => {
        console.error(`failed with error ${error}`)
    })
  }

  return (
    <div className="w-12 hover:w-16 block mx-auto cursor-pointer transition duration-700 ease-in-out transform hover:-translate-y-1 hover:scale-110" onClick={handleOnClick}>
      <img
        src={require(`../assets/img/${props.symbol}-face.png`)}
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
        alt={`${props.symbol}-face emoji`}
        />
    </div>
  )
}