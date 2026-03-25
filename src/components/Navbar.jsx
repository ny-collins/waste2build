import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FiLogOut, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Bar = styled.header`
  background: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndices.nav};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.02);
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
  transition: opacity ${({ theme }) => theme.transitions.fast};
  &:hover { opacity: 0.8; }
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

const MobileToggle = styled.button`
  display: none;
  background: transparent;
  border: none;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 4px;

  @media (max-width: 768px) {
    display: grid;
    place-items: center;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 8px;
  align-items: center;

  a {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.muted};
    padding: 8px 14px;
    border-radius: ${({ theme }) => theme.radius.pill};
    transition: all ${({ theme }) => theme.transitions.fast};
    font-weight: 600;
  }

  a:hover:not(.active) {
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
  }

  a.active {
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 18px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadow.md};
    gap: 12px;
    
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    
    a {
      width: 100%;
      text-align: center;
      padding: 12px;
    }
  }
`;

const ActionBtn = styled(NavLink)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) { width: 100%; }
`;

const LogoutBtn = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  color: ${({ theme }) => theme.colors.muted};
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: #fef2f2;
    border-color: #fca5a5;
    color: #ef4444;
  }

  @media (max-width: 768px) { width: 100%; padding: 12px; }
`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Bar ref={navRef}>
      <Inner>
        <BrandLink to="/">
          <BrandLogo src="/favicon.svg" alt="Waste2Build Logo" />
          <BrandText>WASTE2BUILD</BrandText>
        </BrandLink>

        <MobileToggle onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-label="Toggle Menu">
          {isOpen ? <FiX /> : <FiMenu />}
        </MobileToggle>

        <Nav $isOpen={isOpen}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/marketplace">Marketplace</NavLink>

          {user ? (
            <>
              {user.role === "seller" ? (
                <>
                  <NavLink to="/seller/dashboard">My Dashboard</NavLink>
                  <NavLink to="/rewards">Rewards Ledger</NavLink>
                </>
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
