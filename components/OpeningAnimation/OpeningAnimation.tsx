"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import "./OpeningAnimation.css";

gsap.registerPlugin(useGSAP);

const CHINESE_GLYPHS = Array.from("欢迎来到我的书桌～");

type OpeningAnimationProps = {
  onComplete?: () => void;
};

export default function OpeningAnimation({ onComplete }: OpeningAnimationProps) {
  const openingRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const homeContent = document.querySelector<HTMLElement>(
        ".home-entry__content",
      );
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        if (homeContent) gsap.set(homeContent, { autoAlpha: 1 });
        onComplete?.();
        return;
      }

      const hiGlyphs = gsap.utils.toArray<SVGTextElement>(
        ".opening-animation__hi .opening-animation__glyph",
      );
      const welcomeGlyphs = gsap.utils.toArray<SVGTextElement>(
        ".opening-animation__welcome .opening-animation__glyph",
      );
      gsap.set([...hiGlyphs, ...welcomeGlyphs], {
        strokeDasharray: "900 900",
        strokeDashoffset: 900,
        fillOpacity: 0,
      });
      if (homeContent) gsap.set(homeContent, { autoAlpha: 0 });
      gsap.set(openingRef.current, { clipPath: "inset(0% 0% 0% 0%)" });

      const openingTimeline = gsap.timeline({
        defaults: { ease: "none" },
        onComplete,
      });

      openingTimeline
        .addLabel("hiWrite", 0)
        .to(
          hiGlyphs,
          { strokeDashoffset: 0, duration: 0.36, stagger: 0.12 },
          "hiWrite",
        )
        .to(
          hiGlyphs,
          {
            fillOpacity: 1,
            duration: 0.12,
            stagger: 0.12,
            ease: "power1.out",
          },
          0.24,
        )
        .addLabel("welcomeWrite", 0.45)
        .to(
          welcomeGlyphs,
          {
            strokeDashoffset: 0,
            duration: 0.5,
            stagger: { amount: 0.55, from: "start" },
          },
          "welcomeWrite",
        )
        .to(
          welcomeGlyphs,
          {
            fillOpacity: 1,
            duration: 0.22,
            stagger: { amount: 0.42, from: "start" },
            ease: "power1.out",
          },
          0.85,
        )
        .addLabel("introTextComplete", 1.5)
        .addLabel("swipeStart", "introTextComplete+=0.15")
        // Reveal the actual Home underneath; do not move or crossfade the desk.
        .set(homeContent ?? [], { autoAlpha: 1 }, "swipeStart")
        .to(
          openingRef.current,
          { clipPath: "inset(0% 0% 100% 0%)", duration: 0.35, ease: "power3.inOut" },
          "swipeStart",
        )
        .addLabel("transitionToHome", "swipeStart+=0.35");

      return () => openingTimeline.kill();
    },
    { scope: openingRef, dependencies: [onComplete], revertOnUpdate: true },
  );

  return (
    <section
      ref={openingRef}
      className="opening-animation"
      aria-label="欢迎来到我的书桌～"
    >
      <svg
        className="opening-animation__lettering"
        viewBox="0 0 900 260"
        aria-hidden="true"
        focusable="false"
      >
        <g className="opening-animation__hi" aria-hidden="true">
          <text className="opening-animation__glyph" x="388" y="98">H</text>
          <text className="opening-animation__glyph" x="449" y="98">i</text>
          <text className="opening-animation__glyph" x="478" y="98">!</text>
        </g>

        <g className="opening-animation__welcome" aria-hidden="true">
          {CHINESE_GLYPHS.map((glyph, index) => (
            <text
              className="opening-animation__glyph"
              x={250 + index * 45}
              y="184"
              key={`${glyph}-${index}`}
            >
              {glyph}
            </text>
          ))}
        </g>
      </svg>
    </section>
  );
}
