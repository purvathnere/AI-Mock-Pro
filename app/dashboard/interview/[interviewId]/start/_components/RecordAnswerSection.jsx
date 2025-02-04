"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Log the speech-to-text results to ensure they are being captured
  useEffect(() => {
    console.log("Speech-to-text results: ", results);
    if (results.length > 0) {
      setUserAnswer(results.map(result => result.transcript).join(' '));
    }
  }, [results]);

  // Log updated user answer
  useEffect(() => {
    console.log("Updated userAnswer:", userAnswer);
  }, [userAnswer]);

  // Check if answer length is sufficient before saving
  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const SaveUserAnswer = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log("User Answer to Save:", userAnswer);

    // Check if the answer is long enough before submitting
    if (userAnswer.length < 10) {
      toast("Please record a longer answer.");
      return;
    }

    setLoading(true);

    // Construct the feedback prompt
    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}, please provide rating and feedback in JSON format.`;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      console.log("Backend result:", result);

      // Parse the feedback JSON response from the backend
      const mockJsonResp = JSON.parse(result.response.text().replace("```json", "").replace("```", ""));

      // Send data to DB
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: mockJsonResp?.feedback,
        rating: mockJsonResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      });

      if (resp) {
        toast("User Answer recorded successfully");
        setUserAnswer("");
        setResults([]);
      }
    } catch (error) {
      console.error("Error while saving user answer:", error);
      toast("There was an error while processing your answer.");
    }

    setLoading(false);
  };

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div>
      <div className="flex justify-center items-center flex-col bg-black rounded-lg p-5">
        <div className="relative">
          <Image
            src="/webcam.png" // Ensure the image path is correct
            width={200}
            height={200}
            alt="webcam"
            priority
          />
        </div>
      </div>
      <div>
        <h1>Recording: {isRecording.toString()}</h1>
        <button onClick={StartStopRecording}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <ul>
          {results.map((result) => (
            <li key={result.timestamp}>{result.transcript}</li>
          ))}
          {interimResult && <li>{interimResult}</li>}
        </ul>
      </div>
      <Button
        variant="outline"
        className="my-10"
        onClick={SaveUserAnswer}
      >
        {isRecording ? (
          <h2 className="text-red-600 items-center animate-pulse flex gap-2">
            <StopCircle /> Stop Recording...
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
      <Button onClick={() => console.log("User Answer:", userAnswer)}>
        Show User Answer
      </Button>
    </div>
  );
};

export default RecordAnswerSection;
