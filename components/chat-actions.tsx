import { useChat } from "@/contexts/chat-context"
import { useExtension } from "@/contexts/extension-context"
import { models, type Model } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { PlusIcon } from "@radix-ui/react-icons"

import { Button } from "./ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select"
import { TooltipWrapper } from "./ui/tooltip-wrapper"

interface ChatActionProps {
  className?: string
}

export default function ChatAction({ className }: ChatActionProps) {
  const {
    chatModel,
    chatIsGenerating,
    setChatMessages,
    setChatIsGenerating,
    setChatIsError,
    setChatModel
  } = useChat()

  const { extensionLoading } = useExtension()

  function resetChat() {
    setChatMessages([])
    setChatIsGenerating(false)
    setChatIsError(false)
  }

  return (
    <div
      className={cn(
        "flex flex-row w-full justify-between items-center sticky top-0 z-20 bg-white pt-3.5 pb-2 px-3",
        className
      )}>
      <Select
        value={chatModel.value}
        onValueChange={(value) =>
          setChatModel(models.find((model) => model.value === value))
        }>
        <SelectTrigger className="w-fit space-x-3">
          <SelectValue placeholder="Model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model: Model) => (
            <SelectItem key={model.value} value={model.value}>
              <div className="flex flex-row items-center">
                <div className="mr-2">{model.icon}</div>
                {model.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex flex-row space-x-2">
        <TooltipWrapper text={"New Chat"}>
          <Button
            className="flex flex-row space-x-2"
            variant="outline"
            onClick={resetChat}
            disabled={chatIsGenerating || extensionLoading}>
            <PlusIcon className="h-4 w-4 opacity-60" />
            <span>New Chat</span>
          </Button>
        </TooltipWrapper>
      </div>
    </div>
  )
}
