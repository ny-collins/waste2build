import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button:focus-visible,
  a:focus-visible {
    outline: 2px solid ${({theme}) => theme.colors.primary};
    outline-offset: 2px;
  }

  button {
    user-select: none;
  }
`;
