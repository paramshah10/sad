import React, { useState } from 'react';
import "assets/styles/tailwind.css";
import firebase from 'firebase/app';
import Modal from 'react-modal';

export default function HappyOrNot(props) {
  const [show, setShow] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [symbol, setSymbol] = useState("frowning");

  if (!show) {
    return <> </>
  }

  const handleOnHide = (symbol) => {
    if (symbol === "frowning" || symbol === "confounded") {
      setSymbol(symbol);
      setShowModal(true);
    }
    else {
      setShow(false);
    }
  }

  const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      overflow: "none",
      border: "none"
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShow(false);
  }

  return (
    <>
      <div className="container mr-40 ml-40 mt-24 shadow py-1">
        <div className="text-center text-xl pb-8 font-semibold">
          How are you feeling today?
        </div>
        <div className="h-16 grid grid-cols-5">
          <Emoji symbol="beaming" {...props} onHide={handleOnHide}/>
          <Emoji symbol="grinning" {...props} onHide={handleOnHide}/>
          <Emoji symbol="neutral" {...props} onHide={handleOnHide}/>
          <Emoji symbol="frowning" {...props} onHide={handleOnHide}/>
          <Emoji symbol="confounded" {...props} onHide={handleOnHide}/>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center bg-white shadow-xl rounded-lg py-16 px-12 relative z-10">
            <div className="w-full lg:w-8/12">
              <p className="text-4xl text-center w-12">
                {/* <span role="img" aria-label="love">
                  😍
                </span> */}
                <img
                  className="pl-20"
                  src={require(`../assets/img/${symbol}-face.png`)}
                  alt={`${symbol}-face emoji`}
                  />
              </p>
              <h3 className="font-semibold text-3xl text-center">
                We are sorry that you are feeling low today. But don't worry, we are here to cheer you up!
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mt-4 mb-4">
                Some things that we recommend that you can do to help you feel better:
                <br />
                <br />
                •  Consider opening windows and curtains to let as much light into your room as possible.
                <br />
                •  Consider going on a walk outside.
                <br />
                •  Consider giving a friend or family member a call.
                <br />
                •  May we suggest some comedy TV shows?
                <br />
              </p>
              <div className="text-center mt-16"></div>
            </div>
          </div>
        </div>
      </Modal>
    </>
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
        props.onHide(props.symbol);
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