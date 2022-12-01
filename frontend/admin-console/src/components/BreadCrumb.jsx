import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import * as React from "react";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BreadCrumbs({ breadcrumbs, className }) {
  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb" className={className}>
      {breadcrumbs.map((item, index) => (
        <Link
          underline="hover"
          key={index}
          color="inherit"
          href={item.link}
          onClick={handleClick}
        >
          {item.label}
        </Link>
      ))}
    </Breadcrumbs>
  );
}
