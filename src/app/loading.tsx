'use client'

import styled, { keyframes } from 'styled-components'

const pulseAnimation = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9fafb;
`

const LoadingDot = styled.div`
  width: 12px;
  height: 12px;
  margin: 0 4px;
  background-color: #3498db;
  border-radius: 50%;
  display: inline-block;
  animation: ${pulseAnimation} 1.4s infinite ease-in-out;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`

export default function Loading() {
  return (
    <LoadingContainer>
      <LoadingDot />
      <LoadingDot />
      <LoadingDot />
    </LoadingContainer>
  )
}