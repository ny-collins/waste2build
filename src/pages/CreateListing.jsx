import { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { FiUploadCloud, FiMapPin, FiTag, FiFileText, FiBox, FiAlertCircle, FiTrendingUp } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// 1. The Automated Pricing Engine (Naira per Kg)
const PLATFORM_RATES = {
  plastic: 150,
  metal: 300,
  paper: 50,
  glass: 30,
  other: 20,
};

// ... [Keeping existing styled-components exactly as they were] ...
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
  max-width: 720px;
  line-height: 1.7;
`;

const Back = styled(Link)`
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.35);
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  text-decoration: none;
`;

const Body = styled.section`
  padding: 22px 0 0;
`;

const Card = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
`;

const CardHead = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const CardTitle = styled.div`
  font-weight: 900;
`;

const CardSub = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

const CardBody = styled.div`
  padding: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const UploadBox = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: #f8fafc;
  padding: 18px;
  display: grid;
  gap: 10px;
`;

const UploadIcon = styled.div`
  width: 54px;
  height: 54px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: #eafff1;
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  place-items: center;
  font-size: 24px;
`;

const UploadTitle = styled.div`
  font-weight: 900;
`;

const UploadText = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
`;

const UploadBtn = styled.label`
  width: fit-content;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const Preview = styled.div`
  height: 78px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  background: #e2e8f0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 12px;
`;

const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div``;

const Label = styled.label`
  display: block;
  margin: 0 0 6px;
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
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  select,
  input,
  textarea {
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
    font-size: 14px;
    font-family: inherit;
    resize: none;
  }

  textarea {
    min-height: 96px;
    line-height: 1.6;
  }
`;

const Icon = styled.div`
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.muted};
`;

const Summary = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: #f8fafc;
  padding: 16px;
  display: grid;
  gap: 10px;
`;

const SummaryTitle = styled.div`
  font-weight: 900;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.text};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const TotalRow = styled(SummaryRow)`
  margin-top: 6px;
  padding-top: 10px;
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
  
  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 18px;
    font-weight: 900;
  }
`;

const ErrorBanner = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Submit = styled.button`
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(10, 155, 71, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Note = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
  text-align: center;
`;

export default function CreateListing() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  // Removed pricePerKg from manual state
  const [form, setForm] = useState({
    title: "",
    category: "plastic",
    description: "",
    location: "",
    weightKg: "",
  });

  useEffect(() => {
    return () => {
      photos.forEach(photo => URL.revokeObjectURL(photo.url));
    };
  }, [photos]);

  const onChange = (key) => (e) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
    if (error) setError("");
  };

  // 2. Derived State for Pricing
  const currentRate = PLATFORM_RATES[form.category];
  
  const totalPrice = useMemo(() => {
    const w = Number(form.weightKg);
    if (!w) return 0;
    return w * currentRate;
  }, [form.weightKg, currentRate]);

  const canSubmit = useMemo(() => {
    if (!form.title || !form.description || !form.location) return false;
    if (!form.weightKg || Number(form.weightKg) <= 0) return false;
    return !isSubmitting;
  }, [form, isSubmitting]);

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files || []);
    photos.forEach(photo => URL.revokeObjectURL(photo.url));
    const next = files.slice(0, 6).map((f) => ({ 
      file: f, 
      url: URL.createObjectURL(f) 
    }));
    setPhotos(next);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("location", form.location);
      formData.append("weightKg", form.weightKg);
      // Append the platform-dictated rate to the backend payload
      formData.append("pricePerKg", currentRate);
      
      photos.forEach((photo) => {
        formData.append("photos", photo.file);
      });

      await axios.post("http://localhost:3000/api/listings", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      navigate("/marketplace");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page>
      <Header>
        <Container>
          <HeadRow>
            <div>
              <Title>Create Listing</Title>
              <Sub>Weigh your sorted materials and list them at the official market rate.</Sub>
            </div>
            <Back to="/seller/dashboard">Dashboard</Back>
          </HeadRow>
        </Container>
      </Header>

      <Body>
        <Container>
          <Card>
            <CardHead>
              <CardTitle>Material Details</CardTitle>
              <CardSub>Clear photos help industrial recyclers verify the condition of your waste.</CardSub>
            </CardHead>

            <CardBody>
              <Grid>
                <div>
                  <UploadBox>
                    <UploadIcon>
                      <FiUploadCloud />
                    </UploadIcon>

                    <div>
                      <UploadTitle>Upload Photos</UploadTitle>
                      <UploadText>
                        Add up to 6 photos. Show the full material and close-up details.
                      </UploadText>
                    </div>

                    <UploadBtn>
                      Choose Images
                      <HiddenInput type="file" accept="image/*" multiple onChange={handlePhotos} />
                    </UploadBtn>

                    <PreviewGrid>
                      {photos.length === 0 ? (
                        <>
                          <Preview />
                          <Preview />
                          <Preview />
                        </>
                      ) : (
                        photos.slice(0, 3).map((p, idx) => (
                          <Preview key={idx}>
                            <img src={p.url} alt={`preview-${idx}`} />
                          </Preview>
                        ))
                      )}
                    </PreviewGrid>
                  </UploadBox>
                </div>

                <div>
                  <Form onSubmit={handleSubmit}>
                    <Field>
                      <Label>Listing Title</Label>
                      <InputWrap>
                        <Icon><FiTag /></Icon>
                        <input value={form.title} onChange={onChange("title")} placeholder="e.g., Clean PET Plastic Bottles" />
                      </InputWrap>
                    </Field>

                    <Row2>
                      <Field>
                        <Label>Material Category</Label>
                        <InputWrap>
                          <Icon><FiBox /></Icon>
                          <select value={form.category} onChange={onChange("category")}>
                            <option value="plastic">Plastic</option>
                            <option value="metal">Metal</option>
                            <option value="paper">Paper</option>
                            <option value="glass">Glass</option>
                            <option value="other">Other</option>
                          </select>
                        </InputWrap>
                      </Field>

                      <Field>
                        <Label>Verified Weight (kg)</Label>
                        <InputWrap>
                          <Icon><FiTrendingUp /></Icon>
                          <input
                            type="number"
                            value={form.weightKg}
                            onChange={onChange("weightKg")}
                            placeholder="e.g., 25"
                            min="0"
                          />
                        </InputWrap>
                      </Field>
                    </Row2>

                    <Field>
                      <Label>Pickup Location</Label>
                      <InputWrap>
                        <Icon><FiMapPin /></Icon>
                        <input value={form.location} onChange={onChange("location")} placeholder="e.g., Ikeja, Lagos" />
                      </InputWrap>
                    </Field>

                    <Field>
                      <Label>Condition & Description</Label>
                      <InputWrap>
                        <Icon><FiFileText /></Icon>
                        <textarea
                          value={form.description}
                          onChange={onChange("description")}
                          placeholder="Describe the materials: sorting method, packaging type, and any access instructions for pickup..."
                        />
                      </InputWrap>
                    </Field>

                    <Summary>
                      <SummaryTitle><FiTrendingUp /> Guaranteed Market Rate</SummaryTitle>
                      <SummaryRow>
                        <span>Official Platform Rate</span>
                        <strong>₦{currentRate} / kg</strong>
                      </SummaryRow>
                      <SummaryRow>
                        <span>Total Registered Weight</span>
                        <strong>{form.weightKg ? `${form.weightKg} kg` : "0 kg"}</strong>
                      </SummaryRow>
                      <TotalRow>
                        <span>Expected Payout</span>
                        <strong>{totalPrice > 0 ? `₦${totalPrice.toLocaleString()}` : "₦0"}</strong>
                      </TotalRow>
                    </Summary>

                    {error && (
                      <ErrorBanner>
                        <FiAlertCircle size={18} />
                        {error}
                      </ErrorBanner>
                    )}

                    <Submit type="submit" disabled={!canSubmit}>
                      {isSubmitting ? "Publishing to Market..." : "Publish Listing"}
                    </Submit>

                    <Note>
                      By publishing, you agree to have the materials sorted and ready for the verified recycler upon their arrival.
                    </Note>
                  </Form>
                </div>
              </Grid>
            </CardBody>
          </Card>
        </Container>
      </Body>
    </Page>
  );
}
