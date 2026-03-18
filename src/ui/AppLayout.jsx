import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useRef, useState } from "react";
import { media } from "../styles/breakpoints";
import Footer from "./Footer";

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

  ${media.tabletRange} {
    grid-template-columns: 14.5rem 1fr;
  }
`;

const Main = styled.main`
  grid-column: span 2;
  background-color: var(--color-grey-50);
  overflow-y: scroll;
  padding-top: 2.5rem;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  padding-inline: 3%;
  margin-inline: auto;

  ${({ $sidebarOpen }) =>
    $sidebarOpen &&
    `
    pointer-events: none;
    user-select: none;
  `}

  /* Slim Scrollbar - Chrome, Edge, Safari */
    &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-grey-400);
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: var(--color-grey-300) transparent;
`;

const StyledOutlet = styled.div`
  /* border: 1px solid red; */
  /* height: 100%; */
  margin-bottom: auto;
`;

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef(null);

  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  function toggleSideBar() {
    setSidebarOpen((sb) => !sb);
  }

  return (
    <StyledMaxWidth>
      <StyledAppLayoutGrid $sidebarOpen={sidebarOpen}>
        <BackdropEffect
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSidebarOpen(false);
          }}
          $sidebarOpen={sidebarOpen}
        />
        <Sidebar
          isOpen={sidebarOpen}
          closeSideBar={() => setSidebarOpen(false)}
          scrollToTop={scrollToTop}
        />
        <Header
          mainRef={mainRef}
          toggleSideBar={toggleSideBar}
          sidebarOpen={sidebarOpen}
        />
        <Main ref={mainRef}>
          <StyledOutlet>
            <Outlet context={{ sidebarOpen, scrollToTop }} />
          </StyledOutlet>
          <Footer />
        </Main>
      </StyledAppLayoutGrid>
    </StyledMaxWidth>
  );
}

export default AppLayout;
