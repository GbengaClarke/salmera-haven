import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useRef, useState } from "react";
import { media } from "../styles/breakpoints";
import { swipeInMenu } from "./ux";

const StyledMaxWidth = styled.div`
  max-width: 1200px;
  width: 100%;
  margin-inline: auto;
`;

const BackdropEffect = styled.div`
  background: rgba(0, 0, 0, 0.45);
  position: fixed;

  inset: 0;

  opacity: ${({ $sidebarOpen }) => ($sidebarOpen ? 1 : 0)};
  pointer-events: ${({ $sidebarOpen }) => ($sidebarOpen ? "auto" : "none")};
  backdrop-filter: blur(3px);

  z-index: 10;
`;

const StyledAppLayoutGrid = styled.div`
  height: 100dvh;
  display: grid;

  grid-template-columns: minmax(15rem, 17rem) 1fr;
  grid-template-rows: 5.5rem auto;

  /* ${media.laptopsm} {
  } */
`;

const Main = styled.main`
  grid-column: span 2;
  background-color: var(--color-grey-50);
  /* grid-row: 2; */
  /* overflow-y: auto; */
  /* border: 1px solid red; */
  width: 100%;
  padding: 3%;
  margin-inline: auto;
`;

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  function toggleSideBar() {
    setSidebarOpen((sb) => !sb);
  }

  const { onTouchStart, onTouchMove, onTouchEnd } = swipeInMenu(
    touchStartX,
    touchEndX,
    setSidebarOpen
  );

  return (
    <StyledMaxWidth>
      <StyledAppLayoutGrid
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        $sidebarOpen={sidebarOpen}
      >
        <BackdropEffect $sidebarOpen={sidebarOpen} />
        <Sidebar
          isOpen={sidebarOpen}
          closeSideBar={() => setSidebarOpen(false)}
        />
        <Header toggleSideBar={toggleSideBar} sidebarOpen={sidebarOpen} />
        <Main>
          <Outlet />
        </Main>
      </StyledAppLayoutGrid>
    </StyledMaxWidth>
  );
}

export default AppLayout;
