"use client";

import dynamic from "next/dynamic";

// load spline dynamically to avoid SSR issues
const Spline = dynamic(
  () => import("@splinetool/react-spline").then((mod) => mod.default),
  { ssr: false },
);

export default function SplineModel() {
  return (
    <div className="absolute right-0 top-0 h-full w-[900px] z-[1]">
      <Spline scene="https://prod.spline.design/H7M8ho91IYQBMISf/scene.splinecode" />
    </div>
  );
}
