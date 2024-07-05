"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
// import VideoRecorder from "@/components/video/VideoRecorder";
import { Chat } from "@/types/chatAssistant";
import { useEffect, useState } from "react";

const AssistPage = ({ params: { id } }: { params: { id: string } }) => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const getQuestion = (chats: Chat[]) => {
    const assistantChat = chats
      .reverse()
      .find((chat) => chat.role === "assistant");
    return assistantChat ? assistantChat.content : "";
  };

  const onClickSubmit = () => {
    // make post call to /api/assistant/:id with answer in body
    fetch(`/api/assistant/${id}`, {
      method: "POST",
      body: JSON.stringify({ message: answer }),
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.message);
        setAnswer("");
      });
  };
  useEffect(() => {
    fetch(`/api/assistant/${id}`)
      .then((res) => res.json())
      .then((data) => setQuestion(getQuestion(data.chats)));
  }, []);
  return (
    <div className="min-h-screen, min-w-screen flex flex-col">
      <main className="flex-grow grid md:grid-cols-2 p-4">
        <div className="">
          <p>{question}</p>
        </div>
        <div className="md:m-4 mt-2 md:mt-0 h-full w-full">
          <div className="flex flex-col h-full w-full justify-center items-center">
            {/* <VideoRecorder
              unique_id="assistant"
              onTranscriptGenerated={() => {}}
            /> */}
            <Textarea
              className="md:min-h-[32rem] min-h-96"
              onChange={(event) => setAnswer(event.target.value)}
              value={answer}
            />
          </div>

          <Button onClick={onClickSubmit}>Submit Answer</Button>
        </div>
      </main>
    </div>
  );
};

export default AssistPage;
