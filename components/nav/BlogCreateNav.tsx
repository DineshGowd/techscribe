import { useBlog } from "@/context/blog";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

export default function BlogCreateNav() {
  const { step, setStep } = useBlog();
  const pathname = usePathname();
  const isEdit = pathname.includes("/edit/");
  return (
    <div className="flex justify-center w-full py-4">
      <div className="flex space-x-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Button
            key={item}
            className={`w-10 h-10 flex items-center justify-center hover:bg-primary hover:text-slate-200 transition 
            ${
              step === item
                ? "bg-primary text-slate-100 dark:text-slate-800"
                : "bg-secondary text-gray-700 dark:text-gray-400"
            } rounded-full `}
            onClick={() => setStep(item)}
            disabled={!isEdit && step < item}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
}
