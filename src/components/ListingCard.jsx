import styled from "styled-components";
import { FiMapPin, FiBox, FiClock, FiTag, FiImage } from "react-icons/fi";

const Card = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  transition: box-shadow ${({ theme }) => theme.transitions.normal}, transform ${({ theme }) => theme.transitions.normal};
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-2px);
  }
`;

const CoverWrap = styled.div`
  height: 180px;
  width: 100%;
  background: #e2e8f0;
  position: relative;
  overflow: hidden;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${Card}:hover & {
    transform: scale(1.05); /* Subtle zoom effect on card hover */
  }
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.muted};
  gap: 8px;
  
  svg {
    font-size: 24px;
    opacity: 0.5;
  }
  
  span {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
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
  background: ${({ theme }) => theme.colors.tags.blue};
  color: #1e40af;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StatusBadge = styled.span`
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ $status, theme }) => ($status === "available" ? theme.colors.status.available : theme.colors.status.pending)};
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
  const totalValue = (listing.weight_kg * listing.price_per_kg).toLocaleString();
  
  const hasImages = listing.images && listing.images.length > 0;

  return (
    <Card>
      <CoverWrap>
        {hasImages ? (
          <CoverImage src={listing.images[0]} alt={listing.title} loading="lazy" />
        ) : (
          <Placeholder>
            <FiImage />
            <span>No Image</span>
          </Placeholder>
        )}
      </CoverWrap>
      
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
