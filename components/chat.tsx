import ChatAction from "./chat-actions"
import ChatList from "./chat-list"
import PromptForm from "./chat-prompt-form"

export default function Chat() {
  return (
    <div className="w-full h-[498px] relative bg-white">
      <ChatAction />
      <ChatList />
      <PromptForm />
    </div>
  )
}
