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
import { useRef, useState } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { GRAMMAR_TIPS, LANGUAGES, WRITING_PROMPTS } from "@/constants";

// type TFeedback = {
//   correctedText: string;
//   highlights: Array<{
//     type: string;
//     start: number;
//     end: number;
//     suggestion: string;
//   }>;
//   fluencyScore: number;
//   suggestions: string[];
// };
type TFeedback = {
  correctedText: string;
  fluencyScore: number;
  suggestions: string[];
};

function WritingLabPage() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("spanish");
  const [feedback, setFeedback] = useState<null | TFeedback>(null);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Mock feedback response
  const mockFeedback = {
    correctedText: text,
    highlights: [
      {
        type: "grammar",
        start: Math.floor(Math.random() * Math.max(text.length - 10, 0)),
        end: Math.floor(Math.random() * Math.max(text.length - 5, 5)) + 5,
        suggestion: "Consider using the correct tense here",
      },
      {
        type: "vocabulary",
        start: Math.floor(Math.random() * Math.max(text.length - 15, 0)),
        end: Math.floor(Math.random() * Math.max(text.length - 3, 3)) + 3,
        suggestion: "A more natural word choice would be...",
      },
    ],
    fluencyScore: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
    suggestions: [
      "Try using more connecting words to improve flow.",
      "Your sentence structure is good, but vary it more for natural speech.",
      "Consider using more idiomatic expressions.",
    ],
  };

  // const handleSubmit = async () => {
  //   if (!text.trim()) return;

  //   setIsSubmitting(true);
  //   // Simulate API call delay
  //   await new Promise((resolve) => setTimeout(resolve, 1500));

  //   setFeedback(mockFeedback);
  //   setIsSubmitting(false);
  // };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/labs/writing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language }),
      });

      const data = (await res.json()) as TFeedback;
      if (!data) setFeedback(data);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    }

    setIsSubmitting(false);
  };

  const handleReset = () => {
    setText("");
    setFeedback(null);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

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
    <div className="container mx-auto px-4 py-8">
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
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Writing Area */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Your Writing</h2>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-4">
                  <div className="mb-2 flex justify-between text-sm text-gray-500">
                    <span>Write up to 500 characters</span>
                    <span>{text.length}/500</span>
                  </div>
                  <Textarea
                    ref={textareaRef}
                    placeholder="Start writing here..."
                    className="min-h-[200px] resize-none focus:ring-2 focus:ring-green-500"
                    value={text}
                    onChange={(e) => setText(e.target.value.slice(0, 500))}
                    disabled={isSubmitting ?? !!feedback}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  {feedback ? (
                    <Button
                      onClick={handleReset}
                      className="gap-2 bg-green-500 text-white hover:bg-green-600"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Try Again
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!text.trim() || isSubmitting}
                      className="relative gap-2 overflow-hidden bg-green-500 text-white hover:bg-green-600"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="absolute inset-0 bg-green-600"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5 }}
                          />
                          <span className="relative">Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Feedback or Tips */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {feedback ? (
                <motion.div
                  key="feedback"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full">
                    <div className="p-6">
                      <h2 className="mb-4 text-xl font-semibold">Feedback</h2>

                      {/* Fluency Score */}
                      <div className="mb-6">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Fluency Score
                          </span>
                          <span className="text-sm font-bold">
                            {feedback.fluencyScore}%
                          </span>
                        </div>
                        <Progress
                          value={feedback.fluencyScore}
                          className="h-2.5 bg-gray-200"
                          indicatorClassName={`bg-gradient-to-r ${
                            feedback.fluencyScore > 80
                              ? "from-green-400 to-green-500"
                              : feedback.fluencyScore > 60
                                ? "from-yellow-400 to-yellow-500"
                                : "from-red-400 to-red-500"
                          }`}
                        />
                        {/* Fluency Score */}
                        <motion.div
                          className="mt-2 text-center"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                        >
                          {feedback.fluencyScore > 80 ? (
                            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                              Excellent!
                            </span>
                          ) : feedback.fluencyScore > 60 ? (
                            <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                              Good progress!
                            </span>
                          ) : (
                            <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
                              Keep practicing!
                            </span>
                          )}
                        </motion.div>
                      </div>

                      {/* Suggestions */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-700">
                          Suggestions:
                        </h3>
                        {feedback.suggestions.map((suggestion, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="flex items-start gap-2 rounded-lg bg-blue-50 p-3"
                          >
                            <div className="mt-0.5 flex-shrink-0 text-blue-500">
                              <Lightbulb className="h-4 w-4" />
                            </div>
                            <p className="text-sm text-blue-700">
                              {suggestion}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="tips"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full">
                    <div className="p-6">
                      <h2 className="mb-4 text-xl font-semibold">
                        Writing Tips
                      </h2>

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
              )}
            </AnimatePresence>
          </div>
        </div>
        {/* Achievement Banner - Shows when feedback is received */}
        {/* TODO: Dynamically update this banner with Check | Cross */}
        <AnimatePresence>
          {feedback && (
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
