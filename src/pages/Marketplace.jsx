import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiFilter, FiSearch, FiInbox } from "react-icons/fi";
import ListingCard from "../components/ListingCard";

const Page = styled.div`
  padding: 40px 18px;
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  min-height: 60vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
`;

const TitleBlock = styled.div`
  h1 {
    margin: 0 0 8px;
    font-size: 32px;
  }
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 15px;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
`;

const SelectWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 14px;
  font-weight: 700;

  select {
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-weight: inherit;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

const ViewButton = styled(Link)`
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

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: white;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  color: ${({ theme }) => theme.colors.muted};

  svg {
    font-size: 48px;
    color: #cbd5e1;
    margin-bottom: 16px;
  }

  h3 {
    margin: 0 0 8px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 20px;
  }

  p {
    margin: 0 auto 20px;
    font-size: 14px;
    line-height: 1.6;
    max-width: 450px;
  }
`;

const ActionLink = styled(Link)`
  display: inline-flex;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

export default function Marketplace() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await axios.get("/api/listings");
        const available = data.filter(l => l.status === "available");
        setListings(available);
      } catch (error) {
        console.error("Data pipeline failure:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const filteredListings = filter === "all" 
    ? listings 
    : listings.filter(l => l.category === filter);

  return (
    <Page>
      <Header>
        <TitleBlock>
          <h1>Global Marketplace</h1>
          <p>Procure verified industrial recycling materials.</p>
        </TitleBlock>

        <Controls>
          <SelectWrap>
            <FiFilter />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Categories</option>
              <option value="plastic">Plastics</option>
              <option value="metal">Metals</option>
              <option value="paper">Paper</option>
              <option value="glass">Glass</option>
            </select>
          </SelectWrap>
        </Controls>
      </Header>

      {loading ? (
        <p>Synchronizing market data...</p>
      ) : filteredListings.length === 0 ? (
        <EmptyState>
          <FiInbox />
          <h3>No Materials Available</h3>
          <p>
            The marketplace is currently waiting on new inventory. If you have recyclable waste, you can be the first to list it!
          </p>
          <ActionLink to="/auth">Become a Seller</ActionLink>
        </EmptyState>
      ) : (
        <Grid>
          {filteredListings.map(listing => (
            <ListingCard 
              key={listing.id} 
              listing={listing}
              actions={<ViewButton to={`/listings/${listing.id}`}>View Manifest</ViewButton>}
            />
          ))}
        </Grid>
      )}
    </Page>
  );
}
