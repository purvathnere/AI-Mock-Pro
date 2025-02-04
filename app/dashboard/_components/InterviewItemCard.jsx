import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const InterviewItemCard = ({ interview, onCancel }) => {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };

  const onFeedbackPress = () => {
    router.push("/dashboard/interview/" + interview.mockId + "/feedback");
  };

  const onCancelInterview = async () => {
    // Call the cancel function passed as a prop
    await onCancel(interview?.mockId);
  };

  return (
    <div className="border rounded-2xl shadow-md hover:shadow-lg bg-white transition-shadow duration-300 p-6 transform hover:-translate-y-2">
      <h2 className="font-bold text-xl text-blue-600 mb-2">
        {interview?.jobPosition}
      </h2>
      <p className="text-sm text-gray-700 mb-1">
        Experience Required: <span className="font-medium">{interview?.jobExperience}</span>
      </p>
      <p className="text-xs text-gray-500 mb-4">
        Created At: {interview?.createdAt}
      </p>
      <div className="flex gap-4">
        <Button
          size="sm"
          variant="outline"
          className="w-full border-blue-500 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition"
          onClick={onFeedbackPress}
        >
          Feedback
        </Button>
        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition"
          size="sm"
          onClick={onStart}
        >
          Start
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="w-full text-red-600 border-red-600 hover:bg-red-100 hover:text-red-700 transition"
          onClick={onCancelInterview}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
