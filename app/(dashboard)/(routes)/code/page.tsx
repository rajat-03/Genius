"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { Code, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Heading";
import Empty from "@/components/Empty";
import UserAvatar from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";
import Loader from "@/components/Loader";
import Markdown from "react-markdown";
import { Textarea } from "@/components/ui/textarea";


const CodePage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/code", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate code using descriptive text."
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
      <div className="px-4 lg:px-8">
        <div className="space-y-4 mt-4">
          {messages.length === 0 && !isLoading && (
            <div>
              <Empty label="No conversation started." />
            </div>
          )}
          <div className="flex flex-col gap-y-4">
            {messages.map((message: any) => (
              <div
                key={message.content}
                className={cn(
                  "px-8 py-3 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">
                  <Markdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="bg-black/10 rounded-lg p-1"
                          {...props}
                        />
                      ),
                    }}
                    className="text-sm overflow-hidden leading-7"
                  >
                    {message.content || ""}
                  </Markdown>
                </p>
              </div>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="p-8 my-4 rounded-lg w-full flex items-center justify-center bg-muted">
            <Loader />
          </div>
        )}

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 my-4 focus-within:shadow-sm grid grid-cols-12 gap-2 items-end"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-11">
                    <FormControl className="m-0 p-0">
                      <Textarea
                        className="resize-none overflow-hidden border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        rows={1}
                        placeholder="Simple toggle button using react hooks."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-1 w-full p-2"
                disabled={isLoading}
              >
                <Send />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
