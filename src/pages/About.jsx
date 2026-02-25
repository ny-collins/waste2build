import styled from "styled-components";
import { FiGlobe, FiTrendingUp, FiShield, FiArrowRight, FiTarget } from "react-icons/fi";
import { Link } from "react-router-dom";

const Page = styled.div`
  padding-bottom: 80px;
`;

const Hero = styled.section`
  background: linear-gradient(180deg, #eafff1 0%, #f7fafc 55%);
  padding: 80px 0 60px;
  text-align: center;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 0 18px;
`;

const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #eafff1;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 24px;
`;

const Title = styled.h1`
  margin: 0 0 20px;
  font-size: 48px;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 600px) {
    font-size: 36px;
  }
`;

const Sub = styled.p`
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 18px;
  line-height: 1.7;
  max-width: 680px;
`;

const Section = styled.section`
  padding: 80px 0 0;
`;

const SplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const TextBlock = styled.div`
  h2 {
    font-size: 32px;
    margin: 0 0 20px;
    line-height: 1.2;
  }

  p {
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.8;
    font-size: 16px;
    margin: 0 0 20px;
  }
`;

const ImageWrap = styled.div`
  width: 100%;
  height: 400px;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.md};
  border: 1px solid ${({ theme }) => theme.colors.border};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PillarsHeader = styled.div`
  text-align: center;
  margin: 100px auto 50px;
  max-width: 600px;

  h2 {
    font-size: 32px;
    margin: 0 0 16px;
  }

  p {
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.6;
    margin: 0;
  }
`;

const PillarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const PillarCard = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 30px;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadow.md};
    border-color: #b7f7cc;
  }

  h3 {
    margin: 16px 0 12px;
    font-size: 20px;
  }

  p {
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.6;
    margin: 0;
    font-size: 14px;
  }
`;

const IconBox = styled.div`
  width: 54px;
  height: 54px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: #eafff1;
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  place-items: center;
  font-size: 24px;
`;

const CTAWrap = styled.div`
  margin-top: 80px;
  background: ${({ theme }) => theme.colors.navy};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 60px 40px;
  text-align: center;
  color: white;

  h2 {
    margin: 0 0 16px;
    font-size: 32px;
  }

  p {
    color: #cbd5e1;
    margin: 0 auto 30px;
    max-width: 500px;
    line-height: 1.6;
  }
`;

const PrimaryBtn = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 14px 24px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(10, 155, 71, 0.2);
  }
`;

export default function About() {
  return (
    <Page>
      <Hero>
        <Container>
          <Pill><FiGlobe /> UN SDG 15 Academic Initiative</Pill>
          <Title>Reclaiming Our Ecosystems.</Title>
          <Sub>
            Waste2Build was engineered to combat severe land degradation by introducing a transparent, technology-driven circular economy. We turn environmental liabilities into economic assets.
          </Sub>
        </Container>
      </Hero>

      <Section>
        <Container>
          <SplitGrid>
            <TextBlock>
              <h2>The Problem: Unchecked Land Pollution</h2>
              <p>
                Urban expansion and industrial growth have led to unprecedented levels of solid waste generation. Without formal, accessible recycling infrastructure, thousands of tons of non-biodegradable plastics and metals are dumped into terrestrial ecosystems daily.
              </p>
              <p>
                This unregulated disposal degrades soil quality, destroys natural habitats, and severely threatens "Life on Land"—the core focus of the UN's Sustainable Development Goal 15.
              </p>
            </TextBlock>
            <ImageWrap>
              <img 
                src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=800" 
                alt="Polluted terrestrial ecosystem" 
              />
            </ImageWrap>
          </SplitGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <SplitGrid style={{ direction: 'rtl' }}>
            <TextBlock style={{ direction: 'ltr' }}>
              <h2>The Solution: A Digital Circular Economy</h2>
              <p>
                Charity alone cannot reverse industrial-scale pollution; it requires economic incentivization. Waste2Build bridges the critical gap between local communities and industrial recycling plants.
              </p>
              <p>
                By providing a transparent digital marketplace, households and local collectors can monetize their sorted waste. Simultaneously, industrial buyers gain access to a reliable, traceable supply chain of raw materials. When waste becomes wealth, dumping stops.
              </p>
            </TextBlock>
            <ImageWrap style={{ direction: 'ltr' }}>
              <img 
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800" 
                alt="Clean, restored natural environment" 
              />
            </ImageWrap>
          </SplitGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <PillarsHeader>
            <h2>Our Core Pillars</h2>
            <p>The foundational principles driving the Waste2Build architecture and mission.</p>
          </PillarsHeader>

          <PillarsGrid>
            <PillarCard>
              <IconBox><FiTarget /></IconBox>
              <h3>SDG 15 Alignment</h3>
              <p>We are explicitly dedicated to halting and reversing land degradation by permanently diverting solid waste from natural terrestrial habitats.</p>
            </PillarCard>

            <PillarCard>
              <IconBox><FiTrendingUp /></IconBox>
              <h3>Economic Empowerment</h3>
              <p>We democratize the recycling industry, allowing everyday citizens to generate verified income from materials they would otherwise discard.</p>
            </PillarCard>

            <PillarCard>
              <IconBox><FiShield /></IconBox>
              <h3>Supply Transparency</h3>
              <p>We provide industrial recyclers with a reliable, digital paper-trail, ensuring the raw materials they procure are ethically sourced from local communities.</p>
            </PillarCard>
          </PillarsGrid>

          <CTAWrap>
            <h2>Join the Initiative</h2>
            <p>Stop dumping. Start trading. Become a part of the solution by joining the Waste2Build marketplace today.</p>
            <PrimaryBtn to="/auth">
              Create an Account <FiArrowRight />
            </PrimaryBtn>
          </CTAWrap>
        </Container>
      </Section>
    </Page>
  );
}
