"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
  const [backgroundVideoIndex, setBackgroundVideoIndex] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const nextVideoRef = useRef<HTMLVideoElement | null>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMinVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);

    previewVideoRef.current?.load();
    nextVideoRef.current?.load();
    if (nextVideoRef.current) {
      nextVideoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            setHasClicked(false);
          },
          onComplete: () => {
            if (backgroundVideoIndex !== currentIndex) {
              console.log("update");
              setBackgroundVideoIndex(currentIndex);
            }
          },
        });

        gsap.from("#preview-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useEffect(() => {
    if (nextVideoRef.current && backgroundVideoRef.current) {
      const currentTime = nextVideoRef.current.currentTime;
      backgroundVideoRef.current.load();
      backgroundVideoRef.current.currentTime = currentTime;
      backgroundVideoRef.current.play();
    }
  }, [backgroundVideoIndex]);

  const getVideoSrc = (index: number) => `videos/hero-${index}.mp4`;

  return (
    <section className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMinVdClick}
              className="origin-center scale-50 opacity-0 transtition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={previewVideoRef}
                loop
                muted
                id="preview-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              >
                <source
                  type="video/mp4"
                  src={getVideoSrc(upcomingVideoIndex)}
                />
              </video>
            </div>
          </div>
          {/* new video */}
          <video
            ref={nextVideoRef}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center border border-blue-200"
          >
            <source type="video/mp4" src={getVideoSrc(currentIndex)} />
          </video>
          {/* background video */}
          <video
            ref={backgroundVideoRef}
            autoPlay
            loop
            muted
            className=" absolute left-0 right-0 top-0 size-full  object-cover object-center"
            onLoadedData={() => setIsLoading(false)}
          >
            <source type="video/mp4" src={getVideoSrc(backgroundVideoIndex)} />
          </video>
          <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
            G<b>a</b>ming
          </h1>
          <div className="absolute left-0 top-0 z-40 size-full">
            <div className="mt-24 px-5 sm:px-10">
              <h1 className="special-font hero-heading text-blue-100">
                redefi<b>n</b>e
              </h1>

              <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                Enter the metagame Layer <br /> Unleash the Play Economy
              </p>

              <Button
                id="watch-trailer"
                title="Watch Trailer"
                leftIcon={<TiLocationArrow />}
                containerClass="!bg-yellow-300 flex-center gap-1"
              />
            </div>
          </div>
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5  text-black">
          G<b>a</b>ming
        </h1>
      </div>
    </section>
  );
};

export default Hero;
