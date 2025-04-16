"use client";
import { AnimatePresence, motion } from "motion/react";

import {
  Check,
  Send,
  RefreshCw,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Progress } from "@/components/ui/progress";

function WritingLabPage() {
  type TFeedback = {
    correctedText: string;
    highlights: Array<{
      type: string;
      start: number;
      end: number;
      suggestion: string;
    }>;
    fluencyScore: number;
    suggestions: string[];
  };
  const [feedback, setFeedback] = useState<null | TFeedback>(null);
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-6"
      >
        {/* Header */}
        <div className="text-center">
          <motion.h1
            className="mb-2 text-3xl font-bold text-gray-800"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            Writing Lab
          </motion.h1>
          <p className="text-gray-600">
            Practice writing and get AI feedback instantly!
          </p>
        </div>

        {/* Main Section */}

        {/* Achievement Banner - Shows when feedback is received */}
        {/* TODO: Dynamically update this banner with Check | Cross */}
        <AnimatePresence>
          {true && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center justify-between rounded-xl border border-green-100 bg-green-50 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-500 p-2 text-white">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">
                    Writing practice complete!
                  </h3>
                  <p className="text-sm text-green-600">
                    You&apos;ve earned 10 XP for this exercise.
                  </p>
                </div>
              </div>
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 font-bold text-yellow-800"
                >
                  +10
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
export default WritingLabPage;
