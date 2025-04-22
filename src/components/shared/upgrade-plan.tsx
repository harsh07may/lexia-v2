"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const UpgradeButton = () => {
  return (
    <Button size="lg" variant="super" className="w-full" asChild>
      <Link href="/shop">Upgrade Now</Link>
    </Button>
  );
};

export default UpgradeButton;
