"use client";

import React from "react";
import qs from "query-string";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormItem, FormField } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "Attachment is required.",
  }),
});

const MessageFileModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "messageFile";
  const { apiUrl, query } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });
      await axios.post(url, { ...values, content: values.fileUrl });
      form.reset();
      router.refresh();
      handleClone();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClone = () => {
    form.reset();
    onClose();
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleClone}>
        <DialogContent className="p-0 overflow-hidden text-black bg-white">
          <DialogHeader className="px-6 pt-8">
            <DialogTitle className="text-2xl font-bold text-center">
              Add an attachment
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Send a file as a message
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="px-6 space-y-8">
                <div className="flex items-center justify-center text-center">
                  <FormField
                    control={form.control}
                    name="fileUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FileUpload
                            endpoint="messageFile"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <DialogFooter className="px-6 py-4 bg-gray-100">
                <Button disabled={isLoading} variant="primary">
                  Send
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MessageFileModal;
