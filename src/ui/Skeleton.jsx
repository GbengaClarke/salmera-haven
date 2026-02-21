import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
`;

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const SkeletonBar = styled.div`
  width: 100%;
  height: 1.5rem;
  border-radius: 1rem;
  background: linear-gradient(
    90deg,
    var(--color-grey-300) 25%,
    var(--color-grey-200) 50%,
    var(--color-grey-300) 75%
  );
  background-size: 400px 100%;
  animation: ${shimmer} 1.2s infinite linear;
`;

export default function Skeleton({ count = 4 }) {
  return (
    <SkeletonWrapper>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonBar key={i} />
      ))}
    </SkeletonWrapper>
  );
}
