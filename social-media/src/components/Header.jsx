import React from "react";

function Header(props) {
  const VariableHeading = `h${props.size}`;
  return <VariableHeading className={props.cssClass}>{props.children}</VariableHeading>;
}

export default Header;
