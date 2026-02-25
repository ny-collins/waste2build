import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { 
  FiArrowRight, FiTruck, FiDollarSign, FiGlobe, FiLayers, 
  FiCamera, FiMail, FiPhone, FiMessageCircle, FiInstagram, 
  FiFacebook, FiTwitter, FiCheckCircle, FiPackage, FiShoppingCart, FiX 
} from "react-icons/fi";
import { Link } from "react-router-dom";

/* --------------------------- Hero Section --------------------------- */
const Hero = styled.section`
  background: linear-gradient(180deg, #eafff1 0%, #f7fafc 55%);
  padding: 60px 0 80px;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 0 18px;
`;

const CenterContent = styled.div`
  display: grid;
  place-items: center;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #eafff1;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 12px;
  font-weight: 700;
`;

const H1 = styled.h1`
  margin: 20px 0 16px;
  font-size: 54px;
  line-height: 1.1;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 600px) {
    font-size: 40px;
  }
`;

const Sub = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 16px;
  line-height: 1.7;
  max-width: 600px;
`;

const SplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 40px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ActionCard = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 24px;
  text-align: left;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadow.md};
    border-color: #b7f7cc;
  }
`;

const IconWrap = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: grid;
  place-items: center;
  font-size: 20px;
  margin-bottom: 16px;
`;

const PrimaryBtn = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(10, 155, 71, 0.2);
  }
`;

const OutlineBtn = styled(Link)`
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
`;

/* --------------------------- How It Works Section --------------------------- */
const Section = styled.section`
  padding: 80px 0;
  background: #fff;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 50px;

  h2 {
    font-size: 32px;
    margin: 0 0 12px;
  }
  
  p {
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.6;
    margin: 0;
  }
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  text-align: center;
  padding: 20px;

  h4 {
    margin: 16px 0 8px;
    font-size: 18px;
  }

  p {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
  }
`;

const StepIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto;
  border-radius: 50%;
  background: #f8fafc;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  place-items: center;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary};
`;

/* --------------------------- Impact Section (SDG 15) --------------------------- */
const ImpactSection = styled.section`
  padding: 80px 0;
  background: ${({ theme }) => theme.colors.navy};
  color: white;
`;

const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ImpactText = styled.div`
  h2 {
    font-size: 32px;
    margin: 0 0 16px;
  }
  p {
    color: #cbd5e1;
    line-height: 1.7;
    margin: 0 0 20px;
  }
`;

const ImpactImageWrap = styled.div`
  display: grid;
  gap: 20px;
`;

const ImpactImage = styled.img`
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: ${({ theme }) => theme.radius.lg};

  strong {
    display: block;
    font-size: 32px;
    color: ${({ theme }) => theme.colors.primary};
    line-height: 1;
    margin-bottom: 8px;
  }

  span {
    font-size: 13px;
    color: #cbd5e1;
    font-weight: 700;
  }
`;

/* --------------------------- Terminal CTA Section --------------------------- */
const CTASection = styled.section`
  padding: 80px 0 40px;
  text-align: center;
  background: #f8fafc;
`;

const CTACard = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 40px;
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};

  h2 {
    margin: 0 0 12px;
    font-size: 28px;
  }

  p {
    color: ${({ theme }) => theme.colors.muted};
    margin: 0 0 24px;
    line-height: 1.6;
  }
`;

/* --------------------------- Contact Section --------------------------- */
const ContactSection = styled.section`
  background: #f8fafc;
  padding: 40px 0 80px;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 40px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    padding: 24px;
  }
`;

const ContactInfo = styled.div`
  h2 {
    margin: 0 0 12px;
    font-size: 28px;
  }
  p {
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.6;
    margin: 0 0 30px;
  }
`;

const InfoList = styled.div`
  display: grid;
  gap: 16px;
  margin-bottom: 30px;
`;

const InfoItem = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  transition: color 0.2s ease;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 18px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SocialGrid = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialBtn = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f1f5f9;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const Form = styled.form`
  display: grid;
  gap: 16px;
`;

const InputWrap = styled.div`
  display: grid;
  gap: 6px;

  label {
    font-size: 12px;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.muted};
  }

  input, textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};
    background: #f8fafc;
    font-family: inherit;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const SubmitBtn = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMsg = styled.div`
  background: #E9FBF1;
  color: #0A9B47;
  border: 1px solid #b7f7cc;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  color: #0A9B47;
  cursor: pointer;
  display: grid;
  place-items: center;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    background: rgba(10, 155, 71, 0.1);
  }
`;

export default function Home() {
  const [status, setStatus] = useState("idle");
  const timeoutRef = useRef(null);

  // Clear timeout to prevent memory leaks if component unmounts
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    
    // 1. Simulate network request
    setTimeout(() => {
      setStatus("success");
      e.target.reset();
      
      // 2. Auto-reset the form after 6 seconds
      timeoutRef.current = setTimeout(() => {
        setStatus((prev) => (prev === "success" ? "idle" : prev));
      }, 6000);
    }, 1000);
  };

  const handleCloseSuccess = () => {
    clearTimeout(timeoutRef.current);
    setStatus("idle");
  };

  return (
    <>
      <Hero>
        <Container>
          <CenterContent>
            <Pill>🌍 Curbing Land Pollution Through Commerce</Pill>
            <H1>
              Transform Waste into <br /> <span>Raw Materials</span>
            </H1>
            <Sub>
              Waste2Build connects households disposing of recyclable plastics with industries that need them. Stop dumping, start trading, and protect our ecosystems.
            </Sub>

            <SplitGrid>
              <ActionCard>
                <div>
                  <IconWrap $bg="#eafff1" $color="#0A9B47">
                    <FiPackage />
                  </IconWrap>
                  <h3>Dispose & Monetize</h3>
                  <p style={{ color: "#64748B", lineHeight: 1.6, fontSize: "14px", marginTop: "8px" }}>
                    Don't throw plastic waste into landfills. Sort it, weigh it, and sell it directly to verified recyclers on our marketplace.
                  </p>
                </div>
                <PrimaryBtn to="/auth">Start Selling Waste <FiArrowRight /></PrimaryBtn>
              </ActionCard>

              <ActionCard>
                <div>
                  <IconWrap $bg="#eaf3ff" $color="#2563eb">
                    <FiShoppingCart />
                  </IconWrap>
                  <h3>Procure & Recycle</h3>
                  <p style={{ color: "#64748B", lineHeight: 1.6, fontSize: "14px", marginTop: "8px" }}>
                    Source sorted, clean plastic materials directly from local communities. Browse active listings and secure your supply chain.
                  </p>
                </div>
                <OutlineBtn to="/marketplace">Browse Marketplace <FiArrowRight /></OutlineBtn>
              </ActionCard>
            </SplitGrid>
          </CenterContent>
        </Container>
      </Hero>

      <Section>
        <Container>
          <SectionHeader>
            <h2>How Waste2Build Works</h2>
            <p>A closed-loop system designed to make recycling profitable for sellers and efficient for industrial buyers.</p>
          </SectionHeader>

          <StepsGrid>
            <StepCard>
              <StepIcon><FiLayers /></StepIcon>
              <h4>1. Sort & Weigh</h4>
              <p>Separate your plastics, metals, or paper. Weigh them accurately at home or at a community center.</p>
            </StepCard>
            <StepCard>
              <StepIcon><FiCamera /></StepIcon>
              <h4>2. Create a Listing</h4>
              <p>Take clear photos, set your price per kg, and publish your sorted materials to the open marketplace.</p>
            </StepCard>
            <StepCard>
              <StepIcon><FiTruck /></StepIcon>
              <h4>3. Recycler Accepts</h4>
              <p>Verified recyclers browse the marketplace, accept your listing, and schedule a pickup time.</p>
            </StepCard>
            <StepCard>
              <StepIcon><FiDollarSign /></StepIcon>
              <h4>4. Get Paid</h4>
              <p>Hand over the materials during the scheduled pickup and receive your payment directly from the recycler.</p>
            </StepCard>
          </StepsGrid>
        </Container>
      </Section>

      <ImpactSection>
        <Container>
          <ImpactGrid>
            <ImpactText>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0A9B47', fontWeight: 900, marginBottom: '16px', fontSize: '14px' }}>
                <FiGlobe /> UN SDG 15 Initiative
              </div>
              <h2>Protecting Life on Land</h2>
              <p>
                Every kilogram of plastic sold on Waste2Build is a kilogram diverted from our soil, rivers, and ecosystems. We are fundamentally combating land degradation by turning harmful environmental waste into an economic asset.
              </p>
              <p>
                When waste possesses a transparent market value, illegal dumping ceases to be an option.
              </p>
            </ImpactText>
            
            <ImpactImageWrap>
              {/* Resilient static URL depicting extreme land pollution/landfill */}
              <ImpactImage 
                src="https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80&w=800" 
                alt="Severe plastic waste pollution in a landfill" 
              />
              <StatGrid>
                <StatCard>
                  <strong>100%</strong>
                  <span>Traceable Supply Chain</span>
                </StatCard>
                <StatCard>
                  <strong>0</strong>
                  <span>Landfill Contributions</span>
                </StatCard>
              </StatGrid>
            </ImpactImageWrap>

          </ImpactGrid>
        </Container>
      </ImpactSection>

      <CTASection>
        <Container>
          <CTACard>
            <h2>Ready to clean the planet?</h2>
            <p>Whether you have materials to sell or factories to supply, the infrastructure is ready for you.</p>
            <PrimaryBtn to="/auth" style={{ marginTop: '0' }}>Create Your Free Account <FiArrowRight /></PrimaryBtn>
          </CTACard>
        </Container>
      </CTASection>

      <ContactSection>
        <Container>
          <ContactGrid>
            <ContactInfo>
              <h2>Get in touch</h2>
              <p>Have questions about joining the platform or need technical support? Reach out to our team directly.</p>
              
              <InfoList>
                <InfoItem href="mailto:support@waste2build.local">
                  <FiMail /> support@waste2build.local
                </InfoItem>
                <InfoItem href="tel:+2348000000000">
                  <FiPhone /> +234 800 000 0000
                </InfoItem>
                <InfoItem href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer">
                  <FiMessageCircle /> Chat on WhatsApp
                </InfoItem>
              </InfoList>

              <SocialGrid>
                <SocialBtn href="https://instagram.com" target="_blank" aria-label="Instagram">
                  <FiInstagram />
                </SocialBtn>
                <SocialBtn href="https://facebook.com" target="_blank" aria-label="Facebook">
                  <FiFacebook />
                </SocialBtn>
                <SocialBtn href="https://twitter.com" target="_blank" aria-label="X / Twitter">
                  <FiTwitter />
                </SocialBtn>
              </SocialGrid>
            </ContactInfo>

            {status === "success" ? (
              <SuccessMsg>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '14px' }}>
                  <FiCheckCircle size={20} />
                  Message sent successfully!
                </div>
                <CloseBtn onClick={handleCloseSuccess} aria-label="Close message">
                  <FiX size={20} />
                </CloseBtn>
              </SuccessMsg>
            ) : (
              <Form onSubmit={handleContactSubmit}>
                <InputWrap>
                  <label>Full Name</label>
                  <input type="text" required placeholder="John Doe" disabled={status === "submitting"} />
                </InputWrap>
                <InputWrap>
                  <label>Email Address</label>
                  <input type="email" required placeholder="john@example.com" disabled={status === "submitting"} />
                </InputWrap>
                <InputWrap>
                  <label>Message</label>
                  <textarea required placeholder="How can we help you?" disabled={status === "submitting"} />
                </InputWrap>
                <SubmitBtn type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </SubmitBtn>
              </Form>
            )}
          </ContactGrid>
        </Container>
      </ContactSection>
    </>
  );
}
