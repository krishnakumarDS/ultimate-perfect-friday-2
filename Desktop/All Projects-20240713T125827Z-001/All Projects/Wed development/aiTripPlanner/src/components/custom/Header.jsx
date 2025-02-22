import React from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <div className="shadow-sm flex justify-between items-center p-3">
      <div className="flex w-[175px] justify-between">
        <img src="/logo.svg" alt="" />
        <h3 className="font-extrabold text-lg mt-0.5">CRIMSON CARE</h3>
      </div>
      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  );
};

export default Header;
