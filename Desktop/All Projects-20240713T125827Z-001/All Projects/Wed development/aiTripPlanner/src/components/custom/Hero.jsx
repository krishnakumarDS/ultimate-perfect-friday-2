import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex items-center mx-56 gap-9 flex-col">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#f56551] ">
          Discover Your Next Adventure with AI:
        </span>{" "}
        Personalized Itineraries at your FingerTips
      </h1>
      <p className="text-xl text-gray-500">
        Your Personal trup planner and travel Curator, creating custome
        itineraries tailored to your interests and budget.
      </p>
      <Link to={"/createtrip"}>
        <Button>Get Started, it's Free</Button>
      </Link>
    </div>
  );
};

export default Hero;
