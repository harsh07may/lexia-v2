import Image from "next/image";

import { cn } from "@/lib/utils";
import UpgradeButton from "./upgrade-plan";

type PromoProps = {
  isMobile?: boolean;
  className?: string;
};

const Promo = ({ isMobile, className }: PromoProps) => (
  <div className={cn("space-y-4 rounded-xl border-2 p-4", className)}>
    <div className="space-y-2">
      <div className="flex items-center justify-center gap-x-2">
        <Image src="/icons/unlimited.svg" alt="Pro" height={26} width={26} />
        <h3 className="text-lg font-bold">Upgrade to Pro</h3>
      </div>

      <p className="text-muted-foreground text-center">
        Get unlimited hearts and more!
      </p>
    </div>

    <UpgradeButton isMobile={isMobile} />
  </div>
);

export default Promo;
