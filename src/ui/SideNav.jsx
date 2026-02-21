import { FiSettings } from "react-icons/fi";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { LuUsers } from "react-icons/lu";
import { MdOutlineBedroomParent } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { media } from "../styles/breakpoints";
import useLogout from "../features/authentication/useLogout";
import Uploader from "../data/Uploader";

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  text-align: left;
  /* border: 1px solid red; */

  ${media.tabletsm} {
    padding-top: 5rem;
  }
`;

const Link = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  color: var(--color-grey-500);
  font-weight: 500;

  padding: 0.7rem 1rem;
  border-right: 3px solid rgba(0, 195, 159, 0);
  transition: border-right-color 0.25s ease;
  /* border: 1px solid red; */

  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-blue-500);
    background-color: var(--color-grey-200);
    border-right: 3px solid rgba(0, 195, 159);

    & svg {
      color: var(--color-blue-500);
    }
  }

  &:hover {
    color: var(--color-blue-500);
    background-color: var(--color-grey-50);
    border-right: 3px solid rgba(0, 195, 159, 0.3);
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-400);
    transition: all 0.25s;
  }

  &:hover svg,
  &:active svg {
    color: var(--color-blue-500);
  }

  @media (min-height: 260px) and (max-height: 330px) {
    font-size: 1.2rem;
  }

  ${media.tabletRange} {
    font-size: 1.25rem;
  }
`;

const Logout = styled.li`
  display: flex;
  align-items: center;
  font-weight: 600;
  color: var(--color-red-700);
  margin-top: auto;

  @media (min-height: 260px) and (max-height: 330px) {
    flex-direction: column;
    height: 100dvh;
  }
`;

const LogoutLink = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  color: var(--color-grey-400);
  font-weight: 500;
  width: 100%;
  padding: 0.7rem 1rem;
  border-right: 3px solid rgba(0, 195, 159, 0);
  transition: border-right-color 0.25s ease;
  margin-top: -30rem;
  /* border: 2px solid red; */

  &:hover {
    color: var(--color-red-800);
    background-color: var(--color-grey-200);
    border-right: 3px solid #991b1b;
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-400);
    transition: all 0.25s;
  }

  &:hover svg,
  &:active svg {
    color: var(--color-red-800);
  }

  ${media.tabletsm} {
    margin-top: auto;
    margin-bottom: 3rem;
  }

  @media (min-height: 260px) and (max-height: 330px) {
    font-size: 1.2rem;
    margin-top: 0rem;
  }

  ${media.tabletRange} {
    font-size: 1.25rem;
  }
`;

function SideNav({ closeSideBar }) {
  const { logout } = useLogout();

  function handleCloseSidebar() {
    if (window.innerWidth < 800) closeSideBar();
  }

  return (
    <nav>
      <Ul>
        <li>
          <Link to={"/"} onClick={handleCloseSidebar}>
            <RxDashboard />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to={"/bookings"} onClick={handleCloseSidebar}>
            <HiOutlineCalendarDateRange />
            <span>Bookings</span>
          </Link>
        </li>
        <li>
          <Link to={"/rooms"} onClick={handleCloseSidebar}>
            <MdOutlineBedroomParent />
            <span>Rooms</span>
          </Link>
        </li>
        <li>
          <Link to={"/users"} onClick={handleCloseSidebar}>
            <LuUsers />
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link to={"/settings"} onClick={handleCloseSidebar}>
            <FiSettings />
            <span>Settings</span>
          </Link>
        </li>
        <Uploader />

        <Logout onClick={logout}>
          <LogoutLink>
            <RxDashboard />
            <span>Log Out</span>
          </LogoutLink>
        </Logout>
      </Ul>
    </nav>
  );
}

export default SideNav;
