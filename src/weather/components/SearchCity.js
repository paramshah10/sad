import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import device from '../responsive/Device';

const SearchBar = styled.form`
  top: ${({ showResult }) => (showResult ? '10%' : '30%')};
  position: relative;
  margin: 0 10%;
  max-width: 500px;
  transition: 0.8s 0.5s;
  @media ${device.laptopL} {
    max-width: 600px;
  }
  @media ${device.desktop} {
    max-width: 700px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  background-color: #ffffff;
  font-size: 16px;
  padding: 10px 15px 10px 40px;
  color: #c5c5c5;
  transition: 0.2s;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  &:focus {
    color: #191919;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    outline: none;
  }
  @media ${device.tablet} {
    font-size: 18px;
  }
  @media ${device.laptop} {
    padding: 15px 20px 15px 45px;
    border-radius: 30px;
  }
`;

const SearchIcon = styled.span`
  display: block;
  position: absolute;
  top: 50%;
  left: 22px;
  transform: translate(-50%, -50%);
  height: 14px;
  width: 14px;
  font-size: 14px;
  color: #c5c5c5;
  @media ${device.tablet} {
    height: 15px;
    width: 15px;
    font-size: 15px;
  }
  @media ${device.laptop} {
    height: 16px;
    width: 16px;
    font-size: 16px;
  }
`;

const SearchBarWrapper = styled.div`
  position: ${({ showResult }) => (showResult ? 'absolute' : 'relative')};
  left: ${({ showResult }) => (showResult ? '125%' : '0%')};
  min-width: ${({ showResult }) => (showResult ? '600px' : '')};
  transition: all 1.5s ease;
`;

  // position: absolute;
  // transform: ${({ showResult }) => (showResult ? 'translate(125%, 0px)' : 'translate(0px, 0px)')};
  // left: 0%;
  // left: ${({ showResult }) => (showResult ? '0%' : '125%')};
  // transition: 0.8s 0.5s 0.5s;
  // min-width: ${({ showResult }) => (showResult ? '600px' : '')};
  

const SearchCity = ({ submit, value, change, showResult }) => {
  console.log('showResult', showResult);
  return (
    <SearchBarWrapper showResult={showResult}>
      <SearchBar showResult={showResult} onSubmit={submit}>
        <SearchInput type="text" value={value} placeholder="Enter city" onChange={change} />
        <SearchIcon>
          <FontAwesomeIcon icon={faSearch} />
        </SearchIcon>
      </SearchBar>
    </SearchBarWrapper>
  );
};

SearchCity.propTypes = {
  submit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  showResult: PropTypes.bool.isRequired,
};

export default SearchCity;
