import styled from "styled-components";

const StyledFooter = styled.footer`
  margin-top: 4rem;
  padding: 1.5rem 2rem;
  border-radius: 5px;
  background-color: var(--color-grey-100);
  color: var(--color-grey-600);
  font-size: 1rem;
`;

const FooterContent = styled.div`
  margin-top: auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.2rem;

  a {
    color: inherit;
    text-decoration: none;
    font-weight: 500;
  }

  a:hover {
    color: var(--color-brand-600);
    transition: all 0.15s ease-in-out;
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <FooterContent>
        <span>© {new Date().getFullYear()} Salmera Haven</span>

        <FooterLinks>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Support</a>
        </FooterLinks>
      </FooterContent>
    </StyledFooter>
  );
}

export default Footer;
