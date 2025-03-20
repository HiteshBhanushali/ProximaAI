"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { AptitudeTest } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import moment from "moment";
import { useRouter } from "next/navigation";

const AptitudeList = () => {
  const { user } = useUser();
  const [aptitudeList, setAptitudeList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    user && getAptitudeList();
  }, [user]);

  const getAptitudeList = async () => {
    const result = await db
      .select()
      .from(AptitudeTest)
      .where(eq(AptitudeTest.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(AptitudeTest.id));

    setAptitudeList(result);
  };

  return (
    <div>
      {aptitudeList.length > 0 ? (
        <>
          <h2 className="font-medium text-xl">Previous Aptitude Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
            {aptitudeList.map((test, index) => (
              <Card key={index} className="p-4 cursor-pointer hover:shadow-md transition-all">
                <h3 className="font-semibold">{test.jobPosition}</h3>
                <p className="text-sm text-gray-500 mt-1">{test.jobDesc}</p>
                <p className="text-sm mt-2">Experience: {test.jobExperience} years</p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-500">{moment(test.createdAt).format("MMM DD, YYYY")}</p>
                  {test.score && (
                    <p className="text-sm font-medium">Score: {test.score}%</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </>
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