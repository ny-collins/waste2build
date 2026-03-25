import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FiPlus, FiTrendingUp, FiCheckCircle, FiClock, FiInbox } from "react-icons/fi";
import { Link } from "react-router-dom";
import ListingCard from "../components/ListingCard";

const Page = styled.div`
  padding: 40px 18px;
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;

  h1 { margin: 0; font-size: 28px; }
`;

const ActionBtn = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(10, 155, 71, 0.2);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }

  svg {
    font-size: 32px;
    color: ${({ theme }) => theme.colors.primary};
    background: #eafff1;
    padding: 12px;
    border-radius: ${({ theme }) => theme.radius.md};
  }
`;

const StatData = styled.div`
  span {
    display: block;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.muted};
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  strong {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 900;
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin: 0 0 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  
  svg {
    font-size: 40px;
    color: #cbd5e1;
    margin-bottom: 16px;
  }
  
  h3 { margin: 0 0 8px; color: ${({ theme }) => theme.colors.text}; }
  p { margin: 0 auto 20px; color: ${({ theme }) => theme.colors.muted}; font-size: 14px; max-width: 400px; }
`;

const ManageBtn = styled(Link)`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 700;
  font-size: 13px;
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.fast};
  text-align: center;
  width: 100%;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.bg};
  }
`;

export default function SellerDashboard() {
  const { user } = useAuth();
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const { data } = await axios.get(`/api/listings?sellerId=${user.id}`);
        setMyListings(data);
      } catch (error) {
        console.error("Data pipeline failure:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user?.id) fetchMyData();
  }, [user]);

  const activeCount = myListings.filter(l => l.status === "available").length;
  const pendingCount = myListings.filter(l => l.status === "pending").length;

  return (
    <Page>
      <Header>
        <h1>Vendor Infrastructure</h1>
        <ActionBtn to="/seller/create-listing">
          <FiPlus /> Initialize Listing
        </ActionBtn>
      </Header>

      <StatsGrid>
        <StatCard>
          <FiTrendingUp />
          <StatData>
            <span>Active Deployments</span>
            <strong>{activeCount}</strong>
          </StatData>
        </StatCard>
        <StatCard>
          <FiClock style={{ color: '#d97706', background: '#fef3c7' }} />
          <StatData>
            <span>Pending Operations</span>
            <strong>{pendingCount}</strong>
          </StatData>
        </StatCard>
        <StatCard>
          <FiCheckCircle style={{ color: '#2563eb', background: '#dbeafe' }} />
          <StatData>
            <span>Resolved Contracts</span>
            <strong>{myListings.length - activeCount - pendingCount}</strong>
          </StatData>
        </StatCard>
      </StatsGrid>

      <SectionTitle>My Materials Manifest</SectionTitle>

      {loading ? (
        <p>Compiling manifest data...</p>
      ) : myListings.length === 0 ? (
        <EmptyState>
          <FiInbox />
          <h3>No Active Manifests</h3>
          <p>Initialize your first material listing to begin routing logistics to our recycler network.</p>
          <ActionBtn to="/seller/create-listing" style={{ display: 'inline-flex', width: 'fit-content' }}>
            <FiPlus /> Create Listing
          </ActionBtn>
        </EmptyState>
      ) : (
        <Grid>
          {myListings.map(listing => (
            <ListingCard 
              key={listing.id} 
              listing={listing} 
              actions={
                <ManageBtn to={`/listings/${listing.id}`}>Manage Manifest</ManageBtn>
              }
            />
          ))}
        </Grid>
      )}
    </Page>
  );
}
