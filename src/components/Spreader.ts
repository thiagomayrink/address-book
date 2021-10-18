import styled from "styled-components";

interface SpreaderProps {
  width?: string;
  height?: string;
}

export default styled.div`
  width: ${(props: SpreaderProps) => (props.width ? props.width : "16px")};
  height: ${(props: SpreaderProps) => (props.height ? props.height : "16px")};
`;
