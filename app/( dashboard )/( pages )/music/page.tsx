'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Dependencies
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { MusicIcon } from 'lucide-react'
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

import { Empty } from '@/components/empty/Empty'
import { Heading } from '@/components/heading/Heading'
import { Loader } from '@/components/loader/Loader'

const MusicPage = () => {
  const [ musics, setMusics ] = useState<string>()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      prompt : ''
    },
    resolver: zodResolver(formSchema)
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusics(undefined)

      const response = await axios.post('api/music', values)

      setMusics(response.data.audio)
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
        title="Music Generation AI"
        description="A simple music generation AI"
        icon={ MusicIcon }
        iconColor="text-pink-500"
        bgColor="bg-pink-500/10"
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
                          placeholder="Type a message to generate a music"
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
              <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                <Loader />
              </div>
            )
          }
          {
            !musics && !isLoading && (
              <Empty label="No session started" />
            )
          }
          {
            musics && (
              <audio
                className="w-full mt-8"
                controls
              >
                <source src={ musics } />
              </audio>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default MusicPage
