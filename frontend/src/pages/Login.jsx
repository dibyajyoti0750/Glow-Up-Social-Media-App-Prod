import Rating from "@mui/material/Rating";
import { assets } from "../assets/assets";
import { AnimatedTooltipPreview } from "../components/ui/AnimatedTooltipPreview";
import { SignIn } from "@clerk/clerk-react";
import { useState } from "react";

export default function Login() {
  const [value, setValue] = useState(4);

  return (
    <div className="min-h-screen w-full relative">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
          radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175, 109, 255, 0.42), transparent 60%),
          radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 235, 170, 0.55), transparent 62%),
          radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255, 100, 180, 0.40), transparent 62%),
          radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120, 190, 255, 0.45), transparent 62%),
          linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
      `,
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10 min-h-screen flex flex-col md:flex-row text-white md:gap-16 lg:gap-24">
        {/* Left side */}
        <div className="flex-1 flex flex-col justify-between px-10 py-8">
          <div className="flex items-center gap-3">
            <img
              src={assets.logo}
              alt="Logo"
              className="h-10 w-10 md:h-12 md:w-12"
            />
            <h3 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-red-400 to-red-700 bg-clip-text text-transparent">
              GlowUp
            </h3>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-7 max-md:mt-10">
              <AnimatedTooltipPreview />
              <div className="flex flex-1 flex-col items-start">
                <Rating
                  name="simple-controlled"
                  value={value}
                  size="small"
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <p className="font-semibold text-indigo-900 text-sm md:text-lg">
                  Used by 10k+ people worldwide
                </p>
              </div>
            </div>

            <h1 className="text-3xl md:text-6xl md:pb-2 font-bold text-indigo-900">
              Build connections, share, and stay updated
            </h1>

            <p className="text-xl font-medium md:text-3xl max-w-72 md:max-w-md text-indigo-800">
              Share your life, discover others, and grow together.
            </p>
          </div>

          <span className="md:h-10"></span>
        </div>

        {/* Right side */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
