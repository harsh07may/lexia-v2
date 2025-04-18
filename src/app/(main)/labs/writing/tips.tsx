import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GRAMMAR_TIPS, WRITING_PROMPTS } from "@/constants";
import { useState } from "react";

function Tips() {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // TIPS & PROMPTS
  const nextPrompt = () => {
    setCurrentPromptIndex((prev) => (prev + 1) % WRITING_PROMPTS.length);
  };

  const prevPrompt = () => {
    setCurrentPromptIndex(
      (prev) => (prev - 1 + WRITING_PROMPTS.length) % WRITING_PROMPTS.length,
    );
  };

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % GRAMMAR_TIPS.length);
  };

  const prevTip = () => {
    setCurrentTipIndex(
      (prev) => (prev - 1 + GRAMMAR_TIPS.length) % GRAMMAR_TIPS.length,
    );
  };
  return (
    <motion.div
      key="tips"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Writing Tips</h2>

          {/* Writing Prompt */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-semibold text-gray-700">
              Try this prompt:
            </h3>
            <div className="relative">
              <div className="rounded-lg border border-green-100 bg-green-50 p-4 text-sm">
                {WRITING_PROMPTS[currentPromptIndex]}
              </div>
              <div className="absolute top-1/2 -left-3 -translate-y-1/2">
                <Button
                  variant="secondaryOutline"
                  size="icon"
                  className="h-6 w-6 rounded-full bg-white shadow-sm"
                  onClick={prevPrompt}
                >
                  <ChevronLeft className="h-3 w-3" />
                  <span className="sr-only">Previous prompt</span>
                </Button>
              </div>
              <div className="absolute top-1/2 -right-3 -translate-y-1/2">
                <Button
                  variant="secondaryOutline"
                  size="icon"
                  className="h-6 w-6 rounded-full bg-white shadow-sm"
                  onClick={nextPrompt}
                >
                  <ChevronRight className="h-3 w-3" />
                  <span className="sr-only">Next prompt</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Grammar Tip */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-700">
              Grammar tip:
            </h3>
            <div className="relative">
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm">
                {GRAMMAR_TIPS[currentTipIndex]}
              </div>
              <div className="absolute top-1/2 -left-3 -translate-y-1/2">
                <Button
                  variant="secondaryOutline"
                  size="icon"
                  className="h-6 w-6 rounded-full bg-white shadow-sm"
                  onClick={prevTip}
                >
                  <ChevronLeft className="h-3 w-3" />
                  <span className="sr-only">Previous tip</span>
                </Button>
              </div>
              <div className="absolute top-1/2 -right-3 -translate-y-1/2">
                <Button
                  variant="secondaryOutline"
                  size="icon"
                  className="h-6 w-6 rounded-full bg-white shadow-sm"
                  onClick={nextTip}
                >
                  <ChevronRight className="h-3 w-3" />
                  <span className="sr-only">Next tip</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
export default Tips;
