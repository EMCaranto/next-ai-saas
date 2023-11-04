'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Dependencies
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { MessageSquareIcon } from 'lucide-react'
import { ChatCompletionRequestMessage } from 'openai'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { formSchema } from './constant'

// Components
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { BotAvatar } from '@/components/avatar/BotAvatar'
import { UserAvatar } from '@/components/avatar/UserAvatar'
import { Empty } from '@/components/empty/Empty'
import { Heading } from '@/components/heading/Heading'
import { Loader } from '@/components/loader/Loader'

// Library
import { cn } from '@/lib/utils'

const ConversationPage = () => {
  const [ messages, setMessages ] = useState<ChatCompletionRequestMessage[]>([])
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      prompt: ''
    },
    resolver: zodResolver(formSchema)
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: 'user',
        content: values.prompt
      }

      const newMessage = [...messages, userMessage]

      const response = await axios.post('/api/conversation', {
        messages: newMessage
      })

      setMessages((current) => [...current, userMessage, response.data])

      form.reset()
    }
    catch (error) {
      console.log(error)
    }
    finally {
      router.refresh()
    }
  }

  return(
    <div>
      <Heading
        title="Conversational AI"
        description="A simple AI conversation model"
        icon={ MessageSquareIcon }
        iconColor="text-orange-500"
        bgColor="bg-orange-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form { ...form }>
            <form
              className="rounded-lg border w-full py-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
              onSubmit={ form.handleSubmit(onSubmit) }
              autoComplete="off"
            >
              <FormField
                name="prompt"
                render={
                  ({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent px-4"
                          placeholder="Send message to start a conversation .."
                          disabled={ isLoading }
                          { ...field }
                        />
                      </FormControl>
                    </FormItem>
                  )
                }
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={ isLoading }
              >
                Send Message
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {
            isLoading && (
              <div className="p-20 rounded-lg w-full flex items-center justify-center bg-muted">
                <Loader />
              </div>
            )
          }
          {
            messages.length === 0 && !isLoading && (
              <Empty label="No conversation started" />
            )
          }
          <div className="flex flex-col-reverse gap-y-4">
            {
              messages.map((message) => (
                <div
                  className={
                    cn(
                      "p-8 w-full flex items-start gap-x-8 rounded-lg",
                      message.role === "user"
                      ? "bg-white border border-black/10"
                      : "bg-muted"
                    )
                  }
                  key={ message.content }
                >
                  {
                    message.role === "user"
                    ? <UserAvatar />
                    : <BotAvatar />
                  }
                  <p className="text-sm">
                    { message.content }
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConversationPage
