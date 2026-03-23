import { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  FiGift, FiTrendingUp, FiCheckCircle, FiClock,
  FiCopy, FiSmartphone, FiCreditCard,
} from "react-icons/fi";

const Page = styled.div`
  padding: 0 0 60px;
`;

const Header = styled.section`
  background: ${({ theme }) => theme.colors.teal};
  padding: 44px 0;
  color: white;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 0 18px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 36px;

  @media (max-width: 620px) {
    font-size: 30px;
  }
`;

const Sub = styled.p`
  margin: 10px 0 0;
  opacity: 0.92;
  max-width: 760px;
  line-height: 1.7;
`;

const Body = styled.section`
  padding: 18px 0 0;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: -18px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryCard = styled.div`
  background: ${({ $tone }) => $tone};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 16px;
  display: grid;
  gap: 8px;
`;

const SummaryTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
`;

const IconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: rgba(255, 255, 255, 0.7);
  display: grid;
  place-items: center;
`;

const SummaryLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 900;
`;

const SummaryValue = styled.div`
  font-weight: 900;
  font-size: 22px;
`;

const SummaryHint = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

const Card = styled.div`
  margin-top: 14px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
`;

const CardHead = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
`;

const CardTitle = styled.div`
  font-weight: 900;
`;

const Tabs = styled.div`
  padding: 10px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ $active }) => ($active ? "#E9FBF1" : "#fff")};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.muted)};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 8px 12px;
  font-weight: 900;
  cursor: pointer;
`;

const CardBody = styled.div`
  padding: 16px;
`;

const CouponGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Coupon = styled.div`
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 16px;
  color: white;
  display: grid;
  gap: 10px;
  position: relative;
  overflow: hidden;
  background: ${({ $bg }) => $bg};
`;

const Pill = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  padding: 6px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-weight: 900;
  font-size: 12px;
`;

const CouponTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
`;

const CouponType = styled.div`
  font-size: 12px;
  letter-spacing: 0.3px;
  opacity: 0.95;
  font-weight: 900;
  text-transform: uppercase;
`;

const CouponAmount = styled.div`
  font-size: 28px;
  font-weight: 900;
`;

const CouponBrand = styled.div`
  font-size: 12px;
  opacity: 0.95;
`;

const CodeRow = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.14);
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 12px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

const Code = styled.div`
  font-weight: 900;
  letter-spacing: 0.6px;
`;

const CopyBtn = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.18);
  color: white;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
`;

const CouponMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  opacity: 0.95;
`;

const RedeemBtn = styled.button`
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #0f172a;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  cursor: pointer;
`;

const Empty = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 16px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  line-height: 1.6;
  text-align: center;
`;

const HelpBox = styled.div`
  margin-top: 14px;
  border: 1px solid #b7f7cc;
  background: #e9fbf1;
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 14px;
`;

const HelpTitle = styled.div`
  font-weight: 900;
`;

const HelpGrid = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const HelpCard = styled.div`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 14px;
  display: grid;
  gap: 6px;
`;

const HelpTop = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 900;
`;

const HelpText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
`;

const getVisuals = (type) => {
  if (type === 'Airtime') return { bg: "linear-gradient(135deg, #2563eb, #1d4ed8)", icon: <FiSmartphone /> };
  if (type === 'Voucher') return { bg: "linear-gradient(135deg, #a855f7, #7c3aed)", icon: <FiGift /> };
  return { bg: "linear-gradient(135deg, #f97316, #ea580c)", icon: <FiCreditCard /> };
};

export default function Rewards() {
  const [tab, setTab] = useState("catalog"); // catalog | redeemed
  const [points, setPoints] = useState(0);
  const [catalog, setCatalog] = useState([]);
  const [myCoupons, setMyCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRewardsData = async () => {
    try {
      // Fetch both endpoints concurrently
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
      fetchRewardsData(); // Refresh the ledger state
      setTab("redeemed"); // Auto-switch to the redeemed tab
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
            <SummaryCard $tone="#F2EDFF">
              <SummaryTop>
                <div>
                  <SummaryLabel>Available Balance</SummaryLabel>
                  <SummaryValue>{summary.currentPoints} Points</SummaryValue>
                  <SummaryHint>Earn more by fulfilling pickups</SummaryHint>
                </div>
                <IconBox><FiTrendingUp /></IconBox>
              </SummaryTop>
            </SummaryCard>

            <SummaryCard $tone="#EAF3FF">
              <SummaryTop>
                <div>
                  <SummaryLabel>Total Value Redeemed</SummaryLabel>
                  <SummaryValue>₦{summary.redeemedValue.toLocaleString()}</SummaryValue>
                  <SummaryHint>{summary.redeemedCount} coupons secured</SummaryHint>
                </div>
                <IconBox><FiCheckCircle /></IconBox>
              </SummaryTop>
            </SummaryCard>
          </SummaryGrid>

          <Card>
            <CardHead>
              <CardTitle>Reward Ledger</CardTitle>
            </CardHead>

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
                  <FiClock /> No coupons found in {tab === 'catalog' ? 'the catalog' : 'your wallet'}
                </Empty>
              ) : (
                <CouponGrid>
                  {currentView.map((c) => {
                    const visuals = getVisuals(c.type);
                    return (
                      <Coupon key={c.id || c.code} $bg={visuals.bg}>
                        <Pill>{tab === 'catalog' ? 'Available' : 'Redeemed'}</Pill>
                        <CouponTop>
                          <div>
                            <CouponType>{c.type}</CouponType>
                            <CouponAmount>₦{c.amount.toLocaleString()}</CouponAmount>
                            <CouponBrand>{c.brand}</CouponBrand>
                          </div>
                          <IconBox>{visuals.icon}</IconBox>
                        </CouponTop>

                        <CodeRow>
                          <Code>{tab === "catalog" ? "••••-••••-••••" : c.code}</Code>
                          {tab === "redeemed" && (
                            <CopyBtn type="button" onClick={() => copyCode(c.code)}>
                              <FiCopy /> Copy
                            </CopyBtn>
                          )}
                        </CodeRow>

                        <CouponMeta>
                          <span>{tab === "catalog" ? `Cost: ${c.point_cost} pts` : `Redeemed: ${new Date(c.redeemed_at).toLocaleDateString()}`}</span>
                          {tab === "catalog" && (
                            <RedeemBtn type="button" onClick={() => redeemNow(c)}>
                              Redeem Now
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
