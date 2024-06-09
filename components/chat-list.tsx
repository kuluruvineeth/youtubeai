import { useChat } from "@/contexts/chat-context"
import type { Message } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

import EmptyScreen from "./chat-empty-screen"
import ChatItem from "./chat-item"

interface ChatListProps {
  className?: string
}

export default function ChatList({ className }: ChatListProps) {
  const { chatMessages, setChatPrompt } = useChat()

  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight
    }
  }, [chatMessages])
  return (
    <div className={cn("pt-16", className)}>
      {!chatMessages || chatMessages.length === 0 ? (
        <EmptyScreen setPromptInput={setChatPrompt} />
      ) : (
        <div
          ref={scrollContainerRef}
          className="h-[375px] overflow-y-scroll no-scrollbar">
          {chatMessages.map((message: Message, index: number) => (
            <ChatItem key={index} message={message} />
          ))}
        </div>
      )}
    </div>
  )
}
