"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import ReactConfetti from "react-confetti";
import { useMount, useWindowSize } from "react-use";
import { toast } from "sonner";

import ChallengeSection from "./challenge-section";
import Footer from "./footer";
import Header from "./header";
import QuestionBubble from "./question-bubble";
import ResultCard from "./result-card";

import { useHeartsModal } from "@/store/useHeartsModal";
import { usePracticeModal } from "@/store/usePracticeModal";

import { upsertChallengeProgress } from "@/server/actions/challenge-progress";
import { reduceHearts } from "@/server/actions/user-progress";

import {
  DEFAULT_HEARTS_MAX,
  DEFAULT_POINTS_START,
  POINTS_PER_CHALLENGE,
} from "@/constants";
import type {
  Challenge,
  ChallengeOption,
  UserSubscription,
} from "@prisma/client";

type QuizProps = {
  initialLessonId: number;
  initialLessonChallenges: (Challenge & {
    completed: boolean;
    options: ChallengeOption[];
  })[];
  initialHearts: number;
  initialPercentage: number;
  userSubscription:
    | (UserSubscription & {
        isActive: boolean;
      })
    | null;
};

const Quiz = ({
  initialLessonId,
  initialLessonChallenges,
  initialHearts,
  initialPercentage,
  userSubscription,
}: QuizProps) => {
  const router = useRouter();
  const { width, height } = useWindowSize();
  const [pending, startTransition] = useTransition();

  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal } = usePracticeModal();

  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal();
    }
  });

  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const incorrectAudioRef = useRef<HTMLAudioElement | null>(null);
  const finishAudioRef = useRef<HTMLAudioElement | null>(null);

  const [lessonId] = useState<number>(initialLessonId);
  const [hearts, setHearts] = useState<number>(initialHearts);

  const [percentage, setPercentage] = useState<number>(() =>
    initialPercentage === 100 ? DEFAULT_POINTS_START : initialPercentage,
  );

  const [challenges] = useState(initialLessonChallenges);

  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed,
    );

    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const currentChallenge = challenges[activeIndex];
  const options = currentChallenge?.options ?? [];

  const isPro = !!userSubscription?.isActive;

  const title =
    currentChallenge?.type === "ASSIST"
      ? "Select the correct meaning"
      : currentChallenge?.question;

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onSelect = (id: number) => {
    if (status !== "none") return;
    setSelectedOption(id);
  };

  const onContinue = () => {
    if (pending || !selectedOption) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      startTransition(() => {
        onNext();
        setStatus("none");
        setSelectedOption(undefined);
      });

      return;
    }

    const correctOption = options.find((option) => option.correct);

    if (!correctOption) {
      return;
    }

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(currentChallenge!.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }

            if (correctAudioRef.current) {
              void correctAudioRef.current.play();
            }

            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            // this is a practice challenge
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, DEFAULT_HEARTS_MAX));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."));
      });
    } else {
      startTransition(() => {
        reduceHearts(currentChallenge!.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }

            if (incorrectAudioRef.current) {
              void incorrectAudioRef.current.play();
            }

            setStatus("wrong");

            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."));
      });
    }
  };

  if (!currentChallenge) {
    return (
      <>
        <audio ref={finishAudioRef} src="/finish.mp3" autoPlay />

        <ReactConfetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
        />

        <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-y-4 text-center lg:gap-y-8">
          <Image
            src="/icons/finish.svg"
            alt="Finish"
            height={100}
            width={100}
            className="hidden lg:block"
          />

          <Image
            src="/icons/finish.svg"
            alt="Finish"
            height={50}
            width={50}
            className="block lg:hidden"
          />

          <h1 className="text-xl font-bold text-neutral-700 lg:text-3xl">
            Great job! <br /> You&apos;ve completed the lesson.
          </h1>

          <div className="flex w-full items-center gap-x-4">
            <ResultCard
              variant="points"
              value={challenges.length * POINTS_PER_CHALLENGE}
            />

            <ResultCard variant="hearts" value={hearts} />
          </div>
        </div>

        <Footer
          onCheck={() => router.push("/learn")}
          status="completed"
          lessonId={lessonId}
        />
      </>
    );
  }

  return (
    <>
      <audio ref={correctAudioRef} src="/correct.wav" />
      <audio ref={incorrectAudioRef} src="/incorrect.wav" />

      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={isPro}
      />

      <div className="flex-1">
        <div className="flex h-full items-center justify-center">
          <div className="flex w-full flex-col gap-y-12 px-6 md:min-h-[350px] md:w-[600px] md:px-0">
            <h1 className="self-center text-lg font-bold text-neutral-700 lg:text-start lg:text-3xl">
              {title}
            </h1>

            <div>
              {currentChallenge.type === "ASSIST" && (
                <QuestionBubble question={currentChallenge.question} />
              )}

              <ChallengeSection
                options={options}
                onSelect={onSelect}
                status={status}
                disabled={pending}
                selectedOption={selectedOption}
                type={currentChallenge.type}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer
        onCheck={onContinue}
        status={status}
        disabled={pending || !selectedOption}
      />
    </>
  );
};

export default Quiz;
