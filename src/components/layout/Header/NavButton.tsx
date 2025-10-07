import { LucideIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  icon: LucideIcon;
  label: string;
  href?: string;
  styles?: string;
};

function NavButton({ icon: Icon, label, href, styles }: Props) {
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      aria-label={label}
      title={label}
      asChild
      className={`${styles} rounded-full`}
    >
      {href ? (
        <Link href={href}>
          <Icon className="size-fit stroke-[2.5]" />
        </Link>
      ) : (
        <Icon className="size-fit stroke-[2.5]" />
      )}
    </Button>
  );
}

export default NavButton;
