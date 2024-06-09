import { useExtension } from "@/contexts/extension-context"
import { useTranscript } from "@/contexts/transcript-context"
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard"
import { cleanTextTranscript } from "@/utils/functions"
import {
  CheckIcon,
  ClipboardCopyIcon,
  Crosshair1Icon,
  MagnifyingGlassIcon
} from "@radix-ui/react-icons"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { TooltipWrapper } from "./ui/tooltip-wrapper"

interface TranscriptActionsProps {
  jumpCurrentTime: () => void
}

export default function TranscriptActions({
  jumpCurrentTime
}: TranscriptActionsProps) {
  const { transcriptSearch, setTranscriptSearch, transcriptJson } =
    useTranscript()

  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const { extensionLoading, extensionData } = useExtension()

  function CopyTranscript() {
    if (isCopied || !extensionData.transcript) return
    const processed = cleanTextTranscript(extensionData.transcript)
    copyToClipboard(processed)
  }

  return (
    <div className="flex flex-row w-full  justify-between items-center sticky top-0 z-10 bg-white pt-3.5 pb-3 px-3 space-x-4 dark:bg-[#0f0f0f]">
      <div className="relative w-full">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-60" />
        <Input
          type="text"
          placeholder="Search Transcript"
          className="pl-8"
          onChange={(e) => {
            e.preventDefault()
            setTranscriptSearch(e.currentTarget.value)
          }}
          disabled={extensionLoading || transcriptJson.length === 0}
        />
      </div>

      <div className="flex flex-row space-x-2">
        <TooltipWrapper text={"Jump to Current Time"}>
          <Button
            variant="outline"
            size="icon"
            onClick={jumpCurrentTime}
            disabled={extensionLoading || transcriptJson.length === 0}>
            <Crosshair1Icon className="h-4 w-4 opacity-60" />
          </Button>
        </TooltipWrapper>

        <TooltipWrapper text={"Copy Transcript"}>
          <Button
            variant="outline"
            size="icon"
            onClick={CopyTranscript}
            disabled={extensionLoading || transcriptJson.length === 0}>
            {isCopied ? (
              <CheckIcon className="h-4.5 w-4.5 opacity-60" />
            ) : (
              <ClipboardCopyIcon className="h-4.5 w-4.5 opacity-60" />
            )}
          </Button>
        </TooltipWrapper>
      </div>
    </div>
  )
}
