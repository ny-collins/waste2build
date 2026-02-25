import styled from "styled-components";
import { FiGlobe } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";

const Wrap = styled.footer`
  background: ${({ theme }) => theme.colors.navy};
  color: #cbd5e1;
  padding: 40px 0;
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 0 18px;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1.2fr;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Title = styled.h4`
  margin: 0 0 10px;
  color: white;
  font-weight: 900;
  letter-spacing: 0.5px;
`;

const NavLink = styled(RouterLink)`
  display: block;
  color: #cbd5e1;
  font-size: 13px;
  margin: 8px 0;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    color: #eafff1;
    transform: translateX(4px);
  }
`;

const LegalLink = styled.a`
  display: block;
  color: #cbd5e1;
  font-size: 13px;
  margin: 8px 0;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    color: #eafff1;
    transform: translateX(4px);
  }
`;

const SDGBadge = styled.div`
  margin-top: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 12px;
  font-weight: 700;
  color: #fff;
`;

const Bottom = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 30px auto 0;
  padding: 20px 18px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 12px;
  opacity: 0.8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

export default function Footer() {
  const handleLegalClick = (e) => {
    e.preventDefault();
    alert("As this is an MVP, full legal documents (Privacy Policy, Terms of Service) are pending for the production release.");
  };

  return (
    <Wrap>
      <Inner>
        <div>
          <Title>WASTE2BUILD</Title>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>
            Connecting communities with recyclers to transform waste into valuable resources and protect our ecosystems.
          </p>
          <SDGBadge>
            <FiGlobe /> Official UN SDG 15 Initiative
          </SDGBadge>
        </div>

        <div>
          <Title>Platform</Title>
          <NavLink to="/marketplace">Marketplace</NavLink>
          <NavLink to="/auth">Sign In / Register</NavLink>
          <NavLink to="/about">About the Mission</NavLink>
        </div>

        <div>
          <Title>Legal</Title>
          <LegalLink onClick={handleLegalClick}>Privacy Policy</LegalLink>
          <LegalLink onClick={handleLegalClick}>Terms of Service</LegalLink>
          <LegalLink onClick={handleLegalClick}>Safety Guidelines</LegalLink>
        </div>

        <div>
          <Title>UN Sustainable Development Goal 15</Title>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, opacity: 0.8 }}>
            "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss."
          </p>
        </div>
      </Inner>

      <Bottom>
        <span>© 2026 Waste2Build MVP. Academic Initiative.</span>
        <span>Curbing Land Pollution Through Commerce.</span>
      </Bottom>
    </Wrap>
  );
}
