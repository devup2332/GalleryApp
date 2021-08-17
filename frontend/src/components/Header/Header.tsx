import React, { FormEvent, useEffect, useRef, useState } from "react";
import { ReactComponent as LogoMovileSVG } from "../../assets/icons/logo_movile.svg";
import { ReactComponent as LogoTabletSVG } from "../../assets/icons/logo_tablet.svg";
import { ReactComponent as MenuSVG } from "../../assets/icons/menu.svg";
import { ReactComponent as SearchSVG } from "../../assets/icons/search.svg";
import { useHistory } from "react-router";
import "./Header.scss";
import { HeaderProps } from "../../models/Props/HeaderProps";
import { Link, NavLink } from "react-router-dom";

const HeaderComponent = ({ user }: HeaderProps) => {
  const navRef = useRef<HTMLDivElement>(null);
  const btnMenuRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [changeLogo, setChangeLogo] = useState(false);
  const token = localStorage.getItem("t1ks1ehn");
  const history = useHistory();

  //Handler menu click outside
  const HandleClick = (e: MouseEvent) => {
    if (!btnMenuRef.current?.contains(e.target as Node)) {
      navRef.current?.classList.remove("bounce_menu");
      window.removeEventListener("click", HandleClick);
    }
  };

  //Handler to search photo on input
  const searchPhoto = (e: FormEvent) => {
    e.preventDefault();
    const input = document.querySelector<HTMLInputElement>(
      ".input_search_header"
    );
    if (input?.value) {
      history.push(`/search/${input?.value}`);
    }
  };

  const logOutUser = () => {
    localStorage.removeItem("t1ks1ehn");
    history.push("/");
  };

  const openMenu = () => {
    navRef.current?.classList.toggle("bounce_menu");
    window.addEventListener("click", HandleClick);
  };

  const ResizeHandler = () => {
    const width = document.documentElement.clientWidth + 15;
    if (width >= 760) {
      setChangeLogo(true);
    } else {
      setChangeLogo(false);
    }
  };

  const ScrollHandler = () => {
    const height = document.documentElement.scrollTop;
    if (height > 100) {
      headerRef.current?.classList.add("down");
    } else {
      headerRef.current?.classList.remove("down");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", ScrollHandler);
    window.addEventListener("resize", ResizeHandler);
    ResizeHandler();

    return () => {
      window.removeEventListener("resize", ResizeHandler);
      window.removeEventListener("scroll", ScrollHandler);
    };
  }, []);

  return (
    <div className="header_component_container" ref={headerRef}>
      <div className="subcontainer_header">
        <div className="rigth_container_header">
          <Link to="/home" className="logo_header_container">
            {changeLogo ? <LogoTabletSVG /> : <LogoMovileSVG />}
          </Link>
          <form className="input_search_container" onSubmit={searchPhoto}>
            <input
              type="text"
              className="input_search_header"
              placeholder="Search"
            />
            <button type="submit" className="btn_search_header">
              <SearchSVG />
            </button>
          </form>
        </div>
        {token ? (
          <button
            className="btn_user_profile"
            ref={btnMenuRef}
            onClick={openMenu}
          >
            <img src={user?.avatar?.secure_url} alt="" />
          </button>
        ) : (
          <button
            className="btn_menu_header"
            onClick={openMenu}
            ref={btnMenuRef}
          >
            <MenuSVG />
          </button>
        )}

        {token ? (
          <nav className="navigation_header user" ref={navRef}>
            <ul className="menu_navigation_header">
              <NavLink to="/upload-photo" className="menu_item_navigation">
                Add Photo
              </NavLink>
              <NavLink to="/profile" className="menu_item_navigation">
                Profile
              </NavLink>
              <li className="menu_item_navigation" onClick={logOutUser}>
                Log Out
              </li>
            </ul>
          </nav>
        ) : (
          <nav className="navigation_header noUser" ref={navRef}>
            <ul className="menu_navigation_header">
              <Link className="menu_item_navigation" to="/login">
                Login
              </Link>
              <Link className="menu_item_navigation" to="/register">
                Register
              </Link>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;
