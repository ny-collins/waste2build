import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiFilter, FiSearch } from "react-icons/fi";
import ListingCard from "../components/ListingCard";

const Page = styled.div`
  padding: 40px 18px;
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
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
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function Marketplace() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/listings");
        // Strict deterministic filtering for public view
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
