"use client";
import styled from "styled-components";

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export default function Overlay({ visible, onClick }) {
  if (!visible) return null;

  return <OverlayContainer onClick={onClick}></OverlayContainer>;
}
