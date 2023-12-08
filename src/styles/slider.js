// styles.js
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
  }
`;

export const SliderContainer = styled.div`
  width: 40%;
  margin: 0 auto;
  text-align: center;
`;

export const SliderLabel = styled.label`
  font-size: 18px;
  margin-bottom: 8px;
  display: block;
`;

export const StyledSlider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #e82323;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border: none;
    border-radius: 50%;
    background: #4caf50;
    cursor: pointer;
  }
`;
