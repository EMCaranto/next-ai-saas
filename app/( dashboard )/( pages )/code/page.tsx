'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Dependencies
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { CodeIcon } from 'lucide-react'
import { ChatCompletionRequestMessage } from 'openai'
import { useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
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

const CodePage = () => {
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
    try{ 
      const userMessage: ChatCompletionRequestMessage = {
        role: 'user',
        content: values.prompt
      }

      const newMessage = [...messages, userMessage]

      const response = await axios.post('/api/code', {
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
        title="Code Generator AI"
        description="A simple Code Generator AI"
        icon={ CodeIcon }
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form { ...form }>
            <form
              className="rounded-lg vorder w-full py-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
              onSubmit={ form.handleSubmit(onSubmit) }
            >
              <FormField
                name="prompt"
                render={
                  ({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent px-4"
                          placeholder="Type a message to generate a code"
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
                Generate
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
              <Empty label="No session started" />
            )
          }
          <div className="flex flex-col-reverse gap-y-4">
            {
              messages.map((message) => (
                <div
                  className={
                    cn(
                      "p-8 w-full flex items-center gap-x-8 rounded-lg",
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
                    : <BotAvatar/>
                  }
                  <ReactMarkdown
                    className="text-sm overflow-hidden leading-7"
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                          <pre { ...props } />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="bg-black/10 rounded-lg p-1"
                          { ...props }
                        />
                      )
                    }}
                  >
                    { message.content || "" }
                  </ReactMarkdown>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodePage
