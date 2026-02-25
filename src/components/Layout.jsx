import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

export default function Layout() {
  return (
    <Page>
      <Navbar />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Page>
  );
}
