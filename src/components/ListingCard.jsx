import styled from "styled-components";
import { FiMapPin, FiBox, FiClock, FiTag } from "react-icons/fi";
import { Link } from "react-router-dom";

const Card = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-2px);
  }
`;

const ImagePlaceholder = styled.div`
  height: 180px;
  background: #e2e8f0;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Body = styled.div`
  padding: 18px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const CategoryBadge = styled.span`
  background: #eafff1;
  color: ${({ theme }) => theme.colors.primaryDark};
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StatusBadge = styled.span`
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 20px;
  background: ${({ $status }) => ($status === "available" ? "#f0fdf4" : "#fef3c7")};
  color: ${({ $status }) => ($status === "available" ? "#166534" : "#92400e")};
`;

const Title = styled.h3`
  margin: 0 0 12px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 8px;
  margin-bottom: 18px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 500;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Footer = styled.div`
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PriceLayout = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.muted};
    font-weight: 700;
    text-transform: uppercase;
  }

  strong {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 900;
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export default function ListingCard({ listing, actions }) {
  // Aggregate computation for standard UI metric
  const totalValue = (listing.weight_kg * listing.price_per_kg).toLocaleString();

  return (
    <Card>
      <ImagePlaceholder>Material Image</ImagePlaceholder>
      <Body>
        <MetaRow>
          <CategoryBadge><FiBox /> {listing.category}</CategoryBadge>
          <StatusBadge $status={listing.status}>{listing.status}</StatusBadge>
        </MetaRow>

        <Title>{listing.title}</Title>

        <InfoGrid>
          <InfoItem><FiTag /> {listing.weight_kg} kg verified</InfoItem>
          <InfoItem><FiMapPin /> {listing.location}</InfoItem>
          <InfoItem><FiClock /> Listed {new Date(listing.created_at).toLocaleDateString()}</InfoItem>
        </InfoGrid>

        <Footer>
          <PriceLayout>
            <span>Total Value</span>
            <strong>₦{totalValue}</strong>
          </PriceLayout>
          
          <ActionWrapper>
            {actions}
          </ActionWrapper>
        </Footer>
      </Body>
    </Card>
  );
}
