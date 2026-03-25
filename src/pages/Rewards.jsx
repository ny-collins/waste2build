import { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  FiGift, FiTrendingUp, FiCheckCircle, FiClock,
  FiCopy, FiSmartphone, FiCreditCard,
} from "react-icons/fi";

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
  max-width: 760px;
  line-height: 1.7;
`;

const Body = styled.section`
  padding: 0;
  margin-top: -30px;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryCard = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconBox = styled.div`
  width: 54px;
  height: 54px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ $bg }) => $bg || "#f1f5f9"};
  color: ${({ $color }) => $color || "#64748b"};
  display: grid;
  place-items: center;
  font-size: 24px;
`;

const SummaryData = styled.div`
  flex-grow: 1;
`;

const SummaryLabel = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const SummaryValue = styled.div`
  font-weight: 900;
  font-size: 28px;
  color: ${({ theme }) => theme.colors.text};
`;

const Card = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
  margin-bottom: 24px;
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

const CardBody = styled.div`
  padding: 24px;
`;

const CouponGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const Coupon = styled.div`
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  background: ${({ $bg }) => $bg};
  box-shadow: ${({ theme }) => theme.shadow.md};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Pill = styled.div`
  display: inline-flex;
  width: fit-content;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-weight: 900;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`;

const CouponTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CouponType = styled.div`
  font-size: 13px;
  letter-spacing: 0.5px;
  opacity: 0.9;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const CouponAmount = styled.div`
  font-size: 32px;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 4px;
`;

const CouponBrand = styled.div`
  font-size: 14px;
  opacity: 0.9;
  font-weight: 600;
`;

const CodeRow = styled.div`
  background: rgba(0, 0, 0, 0.15);
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Code = styled.div`
  font-weight: 900;
  letter-spacing: 2px;
  font-family: monospace;
  font-size: 16px;
`;

const CopyBtn = styled.button`
  border: none;
  background: white;
  color: #0f172a;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: 900;
  font-size: 12px;
  display: inline-flex;
  gap: 6px;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover { opacity: 0.9; }
`;

const RedeemBtn = styled.button`
  border: none;
  background: white;
  color: #0f172a;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  cursor: pointer;
  width: 100%;
  transition: transform 0.1s ease, opacity 0.2s ease;

  &:hover:not(:disabled) { transform: scale(1.02); }
  
  &:disabled { 
    opacity: 0.5; 
    cursor: not-allowed; 
    transform: none; 
    background: #e2e8f0;
    color: #64748b;
  }
`;

const CouponMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 13px;
  opacity: 0.95;
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

const HelpBox = styled.div`
  background: #eafff1;
  border: 1px solid #b7f7cc;
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 24px;
`;

const HelpTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

const HelpGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;

const HelpCard = styled.div`
  background: #fff;
  border: 1px solid rgba(10, 155, 71, 0.2);
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const HelpTop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 18px;
  }
`;

const HelpText = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
`;

const getVisuals = (type) => {
  if (type === 'Airtime') return { bg: "linear-gradient(135deg, #3b82f6, #1d4ed8)", icon: <FiSmartphone /> };
  if (type === 'Voucher') return { bg: "linear-gradient(135deg, #a855f7, #6d28d9)", icon: <FiGift /> };
  return { bg: "linear-gradient(135deg, #f97316, #c2410c)", icon: <FiCreditCard /> };
};

export default function Rewards() {
  const [tab, setTab] = useState("catalog"); 
  const [points, setPoints] = useState(0);
  const [catalog, setCatalog] = useState([]);
  const [myCoupons, setMyCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRewardsData = async () => {
    try {
      const [meRes, catalogRes] = await Promise.all([
        axios.get("/api/rewards/me"),
        axios.get("/api/rewards/catalog")
      ]);
      setPoints(meRes.data.points);
      setMyCoupons(meRes.data.redeemedCoupons);
      setCatalog(catalogRes.data);
    } catch (err) {
      console.error("Failed to fetch rewards", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewardsData();
  }, []);

  const currentView = useMemo(() => {
    return tab === "catalog" ? catalog : myCoupons;
  }, [tab, catalog, myCoupons]);

  const summary = useMemo(() => {
    const redeemedValue = myCoupons.reduce((sum, c) => sum + c.amount, 0);
    return { currentPoints: points, redeemedValue, redeemedCount: myCoupons.length };
  }, [points, myCoupons]);

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Code copied to clipboard!");
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  };

  const redeemNow = async (coupon) => {
    if (!window.confirm(`Redeem ${coupon.brand} ${coupon.type} for ${coupon.point_cost} points?`)) return;
    
    try {
      await axios.post("/api/rewards/redeem", { couponId: coupon.id });
      alert("Transaction successful! Coupon redeemed.");
      fetchRewardsData(); 
      setTab("redeemed"); 
    } catch (err) {
      alert(err.response?.data?.error || "Transaction failed");
    }
  };

  if (loading) return <Page><Header><Container><Title>Loading Ledger...</Title></Container></Header></Page>;

  return (
    <Page>
      <Header>
        <Container>
          <Title>Rewards & Coupons</Title>
          <Sub>Redeem your earned points for airtime, vouchers, and gift cards.</Sub>
        </Container>
      </Header>

      <Body>
        <Container>
          <SummaryGrid>
            <SummaryCard>
              <IconBox $bg="#eafff1" $color="#0a9b47"><FiTrendingUp /></IconBox>
              <SummaryData>
                <SummaryLabel>Available Balance</SummaryLabel>
                <SummaryValue>{summary.currentPoints} pts</SummaryValue>
              </SummaryData>
            </SummaryCard>

            <SummaryCard>
              <IconBox $bg="#eaf3ff" $color="#2563eb"><FiCheckCircle /></IconBox>
              <SummaryData>
                <SummaryLabel>Total Value Redeemed</SummaryLabel>
                <SummaryValue>₦{summary.redeemedValue.toLocaleString()}</SummaryValue>
              </SummaryData>
            </SummaryCard>
          </SummaryGrid>

          <Card>
            <Tabs>
              <Tab type="button" $active={tab === "catalog"} onClick={() => setTab("catalog")}>
                Platform Catalog
              </Tab>
              <Tab type="button" $active={tab === "redeemed"} onClick={() => setTab("redeemed")}>
                My Wallet
              </Tab>
            </Tabs>

            <CardBody>
              {currentView.length === 0 ? (
                <Empty>
                  <FiClock />
                  <h3>No Coupons Found</h3>
                  <p>There are currently no items in {tab === 'catalog' ? 'the catalog' : 'your wallet'}.</p>
                </Empty>
              ) : (
                <CouponGrid>
                  {currentView.map((c) => {
                    const visuals = getVisuals(c.type);
                    const canRedeem = points >= c.point_cost;
                    
                    return (
                      <Coupon key={c.id || c.code} $bg={visuals.bg}>
                        <CouponTop>
                          <div>
                            <Pill>{tab === 'catalog' ? 'Available' : 'Redeemed'}</Pill>
                            <CouponType>{c.type}</CouponType>
                            <CouponAmount>₦{c.amount.toLocaleString()}</CouponAmount>
                            <CouponBrand>{c.brand}</CouponBrand>
                          </div>
                          <div style={{ fontSize: '38px', opacity: 0.8 }}>
                            {visuals.icon}
                          </div>
                        </CouponTop>

                        {tab === "redeemed" && (
                          <CodeRow>
                            <Code>{c.code}</Code>
                            <CopyBtn type="button" onClick={() => copyCode(c.code)}>
                              <FiCopy /> Copy
                            </CopyBtn>
                          </CodeRow>
                        )}

                        <CouponMeta>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                            <span>{tab === "catalog" ? "Cost" : "Redeemed On"}</span>
                            <span>{tab === "catalog" ? `${c.point_cost} pts` : new Date(c.redeemed_at).toLocaleDateString()}</span>
                          </div>
                          
                          {tab === "catalog" && (
                            <RedeemBtn 
                              type="button" 
                              onClick={() => redeemNow(c)}
                              disabled={!canRedeem}
                            >
                              {canRedeem ? "Redeem Now" : "Insufficient Points"}
                            </RedeemBtn>
                          )}
                        </CouponMeta>
                      </Coupon>
                    );
                  })}
                </CouponGrid>
              )}
            </CardBody>
          </Card>

          <HelpBox>
            <HelpTitle>How to Earn More Points</HelpTitle>
            <HelpGrid>
              <HelpCard>
                <HelpTop>
                  <FiGift /> Sell More Waste
                </HelpTop>
                <HelpText>Earn points by successfully completing transactions with verified recyclers.</HelpText>
              </HelpCard>
              <HelpCard>
                <HelpTop>
                  <FiTrendingUp /> Higher Quality
                </HelpTop>
                <HelpText>Better quality, sorted materials fetch higher point bonuses.</HelpText>
              </HelpCard>
              <HelpCard>
                <HelpTop>
                  <FiCheckCircle /> Regular Activity
                </HelpTop>
                <HelpText>Active sellers receive exclusive access to premium rewards.</HelpText>
              </HelpCard>
            </HelpGrid>
          </HelpBox>

        </Container>
      </Body>
    </Page>
  );
}
