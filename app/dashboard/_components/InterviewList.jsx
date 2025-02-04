"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

const InterviewList = () => {
  const { user } = useUser();
  const [InterviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MockInterview.id));

    setInterviewList(result);
  };

  const handleCancelInterview = async (mockId) => {
    // Perform the deletion logic (call to the backend to delete the interview)
    await db.delete(MockInterview).where(eq(MockInterview.mockId, mockId));

    // Remove the interview from the state (UI update)
    setInterviewList(InterviewList.filter((interview) => interview.mockId !== mockId));
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <h2 className="font-bold text-3xl text-gray-800 mb-6">
        Previous Mock Interviews
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {InterviewList && InterviewList.length > 0 ? (
          InterviewList.map((interview, index) => (
            <InterviewItemCard
              interview={interview}
              key={index}
              onCancel={handleCancelInterview} // Pass handleCancelInterview as prop
            />
          ))
        ) : (
          <p className="text-gray-500 text-lg">No mock interviews found.</p>
        )}
      </div>
    </div>
  );
};

export default InterviewList;
