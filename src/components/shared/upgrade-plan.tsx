"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
// import { createStripeUrl } from "@/server/actions/user-subscription";

type UpgradeButtonProps = {
  isMobile?: boolean;
};

const UpgradeButton = ({ isMobile }: UpgradeButtonProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const upgradePlan = () => {
    toast.success("created stripe Url");
    // TODO: Create Stripe APIs
    startTransition(() => {
      //   createStripeUrl()
      //     .then((response) => {
      //       if (response.data) {
      //         window.location.href = response.data;
      //       }
      //     })
      //     .catch(() => toast.error("Something went wrong."));
    });
  };

  const handleClick = () => (isMobile ? upgradePlan() : router.push("/shop"));

  return (
    <Button
      size="lg"
      variant="super"
      onClick={handleClick}
      disabled={pending}
      className="w-full"
    >
      Upgrade Now
    </Button>
  );
};

export default UpgradeButton;
