import { NavLink, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Bar = styled.header`
  background: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const BrandLogo = styled.img`
  height: 28px;
  width: 28px;
`;

const BrandText = styled.div`
  font-weight: 900;
  letter-spacing: 0.3px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 18px;
  align-items: center;

  a {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.muted};
    padding: 8px 12px;
    border-radius: ${({ theme }) => theme.radius.pill};
    text-decoration: none;
    transition: all 0.2s ease;
  }

  a:hover:not(.active) {
    background: #f8fafc;
    color: ${({ theme }) => theme.colors.primary};
  }

  a.active {
    background: #eafff1;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
  }
`;

const ActionBtn = styled(NavLink)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  }
`;

const LogoutBtn = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  color: ${({ theme }) => theme.colors.muted};
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f8fafc;
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Bar>
      <Inner>
        <BrandLink to="/">
          <BrandLogo src="/favicon.svg" alt="Waste2Build Logo" />
          <BrandText>WASTE2BUILD</BrandText>
        </BrandLink>

        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/marketplace">Marketplace</NavLink>

          {user ? (
            <>
              {user.role === "seller" ? (
                <NavLink to="/seller/dashboard">My Dashboard</NavLink>
              ) : (
                <NavLink to="/recycler/portal">Recycler Portal</NavLink>
              )}
              <LogoutBtn onClick={handleLogout}>
                <FiLogOut /> Logout
              </LogoutBtn>
            </>
          ) : (
            <ActionBtn to="/auth">
              <FiUser /> Sign In / Register
            </ActionBtn>
          )}
        </Nav>
      </Inner>
    </Bar>
  );
}
