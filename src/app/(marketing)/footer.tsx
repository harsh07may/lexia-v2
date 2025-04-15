import Image from "next/image";

import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <div className="hidden h-20 w-full border-t-4 border-slate-200 p-2 lg:block">
      <div className="flex h-full items-center justify-around">
        <Button size="lg" variant="ghost">
          <Image
            src="/courses/hr.svg"
            alt="Croatian"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Croation
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            src="/courses/fr.svg"
            alt="French"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          French
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            src="/courses/it.svg"
            alt="Italian"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Italian
        </Button>

        <Button size="lg" variant="ghost">
          <Image
            src="/courses/jp.svg"
            alt="Japanese"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Japanese
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            src="/courses/es.svg"
            alt="Spanish"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Spanish
        </Button>
      </div>
    </div>
  );
};
export default Footer;
