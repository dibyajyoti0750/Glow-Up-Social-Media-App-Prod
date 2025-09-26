import { Star } from "lucide-react";
import { assets } from "../assets/assets";
import { AnimatedTooltipPreview } from "../components/ui/AnimatedTooltipPreview";
import { WavyBackground } from "../components/ui/wavy-background";

export default function Login() {
  return (
    <WavyBackground>
      <div className="min-h-screen flex flex-col md:flex-row text-white md:gap-16 lg:gap-24">
        {/* Left side */}
        <div className="flex-1 flex flex-col justify-between p-10">
          <div className="flex items-center gap-3">
            <img src={assets.logo} alt="Logo" className="h-12 w-12" />
            <h3 className="text-2xl font-bold text-white">GlowUp</h3>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-7 max-md:mt-10">
              <AnimatedTooltipPreview />
              <div>
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 md:size-4.5 text-transparent fill-amber-500"
                      />
                    ))}
                </div>
                <p className="font-medium">Used by 12k+ people worldwide</p>
              </div>
            </div>

            <h1 className="text-3xl md:text-6xl md:pb-2 font-bold">
              Build connections, share, and stay updated
            </h1>

            <p className="text-xl md:text-3xl max-w-72 md:max-w-md">
              Share your life, discover others, and grow together.
            </p>
          </div>

          <span className="md:h-10"></span>
        </div>

        {/* Right side */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          Login form will come here
        </div>
      </div>
    </WavyBackground>
  );
}
