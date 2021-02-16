import React, { useState } from 'react';
import styled from 'styled-components';
import { Multiselect } from 'multiselect-react-dropdown';

const OnboardWrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  overflow: hidden;
`

export default function Onboard(props) {
  const [selectedOption, setSelectedOptions] = useState({})

  let sadOptions = [
    {
      season: "Fall",
      id: 1
    },
    {
      season: "Winter",
      id: 2
    },
    {
      season: "Spring",
      id: 3
    },
    {
      season: "Summer",
      id: 4
    }
  ]

  const SADSelectedOptions = (values) => {
    values = values.map((elem) => elem['season']);
    setSelectedOptions(values);
  }

  return (
    <OnboardWrapper>
      <form>
        {/* <div className="relative w-full mb-5 py-3">
          <label
            className="block uppercase text-gray-700 text-xs font-bold mb-2 "
            htmlFor="grid-password"
          >
            Where are you from?
          </label>
          <input
            type="email"
            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
            placeholder="Enter your location here"
            // onChange={e => setEmail(e.target.value)}
          />
        </div> */}

        <div className="relative w-full mb-5 py-3">
          <label
            className="block uppercase text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            When do you usually get seasonal depression?
          </label>
          <Multiselect
            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
            options={sadOptions}
            onSelect={SADSelectedOptions}
            displayValue="season"
          />
        </div>

        <div className="relative w-full mb-5 py-3">
          <label
            className="block uppercase text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            What's the frequency of seasonal attacks?
          </label>
          <Multiselect
            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
            options={[{ i: "Once a day"}, { i: "Several times a day"}, { i: "Once a week"}, { i: "Several times a week"}, { i: "Once a month"}, { i: "Several times a month"}]}
            onSelect={null}
            displayValue="i"
            selectionLimit="1"
          />
        </div>

        <div className="relative w-full mb-5 py-3">
          <label
            className="block uppercase text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            On a scale of 1-10, how bad are your average seasonal attacks?
          </label>
          <Multiselect
            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
            options={[{ i:1}, { i:2}, { i:3}, { i:4}, { i:5}, { i:6}, { i:7}, { i:8}, { i:9}, { i:10}]}
            onSelect={null}
            displayValue="i"
            selectionLimit="1"
          />
        </div>

      </form>

      <button
        style={{position:"absolute", top: "72%", backgroundColor: "#1e40af", color: "#fff"}}
        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow"
        onClick={props.toggleOnboard}
      >
        Continue to dashboard!
      </button>
    </OnboardWrapper>
  )
}