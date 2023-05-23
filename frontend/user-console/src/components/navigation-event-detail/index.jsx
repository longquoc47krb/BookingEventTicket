import { t } from "i18next";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Nav } from "react-bootstrap";

function Navigation({
  introduceRef,
  infoRef,
  organizationRef,
  reviewRef,
  activeButton,
  setActiveButton,
}) {
  useEffect(() => {
    const handleScroll = () => {
      const introduceOffsetTop =
        activeButton === "review" ? null : introduceRef.current?.offsetTop;
      const infoOffsetTop =
        activeButton === "review" ? null : infoRef.current?.offsetTop;
      const organizationOffsetTop =
        activeButton === "review" ? null : organizationRef.current?.offsetTop;
      const currentScrollY = window.scrollY;
      if (
        currentScrollY >= introduceOffsetTop - 30 &&
        currentScrollY < infoOffsetTop - 30 &&
        activeButton !== "review"
      ) {
        setActiveButton("introduce");
      } else if (
        currentScrollY >= infoOffsetTop - 30 &&
        currentScrollY < organizationOffsetTop - 30 &&
        activeButton !== "review"
      ) {
        setActiveButton("info");
      } else if (
        currentScrollY >= organizationOffsetTop - 30 &&
        activeButton !== "review"
      ) {
        setActiveButton("organization");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    introduceRef,
    infoRef,
    organizationRef,
    activeButton,
    setActiveButton,
    reviewRef,
  ]);
  const handleClick = (section) => {
    switch (section) {
      case "introduce":
        setActiveButton("introduce");
        introduceRef?.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "info":
        setActiveButton("info");
        infoRef?.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "organization":
        setActiveButton("organization");
        organizationRef?.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "review":
        setActiveButton("review");
        break;
      default:
        break;
    }
  };
  return (
    <Nav
      variant="tabs"
      className="bg-white w-[100vw] md:px-[1.5rem] px-0 text-base"
    >
      <Nav.Item>
        <Nav.Link
          onClick={() => handleClick("introduce")}
          active={activeButton === "introduce" ? true : false}
        >
          {t("introduce")}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => handleClick("info")}
          active={activeButton === "info" ? true : false}
        >
          {t("ticket-info")}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => handleClick("organization")}
          active={activeButton === "organization" ? true : false}
        >
          {t("organizer")}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => setActiveButton("review")}
          active={activeButton === "review" ? true : false}
        >
          {t("review")}
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navigation;
