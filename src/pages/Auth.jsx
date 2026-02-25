import { useState } from "react";
import styled from "styled-components";
import { FiMail, FiLock, FiUser, FiBriefcase, FiAlertCircle, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Page = styled.div`
  min-height: calc(100vh - 70px);
  display: grid;
  place-items: center;
  background: #f8fafc;
  padding: 40px 18px;
`;

const Card = styled.div`
  background: white;
  width: 100%;
  max-width: 440px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};
  overflow: hidden;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: #f8fafc;
`;

const Tab = styled.button`
  border: none;
  background: ${({ $active }) => ($active ? "white" : "transparent")};
  color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.muted)};
  padding: 18px;
  font-weight: 900;
  font-size: 14px;
  cursor: pointer;
  border-bottom: 2px solid ${({ $active, theme }) => ($active ? theme.colors.primary : "transparent")};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Body = styled.div`
  padding: 32px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;

  h2 {
    margin: 0 0 8px;
    font-size: 24px;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 14px;
    line-height: 1.6;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 16px;
`;

const Field = styled.div`
  display: grid;
  gap: 6px;

  label {
    font-size: 12px;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const InputWrap = styled.div`
  display: grid;
  grid-template-columns: 18px 1fr auto;
  gap: 10px;
  align-items: center;
  background: #f8fafc;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 12px 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    background: white;
    box-shadow: 0 0 0 3px rgba(10, 155, 71, 0.1);
  }

  input {
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
    font-size: 14px;
    font-family: inherit;
  }

  svg {
    color: ${({ theme }) => theme.colors.muted};
    transition: color 0.2s ease;
  }

  &:focus-within svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ToggleBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: grid;
  place-items: center;
  padding: 0;
  color: ${({ theme }) => theme.colors.muted};
  
  &:hover svg {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const RoleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const RoleBtn = styled.button`
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.border)};
  background: ${({ $active }) => ($active ? "#eafff1" : "white")};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text)};
  padding: 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ErrorBanner = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SubmitBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(10, 155, 71, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "seller",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const setRole = (role) => (e) => {
    e.preventDefault();
    setForm({ ...form, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const baseURL = "http://localhost:3000";
      const endpoint = isLogin ? `${baseURL}/api/auth/login` : `${baseURL}/api/auth/register`;
      
      const payload = isLogin 
        ? { email: form.email, password: form.password }
        : form;

      const { data } = await axios.post(endpoint, payload);
      
      // 1. Persist to local storage and React state
      localStorage.setItem("token", data.token);
      login(data.token, data.user);

      // 2. Graceful SPA Routing (Preserves State)
      if (data.user.role === "seller") {
        navigate("/seller/dashboard");
      } else if (data.user.role === "recycler") {
        navigate("/recycler/portal");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError(err.response?.data?.error || "Connection error. Ensure the backend server is running on port 3000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Card>
        <Tabs>
          <Tab $active={isLogin} type="button" onClick={() => { setIsLogin(true); setError(""); }}>
            Sign In
          </Tab>
          <Tab $active={!isLogin} type="button" onClick={() => { setIsLogin(false); setError(""); }}>
            Create Account
          </Tab>
        </Tabs>

        <Body>
          <Header>
            <h2>{isLogin ? "Welcome Back" : "Join the Initiative"}</h2>
            <p>
              {isLogin 
                ? "Sign in to manage your marketplace listings and pickups." 
                : "Create an account to start monetizing or procuring waste."}
            </p>
          </Header>

          <Form onSubmit={handleSubmit}>
            {!isLogin && (
              <Field>
                <label>Account Type</label>
                <RoleGrid>
                  <RoleBtn $active={form.role === "seller"} type="button" onClick={setRole("seller")}>
                    <FiUser /> Vendor
                  </RoleBtn>
                  <RoleBtn $active={form.role === "recycler"} type="button" onClick={setRole("recycler")}>
                    <FiBriefcase /> Recycler
                  </RoleBtn>
                </RoleGrid>
              </Field>
            )}

            {!isLogin && (
              <Field>
                <label>Full Name</label>
                <InputWrap>
                  <FiUser />
                  <input 
                    name="fullName" 
                    value={form.fullName} 
                    onChange={onChange} 
                    placeholder="e.g. Acme Industries or Sarah Doe" 
                    required={!isLogin}
                  />
                </InputWrap>
              </Field>
            )}

            <Field>
              <label>Email Address</label>
              <InputWrap>
                <FiMail />
                <input 
                  type="email" 
                  name="email" 
                  value={form.email} 
                  onChange={onChange} 
                  placeholder="name@example.com" 
                  required 
                />
              </InputWrap>
            </Field>

            <Field>
              <label>Password</label>
              <InputWrap>
                <FiLock />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  value={form.password} 
                  onChange={onChange} 
                  placeholder="••••••••" 
                  required 
                />
                <ToggleBtn 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </ToggleBtn>
              </InputWrap>
            </Field>

            {error && (
              <ErrorBanner>
                <FiAlertCircle size={18} />
                {error}
              </ErrorBanner>
            )}

            <SubmitBtn type="submit" disabled={loading}>
              {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"} 
              {!loading && <FiArrowRight />}
            </SubmitBtn>
          </Form>
        </Body>
      </Card>
    </Page>
  );
}
