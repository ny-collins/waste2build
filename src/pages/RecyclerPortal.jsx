import { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { FiBox, FiCheckCircle, FiClock, FiLayers, FiEye, FiInbox, FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Page = styled.div`
  padding: 0 0 60px;
  background: #f8fafc;
  min-height: calc(100vh - 70px);
`;

const Header = styled.section`
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.teal}, ${({ theme }) => theme.colors.primary});
  padding: 44px 0 60px;
  color: white;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 0 18px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 32px;
`;

const Sub = styled.p`
  margin: 10px 0 0;
  opacity: 0.92;
  max-width: 720px;
  line-height: 1.7;
`;

const Body = styled.section`
  padding: 0;
  margin-top: -30px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const StatIcon = styled.div`
  width: 54px;
  height: 54px;
  border-radius: ${({ theme }) => theme.radius.md};
  display: grid;
  place-items: center;
  background: ${({ $tone }) => $tone};
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
`;

const StatData = styled.div`
  flex-grow: 1;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
`;

const Panel = styled.div`
  margin-top: 24px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: #f8fafc;
`;

const Tab = styled.button`
  flex: 1;
  border: none;
  background: ${({ $active }) => ($active ? "white" : "transparent")};
  color: ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.muted)};
  padding: 16px;
  font-weight: 900;
  font-size: 14px;
  cursor: pointer;
  border-bottom: 2px solid ${({ theme, $active }) => ($active ? theme.colors.primary : "transparent")};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const PanelBody = styled.div`
  padding: 24px;
`;

const Table = styled.div`
  display: grid;
  gap: 16px;
`;

const Row = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 16px 20px;
  display: grid;
  grid-template-columns: 2fr 0.8fr 1fr 1fr auto;
  gap: 16px;
  align-items: center;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.sm};
    border-color: #cbd5e1;
  }

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const TitleCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
`;

const ItemTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const ItemTitle = styled.div`
  font-weight: 900;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const ItemSub = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Small = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: 15px;
  }

  @media (max-width: 980px) {
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-weight: 900;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${({ $type, theme }) => {
    if ($type === "available") return "#eafff1";
    if ($type === "pending") return "#fef3c7";
    if ($type === "accepted") return "#eaf3ff";
    return "#f1f5f9";
  }};
  color: ${({ $type }) => {
    if ($type === "available") return "#166534";
    if ($type === "pending") return "#92400e";
    if ($type === "accepted") return "#1e40af";
    return "#475569";
  }};

  svg { font-size: 12px; }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;

  @media (max-width: 980px) {
    justify-content: flex-start;
    margin-top: 8px;
    padding-top: 12px;
    border-top: 1px dashed ${({ theme }) => theme.colors.border};
  }
`;

const LinkBtn = styled(Link)`
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: white;
  color: ${({ theme }) => theme.colors.primary};
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: #eafff1;
  }
`;

const Empty = styled.div`
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
  p { margin: 0 auto; color: ${({ theme }) => theme.colors.muted}; font-size: 14px; max-width: 400px; }
`;

export default function RecyclerPortal() {
  const [tab, setTab] = useState("all");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketplace = async () => {
      try {
        const { data } = await axios.get("/api/listings");
        setListings(data);
      } catch (error) {
        console.error("Failed to fetch marketplace data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMarketplace();
  }, []);

  const rows = useMemo(() => {
    if (tab === "all") return listings;
    return listings.filter((x) => x.status == tab);
  }, [tab, listings]);

  const stats = useMemo(() => {
    const base = listings.length;
    const available = listings.filter((x) => x.status === "available").length;
    const pending = listings.filter((x) => x.status === "pending").length;
    const accepted = pending; // Pending implies accepted by a recycler in this logic
    return { base, available, pending, accepted };
  }, [listings]);

  const statusIcon = (status) => {
    if (status === "available") return <FiCheckCircle />;
    if (status === "pending") return <FiClock />;
    return <FiLayers />;
  };

  if (loading) return <Page><Header><Container><Title>Loading Portal...</Title></Container></Header></Page>;

  return (
    <Page>
      <Header>
        <Container>
          <Title>Recycler Portal</Title>
          <Sub>Browse listings, accept materials, and manage pickups from sellers across Nigeria.</Sub>
        </Container>
      </Header>

      <Body>
        <Container>
          <StatsGrid>
            <StatCard>
              <StatIcon $tone="#f1f5f9" style={{ color: '#475569' }}><FiLayers /></StatIcon>
              <StatData>
                <StatLabel>Total Manifests</StatLabel>
                <StatValue>{stats.base}</StatValue>
              </StatData>
            </StatCard>

            <StatCard>
              <StatIcon $tone="#eafff1" style={{ color: '#0a9b47' }}><FiCheckCircle /></StatIcon>
              <StatData>
                <StatLabel>Available</StatLabel>
                <StatValue>{stats.available}</StatValue>
              </StatData>
            </StatCard>

            <StatCard>
              <StatIcon $tone="#fef3c7" style={{ color: '#d97706' }}><FiClock /></StatIcon>
              <StatData>
                <StatLabel>In Transit</StatLabel>
                <StatValue>{stats.pending}</StatValue>
              </StatData>
            </StatCard>

            <StatCard>
              <StatIcon $tone="#eaf3ff" style={{ color: '#2563eb' }}><FiBox /></StatIcon>
              <StatData>
                <StatLabel>Resolved</StatLabel>
                <StatValue>{stats.accepted}</StatValue>
              </StatData>
            </StatCard>
          </StatsGrid>

          <Panel>
            <Tabs>
              <Tab type="button" $active={tab === "all"} onClick={() => setTab("all")}>
                All Manifests
              </Tab>
              <Tab type="button" $active={tab === "available"} onClick={() => setTab("available")}>
                Available
              </Tab>
              <Tab type="button" $active={tab === "pending"} onClick={() => setTab("pending")}>
                Pending / Accepted
              </Tab>
            </Tabs>

            <PanelBody>
              {rows.length === 0 ? (
                <Empty>
                  <FiInbox />
                  <h3>No Active Routing Data</h3>
                  <p>There are no listings matching the "{tab}" status in the current marketplace pipeline.</p>
                </Empty>
              ) : (
                <Table>
                  {rows.map((x) => {
                    const total = x.weight_kg * x.price_per_kg;

                    return (
                      <Row key={x.id}>
                        <TitleCol>
                          <ItemTitleRow>
                            <ItemTitle>{x.title}</ItemTitle>
                            <Badge $type={x.status}>
                              {statusIcon(x.status)} {x.status}
                            </Badge>
                          </ItemTitleRow>
                          <ItemSub>{x.location} • Listed by {x.seller_name}</ItemSub>
                        </TitleCol>

                        <Small>
                          <div>Verified Weight</div>
                          <strong>{x.weight_kg} kg</strong>
                        </Small>

                        <Small>
                          <div>Platform Rate</div>
                          <strong>₦{x.price_per_kg} / kg</strong>
                        </Small>

                        <Small>
                          <div>Estimated Payout</div>
                          <strong style={{ color: '#0a9b47' }}>₦{total.toLocaleString()}</strong>
                        </Small>

                        <Actions>
                          <LinkBtn to={`/listings/${x.id}`}>
                            View Manifest <FiArrowRight />
                          </LinkBtn>
                        </Actions>
                      </Row>
                    );
                  })}
                </Table>
              )}
            </PanelBody>
          </Panel>
        </Container>
      </Body>
    </Page>
  );
}
