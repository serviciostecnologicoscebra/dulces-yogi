"use client";

import { useMutation } from "@tanstack/react-query";
import { createContactRequest } from "@/features/contact/api/contactApi";

export function useCreateContactRequest() {
  return useMutation({ mutationFn: createContactRequest });
}
