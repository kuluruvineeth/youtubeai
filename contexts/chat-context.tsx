import type { Message, Model } from "@/lib/constants"
import { models } from "@/lib/constants"
import { createContext, useContext, useState } from "react"

interface ChatState {
  chatModel: Model
  chatIsGenerating: boolean
  chatIsError: boolean
  chatMessages: Message[] | undefined
  chatPrompt: string
  chatSuggestions: string[]
  chatIsGeneratingSuggestions: boolean
  chatIsErrorSuggestions: boolean
}

const initialState: ChatState = {
  chatModel: models[0],
  chatIsGenerating: false,
  chatIsError: false,
  chatMessages: [],
  chatPrompt: "",
  chatSuggestions: [],
  chatIsGeneratingSuggestions: false,
  chatIsErrorSuggestions: false
}

interface ChatActions {
  setChatModel: (model: Model) => void
  setChatIsGenerating: (isGenerating: boolean) => void
  setChatIsError: (isError: boolean) => void
  setChatMessages: (messages: Message[]) => void
  setChatPrompt: (prompt: string) => void
  setChatSuggestions: (suggestions: string[]) => void
  setChatIsGeneratingSuggestions: (isGeneratingSuggestions: boolean) => void
  setChatIsErrorSuggestions: (isErrorSuggestions: boolean) => void
}

interface ChatContext extends ChatState, ChatActions {}

const ChatContext = createContext<ChatContext | undefined>(undefined)

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}

interface ChatProviderProps {
  children: React.ReactNode
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [chatModel, setChatModel] = useState<Model>(initialState.chatModel)
  const [chatIsGenerating, setChatIsGenerating] = useState<boolean>(
    initialState.chatIsGenerating
  )

  const [chatIsError, setChatIsError] = useState<boolean>(
    initialState.chatIsError
  )
  const [chatMessages, setChatMessages] = useState<Message[]>(
    initialState.chatMessages
  )

  const [chatPrompt, setChatPrompt] = useState<string>(initialState.chatPrompt)
  const [chatSuggestions, setChatSuggestions] = useState<any[]>(
    initialState.chatSuggestions
  )

  const [chatIsGeneratingSuggestions, setChatIsGeneratingSuggestions] =
    useState<boolean>(initialState.chatIsGeneratingSuggestions)
  const [chatIsErrorSuggestions, setChatIsErrorSuggestions] = useState<boolean>(
    initialState.chatIsErrorSuggestions
  )

  const value = {
    chatIsError,
    chatIsErrorSuggestions,
    chatIsGenerating,
    chatIsGeneratingSuggestions,
    chatMessages,
    chatModel,
    chatPrompt,
    chatSuggestions,
    setChatIsError,
    setChatIsErrorSuggestions,
    setChatIsGenerating,
    setChatIsGeneratingSuggestions,
    setChatMessages,
    setChatModel,
    setChatPrompt,
    setChatSuggestions
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
