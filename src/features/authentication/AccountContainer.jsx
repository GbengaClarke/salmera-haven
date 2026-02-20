import styled from "styled-components";
import Row from "../../styles/Row";
import Heading from "../../styles/Heading";
import UserDataForm from "./UserDataForm";
import ChangePasswordForm from "./ChangePasswordForm";
import useUpdateUser from "./useUpdateUser";

const StyledTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 70rem;
  height: auto;
  gap: 1.5rem;

  & p {
    font-size: 1.3rem;
    color: var(--color-grey-500);
    text-align: left;
    line-height: 1.6;
  }

  & h2 {
    color: var(--color-grey-700);
    text-align: left;
    margin-bottom: 0.4rem;
  }
`;

const RowFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  @media (min-width: 602px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function AccountContainer() {
  const { updateUser, isUpdatingUser } = useUpdateUser();

  return (
    <StyledTableContainer>
      <RowFlex>
        <Row>
          <Heading as={"h2"}>Update Your Account</Heading>
          <p>
            Here you can manage your account details and change your password.
            All changes are applied immediately, so ensure your information is
            correct.
          </p>
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
