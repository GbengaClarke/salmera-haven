import styled from "styled-components";
import Row from "../../styles/Row";
import Heading from "../../styles/Heading";
import { media } from "../../styles/breakpoints";
import UserDataForm from "./UserDataForm";
import ChangePasswordForm from "./ChangePasswordForm";
import useUpdateUser from "./useUpdateUser";
// import UserDataForm from "./UserDataForm";
// import ChangePasswordForm from "./ChangePasswordForm";

const StyledTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  width: 100%;
  height: auto;
  /* gap: 1rem; */

  & p {
    font-size: 1rem;
    color: var(--color-grey-500);
    text-align: left;
  }

  & h3 {
    color: var(--color-grey-700);
    text-align: left;
  }
`;

const RowFlex = styled.div`
  display: flex;
  padding: 0.5rem 0.7rem;
  flex-direction: column;
  /* border: 1px solid red; */
  /* gap: 1rem; */

  /* & div {
    gap: 2rem;
  } */

  @media (min-width: 602px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    /* gap: 0.8rem; */
  }
`;

const TableWrapper = styled.div`
  /* overflow-x: scroll;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;

  ${media.mobile} {
    overflow-x: auto;
    margin-bottom: 0;
  } */

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function AccountContainer() {
  const { updateUser, errorUpdatingUser, isUpdatingUser } = useUpdateUser();

  return (
    <StyledTableContainer>
      <RowFlex>
        <Row>
          <Heading as={"h3"}>Update your account</Heading>
          <p>Manage and update your account details here.</p>
        </Row>
      </RowFlex>

      <Row>
        <TableWrapper>
          <UserDataForm
            updateUser={updateUser}
            isUpdatingUser={isUpdatingUser}
          />
          <ChangePasswordForm
            updateUser={updateUser}
            isUpdatingUser={isUpdatingUser}
          />
        </TableWrapper>
      </Row>
    </StyledTableContainer>
  );
}

export default AccountContainer;
