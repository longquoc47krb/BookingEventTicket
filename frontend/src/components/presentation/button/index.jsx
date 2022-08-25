import styled from "styled-components";
import { Button as AntdButton } from "antd";
import theme from "../../../shared/theme";

const CustomButton = styled(AntdButton)`
  color: ${(props) => (props.color ? props.color : props.theme.text)};
  font-weight: normal;
  background: ${(props) =>
    props.background ? props.background : props.theme.main};
  :focus {
    color: ${(props) => (props.color ? props.color : props.theme.text)};
    border-color: ${(props) =>
      props.background ? props.background : props.theme.main};
    background: ${(props) =>
      props.background ? props.background : props.theme.main};
  }
  :hover {
    color: ${(props) => (props.color ? props.color : props.theme.text)};
    border-color: ${(props) =>
      props.background ? props.background : props.theme.main};
    background: ${(props) =>
      props.background ? props.background : props.theme.main};
  }
  &.ant-btn-clicked:after {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    bottom: -1px;
    right: -1px;
    border-radius: inherit;
    background: ${(props) =>
      props.background ? props.background : props.theme.main};
    border: 0 solid
      ${(props) => (props.background ? props.background : props.theme.main)};
    opacity: 0.4;
    -webkit-animation: buttonEffect 0.4s;
    animation: buttonEffect 0.4s;
    display: block;
  }
`;
CustomButton.defaultProps = {
  theme: {
    main: theme.main,
    text: theme.text,
  },
};
const Button = ({ children, ...props }) => {
  return <CustomButton {...props}>{children}</CustomButton>;
};
export default Button;
