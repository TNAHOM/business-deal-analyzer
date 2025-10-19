import React, { useEffect, useRef, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import ChatMessage from "@/Components/ChatMessage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, Bot } from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const SAMPLE_MESSAGES = [
    {
        id: "sys-welcome",
        role: "assistant",
        content:
            "Welcome to Business Deal Analyzer. Tell me about your business or ask a question.",
    },
];

export default function Chat() {
    const [messages, setMessages] = useState(SAMPLE_MESSAGES);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e && e.preventDefault && e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = {
            id: `u-${Date.now()}`,
            role: "user",
            content: input.trim(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await axios.post("/chat", {
                message: userMessage.content,
            });

            const aiResponseText =
                res.data.agent_response?.aiResponse ?? "No response";

            const assistantMessage = {
                id: `s-${Date.now()}`,
                role: "assistant",
                content: aiResponseText,
            };

            // include navigation hint if provided by backend
            if (res.data.response?.navigationHint) {
                assistantMessage.navigationHint =
                    res.data.response.navigationHint;
            } else if (res.data.navigationHint) {
                assistantMessage.navigationHint = res.data.navigationHint;
            }

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (err) {
            const errMsg = {
                id: `err-${Date.now()}`,
                role: "assistant",
                content: "Sorry, something went wrong. Try again.",
            };
            setMessages((prev) => [...prev, errMsg]);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const quickPrompts = [
        "Evaluate an investment offer",
        "Analyze business risks",
        "Find growth opportunities",
        "Solve a business problem",
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Chat — Business Deal Analyzer" />

            <div className="flex h-[calc(100vh-4rem)] flex-col bg-background">
                <div className="border-b border-border bg-card px-4 py-4">
                    <div className="mx-auto max-w-4xl">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                <Sparkles className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <div>
                                <h2 className="font-sans text-lg font-semibold text-card-foreground">
                                    AI Business Assistant
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Ask me anything about your business
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-6">
                    <div className="mx-auto max-w-4xl space-y-6">
                        {messages.map((m) => (
                            <ChatMessage key={m.id} {...m} />
                        ))}

                        {isLoading && (
                            <div className="flex gap-4">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
                                    <Bot className="h-5 w-5 text-primary-foreground" />
                                </div>
                                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3">
                                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </div>

                <div className="border-t border-border bg-card px-4 py-4">
                    <div className="mx-auto max-w-4xl">
                        {messages.length === 1 && (
                            <div className="mb-4 flex flex-wrap gap-2">
                                {quickPrompts.map((prompt) => (
                                    <Button
                                        key={prompt}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setInput(prompt)}
                                        className="text-xs"
                                    >
                                        {prompt}
                                    </Button>
                                ))}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about offers, risks, opportunities, or problems..."
                                disabled={isLoading}
                                className="flex-1 bg-background text-foreground"
                            />
                            <Button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                size="icon"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
