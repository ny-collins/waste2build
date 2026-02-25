import { useMemo, useState } from "react";
import styled from "styled-components";
import {
  FiGift,
  FiTrendingUp,
  FiCheckCircle,
  FiClock,
  FiCopy,
  FiSmartphone,
  FiCreditCard,
} from "react-icons/fi";

/* --------------------------- Styles --------------------------- */

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

/* --------------------------- Mock Data --------------------------- */

const MOCK_COUPONS = [
  {
    id: "c1",
    type: "Airtime",
    amount: 500,
    brand: "MTN",
    code: "WTB-AIR-12345",
    expires: "3/14/2026",
    status: "active",
    bg: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    icon: <FiSmartphone />,
  },
  {
    id: "c2",
    type: "Voucher",
    amount: 1000,
    brand: "Shoprite",
    code: "WTB-VOU-67890",
    expires: "4/14/2026",
    status: "active",
    bg: "linear-gradient(135deg, #a855f7, #7c3aed)",
    icon: <FiGift />,
  },
  {
    id: "c3",
    type: "Gift Card",
    amount: 2000,
    brand: "Amazon",
    code: "WTB-GFT-11223",
    expires: "5/14/2026",
    status: "active",
    bg: "linear-gradient(135deg, #f97316, #ea580c)",
    icon: <FiCreditCard />,
  },
  {
    id: "c4",
    type: "Airtime",
    amount: 300,
    brand: "Glo",
    code: "WTB-AIR-44556",
    expires: "2/01/2026",
    status: "redeemed",
    bg: "linear-gradient(135deg, #0ea5e9, #0284c7)",
    icon: <FiSmartphone />,
  },
  {
    id: "c5",
    type: "Voucher",
    amount: 500,
    brand: "Konga",
    code: "WTB-VOU-99001",
    expires: "1/10/2026",
    status: "expired",
    bg: "linear-gradient(135deg, #64748b, #475569)",
    icon: <FiGift />,
  },
];

export default function Rewards() {
  const [tab, setTab] = useState("active"); // active | redeemed | expired

  const coupons = useMemo(() => {
    return MOCK_COUPONS.filter((c) => c.status === tab);
  }, [tab]);

  const summary = useMemo(() => {
    const active = MOCK_COUPONS.filter((c) => c.status === "active");
    const redeemed = MOCK_COUPONS.filter((c) => c.status === "redeemed");

    const totalCouponValue = active.reduce((s, c) => s + c.amount, 0);
    const pointsEarned = 1125;
    const redeemedValue = redeemed.reduce((s, c) => s + c.amount, 0);

    return { totalCouponValue, activeCount: active.length, pointsEarned, redeemedValue, redeemedCount: redeemed.length };
  }, []);

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Code copied!");
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  };

  const redeemNow = (coupon) => {
    alert(`Redeem flow will be connected to backend later.\n\nCoupon: ${coupon.code}`);
  };

  return (
    <Page>
      <Header>
        <Container>
          <Title>Rewards & Coupons</Title>
          <Sub>Redeem your earned coupons for airtime, vouchers, and gift cards.</Sub>
        </Container>
      </Header>

      <Body>
        <Container>
          <SummaryGrid>
            <SummaryCard $tone="#F2EDFF">
              <SummaryTop>
                <div>
                  <SummaryLabel>Total Coupon Value</SummaryLabel>
                  <SummaryValue>₦{summary.totalCouponValue.toLocaleString()}</SummaryValue>
                  <SummaryHint>{summary.activeCount} active coupons</SummaryHint>
                </div>
                <IconBox>
                  <FiGift />
                </IconBox>
              </SummaryTop>
            </SummaryCard>

            <SummaryCard $tone="#E9FBF1">
              <SummaryTop>
                <div>
                  <SummaryLabel>Points Earned</SummaryLabel>
                  <SummaryValue>{summary.pointsEarned}</SummaryValue>
                  <SummaryHint>10% of total earnings</SummaryHint>
                </div>
                <IconBox>
                  <FiTrendingUp />
                </IconBox>
              </SummaryTop>
            </SummaryCard>

            <SummaryCard $tone="#EAF3FF">
              <SummaryTop>
                <div>
                  <SummaryLabel>Redeemed Value</SummaryLabel>
                  <SummaryValue>₦{summary.redeemedValue.toLocaleString()}</SummaryValue>
                  <SummaryHint>{summary.redeemedCount} coupon redeemed</SummaryHint>
                </div>
                <IconBox>
                  <FiCheckCircle />
                </IconBox>
              </SummaryTop>
            </SummaryCard>
          </SummaryGrid>

          <Card>
            <CardHead>
              <CardTitle>Your Coupons</CardTitle>
            </CardHead>

            <Tabs>
              <Tab type="button" $active={tab === "active"} onClick={() => setTab("active")}>
                Active
              </Tab>
              <Tab type="button" $active={tab === "redeemed"} onClick={() => setTab("redeemed")}>
                Redeemed
              </Tab>
              <Tab type="button" $active={tab === "expired"} onClick={() => setTab("expired")}>
                Expired
              </Tab>
            </Tabs>

            <CardBody>
              {coupons.length === 0 ? (
                <Empty>
                  <FiClock /> No {tab} coupons
                </Empty>
              ) : (
                <CouponGrid>
                  {coupons.map((c) => (
                    <Coupon key={c.id} $bg={c.bg}>
                      <Pill>{tab}</Pill>

                      <CouponTop>
                        <div>
                          <CouponType>{c.type}</CouponType>
                          <CouponAmount>₦{c.amount.toLocaleString()}</CouponAmount>
                          <CouponBrand>{c.brand}</CouponBrand>
                        </div>

                        <IconBox>{c.icon}</IconBox>
                      </CouponTop>

                      <CodeRow>
                        <Code>{c.code}</Code>
                        <CopyBtn type="button" onClick={() => copyCode(c.code)}>
                          <FiCopy /> Copy
                        </CopyBtn>
                      </CodeRow>

                      <CouponMeta>
                        <span>Expires: {c.expires}</span>
                        {tab === "active" ? (
                          <RedeemBtn type="button" onClick={() => redeemNow(c)}>
                            Redeem Now
                          </RedeemBtn>
                        ) : (
                          <span>{tab === "redeemed" ? "Redeemed" : "Expired"}</span>
                        )}
                      </CouponMeta>
                    </Coupon>
                  ))}
                </CouponGrid>
              )}
            </CardBody>
          </Card>

          <HelpBox>
            <HelpTitle>How to Earn More Coupons</HelpTitle>

            <HelpGrid>
              <HelpCard>
                <HelpTop>
                  <FiGift /> Sell More Waste
                </HelpTop>
                <HelpText>Earn 10% of your sale value as coupon points with every transaction.</HelpText>
              </HelpCard>

              <HelpCard>
                <HelpTop>
                  <FiTrendingUp /> Higher Quality
                </HelpTop>
                <HelpText>Better quality materials fetch higher prices and more reward points.</HelpText>
              </HelpCard>

              <HelpCard>
                <HelpTop>
                  <FiCheckCircle /> Regular Activity
                </HelpTop>
                <HelpText>Active sellers receive bonus points and exclusive coupon offers.</HelpText>
              </HelpCard>
            </HelpGrid>
          </HelpBox>
        </Container>
      </Body>
    </Page>
  );
}
