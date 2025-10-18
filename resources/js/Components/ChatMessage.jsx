import React from "react";
import { Bot } from "lucide-react";

export default function ChatMessage({ id, role, content, navigationHint }) {
    const isAssistant = role === "assistant";

    return (
        <div
            className={`flex ${
                isAssistant ? "" : "justify-end"
            } items-start gap-4`}
        >
            <div className="flex-shrink-0">
                <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        isAssistant ? "bg-primary" : "bg-slate-800"
                    }`}
                >
                    <Bot
                        className={`h-5 w-5 ${
                            isAssistant
                                ? "text-primary-foreground"
                                : "text-white"
                        }`}
                    />
                </div>
            </div>

            <div
                className={`max-w-[70%] ${
                    isAssistant
                        ? "bg-card border border-border"
                        : "bg-slate-800 text-white"
                } rounded-lg px-4 py-3`}
            >
                <div className="whitespace-pre-wrap break-words">{content}</div>

                {navigationHint && (
                    <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="text-sm text-muted-foreground">
                            {navigationHint.reason}
                        </div>
                        <a
                            href={navigationHint.page}
                            className="text-sm text-primary underline"
                        >
                            Go
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
