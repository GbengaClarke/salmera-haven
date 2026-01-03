import styled from "styled-components";
import { useDarkModeContext } from "../context/DarkModeContext";

const Blue = styled.div`
  background-color: var(--color-blue-500);
  color: var(--);
  /* font-size: 10rem; */
`;
function Test() {
  const { toggleTheme, isDarkMode, theme } = useDarkModeContext();

  // console.log("x");

  return (
    <div>
      <Blue>School fees payment</Blue>

      <button onClick={toggleTheme}>theme: {theme}</button>
    </div>
  );
}

export default Test;
