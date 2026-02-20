// import DashboardContainer from "../features/dashboard/DashboardContainer";
// import { StyledSection } from "./Bookings";

// function Dashboard() {
//   return (
//     <StyledSection>
//       <DashboardContainer />
//     </StyledSection>
//   );
// }

// export default Dashboard;

//im adding this version due to the click of the todayOverview table when the side bar closes

import { useOutletContext } from "react-router-dom";
import DashboardContainer from "../features/dashboard/DashboardContainer";
import styled from "styled-components";
import { StyledSection } from "./Bookings";
import { useEffect, useState } from "react";

const ClickableSection = styled(StyledSection)`
  pointer-events: ${({ $disable }) => ($disable ? "none" : "auto")};
`;

function Dashboard() {
  const { sidebarOpen } = useOutletContext();
  const [disableClick, setDisableClick] = useState(false);

  useEffect(() => {
    let timer;

    if (sidebarOpen) {
      setDisableClick(true);
    } else {
      timer = setTimeout(() => setDisableClick(false), 0.5);
    }

    return () => clearTimeout(timer);
  }, [sidebarOpen]);

  return (
    <ClickableSection $disable={disableClick}>
      <DashboardContainer />
    </ClickableSection>
  );
}

export default Dashboard;
