"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { AptitudeTest } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AptitudeList = () => {
  const { user } = useUser();
  const [testList, setTestList] = useState([]);

  useEffect(() => {
    user && GetTestList();
  }, [user]);

  const GetTestList = async () => {
    const result = await db
      .select()
      .from(AptitudeTest)
      .where(eq(AptitudeTest.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(AptitudeTest.id));

    setTestList(result);
  };

  return (
    <div className="mt-8">
      <h2 className="font-medium text-xl mb-4">Previous Aptitude Tests</h2>
      {testList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testList.map((test, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{test.jobPosition}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><span className="font-medium">Job Description:</span> {test.jobDesc}</p>
                  <p><span className="font-medium">Experience Required:</span> {test.jobExperience}</p>
                  <p><span className="font-medium">Score:</span> {test.score || 'Not completed'}</p>
                  <p><span className="font-medium">Date:</span> {test.createdAt}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="my-10 flex flex-col gap-5">
          <Skeleton className="w-full sm:w-[20rem] h-10 rounded-full animate-pulse bg-gray-300" />
          <Skeleton className="w-full sm:w-[20rem] h-10 rounded-full animate-pulse bg-gray-300" />
        </div>
      )}
    </div>
  );
};

export default AptitudeList;