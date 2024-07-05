"use client";

import { Button } from "@/components/ui/button";
// import VideoRecorder from "@/components/video/VideoRecorder";

import { useRouter } from "next/navigation";

const AssistPage = () => {
  const router = useRouter();
  const onJoinButtonClick = async () => {
    console.log("clicked");
    // call the create assistant API
    fetch("/api/assistant", {
      method: "POST",
      body: JSON.stringify({
        careerLevel: "Senior Developer (5+ years experience)",
        role: "fullstack",
        technologies: [
          "Javascript",
          "React",
          "Next.js",
          "Node.js",
          "Express.js",
          "REST API",
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.assistantId) {
          router.push(`/assistant/${data?.assistantId}`);
        }
      });
  };
  return (
    <div className="min-h-screen, min-w-screen flex flex-col">
      <main className="flex-grow grid md:grid-cols-2 p-4">
        <div className="">
          {/* <VideoRecorder
            unique_id="assistant"
            onTranscriptGenerated={() => {}}
          /> */}
        </div>
        <div className="md:m-4 mt-2 md:mt-0 h-full w-full">
          <div className="flex flex-col h-full w-full justify-center items-center">
            <h3 className="text-[28px] ">Ready to Join?</h3>
            <p className="text-md mt-[32px]">
              AssistInterview is waiting in the call
            </p>
            <Button
              className="text-md mt-[16px] rounded-lg"
              onClick={onJoinButtonClick}
            >
              Join Now
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AssistPage;
