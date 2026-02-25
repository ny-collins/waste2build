import { useState } from "react";
import styled from "styled-components";
import { FiCheckCircle, FiCopy, FiArrowRight, FiMap } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

const Page = styled.div`
  padding: 60px 0;
  min-height: 70vh;
  display: grid;
  place-items: center;
  background: #f8fafc;
`;

const Container = styled.div`
  max-width: 540px;
  width: 100%;
  margin: 0 auto;
  padding: 0 18px;
`;

const Card = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};
  padding: 40px 30px;
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #E9FBF1;
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  place-items: center;
  font-size: 40px;
  margin: 0 auto 20px;
`;

const Title = styled.h1`
  margin: 0 0 10px;
  font-size: 28px;
`;

const Sub = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 15px;
  line-height: 1.6;
`;

const ReceiptBox = styled.div`
  margin: 30px 0;
  background: #f1f5f9;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 20px;
`;

const Label = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const IdRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const PickupId = styled.div`
  font-size: 24px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 1px;
`;

const CopyBtn = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: grid;
  place-items: center;
  padding: 6px;
  border-radius: 4px;

  &:hover {
    background: #eafff1;
  }
`;

const Actions = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 10px;
`;

const PrimaryBtn = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const SecondaryBtn = styled(Link)`
  background: white;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;

  &:hover {
    background: #f8fafc;
  }
`;

export default function PickupConfirmation() {
  const { pickupId } = useParams();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pickupId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Page>
      <Container>
        <Card>
          <SuccessIcon>
            <FiCheckCircle />
          </SuccessIcon>
          
          <Title>Pickup Scheduled!</Title>
          <Sub>
            The listing has been successfully locked to your account. The seller will be notified of your scheduled pickup time.
          </Sub>

          <ReceiptBox>
            <Label>Transaction Reference</Label>
            <IdRow>
              <PickupId>{pickupId}</PickupId>
              <CopyBtn onClick={handleCopy} aria-label="Copy to clipboard" title="Copy ID">
                {copied ? <FiCheckCircle style={{ color: '#0A9B47' }} /> : <FiCopy />}
              </CopyBtn>
            </IdRow>
            {copied && <span style={{ fontSize: '12px', color: '#0A9B47', marginTop: '4px', display: 'block' }}>Copied!</span>}
          </ReceiptBox>

          <Actions>
            <PrimaryBtn to="/recycler/portal">
              Go to Recycler Portal <FiArrowRight />
            </PrimaryBtn>
            <SecondaryBtn to="/marketplace">
              <FiMap /> Browse More Materials
            </SecondaryBtn>
          </Actions>
        </Card>
      </Container>
    </Page>
  );
}
