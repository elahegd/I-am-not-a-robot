import React, { useReducer, useEffect } from "react";

const reducer = (action, state) => {
  return { ...state, ...action };
};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const Robot = ({ number, flag }) => {
  const statusArray = {
    true: {
      qoute: "i am not robot",
      flag: true
    },
    false: {
      qoute: "i am robot",
      flag: false
    }
  };
  const initial = () => ({
    checkboxTruthArray: [],
    checkboxFalsyArray: [],
    dataArray: []
  });
  const [state, dispatch] = useReducer(reducer, initial());
  const handleChange = (e, val) => {
    const truthyArray = state.checkboxTruthArray;
    const falsyArray = state.checkboxFalsyArray;
    if (val.flag === flag) {
      if (e.target.checked) {
        truthyArray.push(val.qoute);
      } else {
        truthyArray.pop();
      }
    } else {
      if (e.target.checked) {
        falsyArray.push(val.qoute);
      } else {
        falsyArray.pop();
      }
    }
    dispatch({
      checkboxTruthArray: truthyArray,
      checkboxFalsyArray: falsyArray
    });
  };
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * (9 - number) + number);
    const tempDataArray = state.dataArray;
    for (let i = 0; i < randomNumber; i++) {
      tempDataArray.push(statusArray[flag]);
    }
    for (let i = 0; i < 9 - randomNumber; i++) {
      tempDataArray.push(statusArray[!flag]);
    }
    dispatch({ dataArray: shuffle(tempDataArray) });
  }, []);
  const handleSubmit = () => {
    if (
      state.checkboxFalsyArray.length === 0 &&
      number === state.checkboxTruthArray.length
    ) {
      window.alert("You are not a robot");
    } else {
      window.alert("You are a robot, Come back with your master");
    }
  };

  return (
    <div>
      <p>
        select {number} number of {`${flag ? "correct" : "uncorrect"}`} items
      </p>
      {state.dataArray &&
        state.dataArray.map((val, idx) => (
          <div key={idx}>
            <input type="checkbox" onChange={e => handleChange(e, val)} />
            <label>{val.qoute}</label>
          </div>
        ))}
      <button onClick={() => handleSubmit()}>submit</button>
    </div>
  );
};

export default Robot;
