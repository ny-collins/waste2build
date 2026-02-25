import { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import {
  FiArrowLeft,
  FiBox,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiUser,
  FiX,
  FiCalendar,
  FiEdit3,
  FiLoader,
  FiAlertCircle
} from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

/* --------------------------- Layout --------------------------- */

const Page = styled.div`
  padding: 0 0 60px;
`;

const Header = styled.section`
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.teal}, ${({ theme }) => theme.colors.primary});
  padding: 44px 0;
  color: white;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 0 18px;
`;

const HeadRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  align-items: flex-end;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 34px;
`;

const Sub = styled.p`
  margin: 10px 0 0;
  opacity: 0.92;
  max-width: 760px;
  line-height: 1.7;
`;

const Back = styled(Link)`
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.35);
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const Body = styled.section`
  padding: 22px 0 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
  height: fit-content;
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
  text-transform: capitalize;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 900;
  font-size: 12px;
  width: fit-content;
  text-transform: capitalize;
  background: ${({ $type }) => {
    if ($type === "available") return "#E9FBF1";
    if ($type === "pending") return "#FFF7E6";
    if ($type === "accepted") return "#EAF3FF";
    return "#F1F5F9";
  }};
`;

const CardBody = styled.div`
  padding: 16px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
`;

const Img = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #e2e8f0;
`;

const PlaceholderImg = styled.div`
  width: 100%;
  height: 120px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #e2e8f0;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 12px;
  font-weight: 900;
`;

const MetaGrid = styled.div`
  margin-top: 14px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Meta = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 12px;
  display: grid;
  gap: 6px;
`;

const MetaTop = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 12px;
  font-weight: 900;
`;

const MetaValue = styled.div`
  font-weight: 900;
  font-size: 14px;
  text-transform: capitalize;
`;

const Desc = styled.p`
  margin: 14px 0 0;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.7;
  font-size: 13px;
`;

const Summary = styled.div`
  display: grid;
  gap: 10px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Total = styled.div`
  padding-top: 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;

  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 22px;
  }
`;

const Actions = styled.div`
  margin-top: 14px;
  display: grid;
  gap: 10px;
`;

const PrimaryBtn = styled.button`
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SecondaryBtn = styled(Link)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Note = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: ${({ theme }) => theme.colors.muted};
  gap: 14px;

  svg {
    font-size: 32px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    100% { transform: rotate(360deg); }
  }
`;

const ErrorBanner = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
`;

/* --------------------------- Modal --------------------------- */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: grid;
  place-items: center;
  padding: 18px;
  z-index: 50;
`;

const Modal = styled.div`
  width: min(560px, 100%);
  background: white;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
`;

const ModalHead = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
`;

const ModalTitle = styled.div`
  font-weight: 900;
`;

const CloseBtn = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.md};
  display: grid;
  place-items: center;
  cursor: pointer;
`;

const ModalBody = styled.div`
  padding: 16px;
  display: grid;
  gap: 12px;
`;

const ModalText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  line-height: 1.7;
`;

const Field = styled.div`
  display: grid;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 900;
`;

const InputWrap = styled.div`
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 10px;
  align-items: center;
  background: #f8fafc;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 12px 12px;

  input,
  textarea {
    border: none;
    outline: none;
    width: 100%;
    background: transparent;
    font-size: 14px;
    resize: none;
  }

  textarea {
    min-height: 90px;
    line-height: 1.6;
  }
`;

const Icon = styled.div`
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.muted};
`;

const ModalFooter = styled.div`
  padding: 14px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
`;

const OutlineBtn = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ConfirmBtn = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [pickup, setPickup] = useState({
    date: "",
    time: "",
    notes: "",
  });

  // 1. Fetch live listing data
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data } = await axios.get(`/api/listings/${id}`);
        // Schema mapping (ACL)
        setListing({
          id: data.id,
          title: data.title,
          status: data.status,
          seller: data.seller_name,
          location: data.location,
          weightKg: data.weight_kg,
          pricePerKg: data.price_per_kg,
          category: data.category,
          description: data.description,
          images: data.images || []
        });
      } catch (err) {
        setError("Listing not found or network error.");
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  const total = useMemo(() => {
    if (!listing) return 0;
    return listing.weightKg * listing.pricePerKg;
  }, [listing]);

  const canAccept = listing?.status === "available";

  const statusIcon = () => {
    if (listing?.status === "available") return <FiCheckCircle />;
    return <FiClock />;
  };

  const handleOpenModal = () => {
    // Deferred Authentication Check
    if (!user) {
      navigate('/auth');
      return;
    }
    // Role Authorization Check
    if (user.role !== 'recycler') {
      alert("Only registered Recyclers can accept listings on the marketplace.");
      return;
    }
    setOpen(true);
  };

  const onPickupChange = (key) => (e) => setPickup((p) => ({ ...p, [key]: e.target.value }));

  // 2. Execute Atomic Transaction
  const confirmAccept = async () => {
    if (!pickup.date || !pickup.time) {
      alert("Please provide a pickup date and time.");
      return;
    }

    setIsAccepting(true);
    try {
      const { data } = await axios.post(`/api/listings/${id}/accept`, pickup);
      setOpen(false);
      // Route to the final confirmation page
      navigate(`/pickup/${data.pickupId}`);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to accept listing.");
      setIsAccepting(false);
    }
  };

  if (loading) {
    return (
      <Page>
        <Header><Container><Title>Loading...</Title></Container></Header>
        <Body>
          <LoadingState><FiLoader /><span>Fetching listing details...</span></LoadingState>
        </Body>
      </Page>
    );
  }

  if (error || !listing) {
    return (
      <Page>
        <Header><Container><Title>Listing Not Found</Title></Container></Header>
        <Body>
          <Container>
            <ErrorBanner><FiAlertCircle /> {error}</ErrorBanner>
            <SecondaryBtn to="/marketplace" style={{ marginTop: '20px' }}>
              <FiArrowLeft /> Back to Marketplace
            </SecondaryBtn>
          </Container>
        </Body>
      </Page>
    );
  }

  return (
    <Page>
      <Header>
        <Container>
          <HeadRow>
            <div>
              <Title>Listing Details</Title>
              <Sub>Review the listing information and accept to schedule a pickup.</Sub>
            </div>
            <Back to="/marketplace">
              <FiArrowLeft /> Back to Marketplace
            </Back>
          </HeadRow>
        </Container>
      </Header>

      <Body>
        <Container>
          <Grid>
            <Card>
              <CardHead>
                <CardTitle>{listing.title}</CardTitle>
                <Badge $type={listing.status}>
                  {statusIcon()} {listing.status}
                </Badge>
              </CardHead>

              <CardBody>
                <ImageGrid>
                  {listing.images.length === 0 ? (
                    <PlaceholderImg>No Images</PlaceholderImg>
                  ) : (
                    listing.images.map((imgUrl, i) => (
                      <Img key={i} src={imgUrl} alt={`Material view ${i + 1}`} />
                    ))
                  )}
                </ImageGrid>

                <MetaGrid>
                  <Meta>
                    <MetaTop>
                      <FiUser /> Seller
                    </MetaTop>
                    <MetaValue>{listing.seller}</MetaValue>
                  </Meta>

                  <Meta>
                    <MetaTop>
                      <FiMapPin /> Location
                    </MetaTop>
                    <MetaValue>{listing.location}</MetaValue>
                  </Meta>

                  <Meta>
                    <MetaTop>
                      <FiBox /> Weight
                    </MetaTop>
                    <MetaValue>{listing.weightKg} kg</MetaValue>
                  </Meta>

                  <Meta>
                    <MetaTop>
                      <FiBox /> Category
                    </MetaTop>
                    <MetaValue>{listing.category}</MetaValue>
                  </Meta>
                </MetaGrid>

                <Desc>{listing.description}</Desc>
              </CardBody>
            </Card>

            <Card>
              <CardHead>
                <CardTitle>Pricing & Actions</CardTitle>
              </CardHead>

              <CardBody>
                <Summary>
                  <SummaryRow>
                    <span>Price per kg</span>
                    <strong>₦{listing.pricePerKg.toLocaleString()}</strong>
                  </SummaryRow>

                  <SummaryRow>
                    <span>Total weight</span>
                    <strong>{listing.weightKg} kg</strong>
                  </SummaryRow>

                  <Total>
                    <span>Total price</span>
                    <strong>₦{total.toLocaleString()}</strong>
                  </Total>
                </Summary>

                <Actions>
                  <PrimaryBtn type="button" onClick={handleOpenModal} disabled={!canAccept}>
                    <FiCheckCircle /> Accept Listing
                  </PrimaryBtn>

                  <SecondaryBtn to="/marketplace">
                    <FiBox /> Browse Other Listings
                  </SecondaryBtn>

                  <Note>
                    If a listing is pending, it means another recycler is already processing it.
                  </Note>
                </Actions>
              </CardBody>
            </Card>
          </Grid>
        </Container>
      </Body>

      {open && (
        <Overlay role="dialog" aria-modal="true">
          <Modal>
            <ModalHead>
              <ModalTitle>Confirm Pickup Details</ModalTitle>
              <CloseBtn type="button" onClick={() => !isAccepting && setOpen(false)} aria-label="Close" disabled={isAccepting}>
                <FiX />
              </CloseBtn>
            </ModalHead>

            <ModalBody>
              <ModalText>
                Set a preferred pickup date and time. You can also add notes for the seller (example: “Call me on arrival”).
              </ModalText>

              <Field>
                <Label>Pickup Date</Label>
                <InputWrap>
                  <Icon><FiCalendar /></Icon>
                  <input type="date" value={pickup.date} onChange={onPickupChange("date")} disabled={isAccepting} />
                </InputWrap>
              </Field>

              <Field>
                <Label>Pickup Time</Label>
                <InputWrap>
                  <Icon><FiClock /></Icon>
                  <input type="time" value={pickup.time} onChange={onPickupChange("time")} disabled={isAccepting} />
                </InputWrap>
              </Field>

              <Field>
                <Label>Notes (optional)</Label>
                <InputWrap>
                  <Icon><FiEdit3 /></Icon>
                  <textarea
                    value={pickup.notes}
                    onChange={onPickupChange("notes")}
                    placeholder="Add pickup instructions..."
                    disabled={isAccepting}
                  />
                </InputWrap>
              </Field>
            </ModalBody>

            <ModalFooter>
              <OutlineBtn type="button" onClick={() => setOpen(false)} disabled={isAccepting}>
                Cancel
              </OutlineBtn>
              <ConfirmBtn type="button" onClick={confirmAccept} disabled={isAccepting}>
                {isAccepting ? "Processing..." : "Confirm & Continue"}
              </ConfirmBtn>
            </ModalFooter>
          </Modal>
        </Overlay>
      )}
    </Page>
  );
}
