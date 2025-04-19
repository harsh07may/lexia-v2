import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => (
  <div className="sticky top-[60px] z-50 mb-5 flex items-center justify-between border-b-2 bg-white py-3 text-neutral-400 md:top-0 md:mt-[-28px] md:pt-[28px]">
    <Button size="sm" variant="defaultOutline" asChild>
      <Link href="/courses">
        <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
      </Link>
    </Button>

    <h1 className="text-lg font-bold">{title}</h1>
    <div />
  </div>
);

export default Header;
