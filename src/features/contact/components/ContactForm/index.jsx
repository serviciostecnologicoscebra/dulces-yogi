"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useCreateContactRequest } from "@/features/contact/hooks/useCreateContactRequest";
import { contactSchema } from "@/server/validators/schemas";

const fields = [
  { name: "firstName", label: "Nombres", placeholder: "Escribe tu nombre" },
  { name: "lastName", label: "Apellidos", placeholder: "Escribe tus apellidos" },
  { name: "email", label: "Correo electrónico", placeholder: "nombre@correo.com", type: "email" },
  { name: "phone", label: "Número de contacto", placeholder: "+51 999 999 999", type: "tel" },
];

export default function ContactForm() {
  const mutation = useCreateContactRequest();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(contactSchema), defaultValues: { firstName: "", lastName: "", email: "", phone: "", message: "", consent: false } });
  const submit = (values) => mutation.mutate(values, { onSuccess: () => reset() });
  return (
    <form className="contact-form" onSubmit={handleSubmit(submit)} noValidate>
      <p className="eyebrow">Haz tu pedido</p><h2 className="section-title mt-3">Cuéntanos qué tienes en mente.</h2><p className="mt-2">Completa tus datos y te responderemos para preparar algo especialmente para ti.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">{fields.map((field) => <Field key={field.name} field={field} error={errors[field.name]} register={register} />)}</div>
      <div className="mt-4"><label className="text-sm font-bold" htmlFor="message">Mensaje</label><textarea id="message" className="yogi-input mt-2 min-h-28 resize-y" placeholder="Cuéntanos sobre tu pedido, fecha y cantidad" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} {...register("message")} />{errors.message && <p id="message-error" className="mt-1 text-sm font-semibold text-red-800">{errors.message.message}</p>}</div>
      <label className="mt-4 flex items-start gap-3 text-sm"><input type="checkbox" className="mt-1 h-4 w-4 accent-black" {...register("consent")} /><span>Acepto que Yogi me contacte para responder esta solicitud.{errors.consent && <span className="mt-1 block font-semibold text-red-800">{errors.consent.message}</span>}</span></label>
      <button className="yogi-button mt-6 flex w-full justify-center gap-2" disabled={mutation.isPending}>{mutation.isPending ? "Enviando…" : "Enviar solicitud"}<ArrowRight size={18} /></button>
      <div className="mt-4 min-h-6 text-sm font-semibold" aria-live="polite">{mutation.isSuccess && <p>¡Gracias! Recibimos tu solicitud y te contactaremos pronto.</p>}{mutation.isError && <p className="text-red-800">{mutation.error.message}</p>}</div>
    </form>
  );
}

function Field({ field, error, register }) {
  const errorId = `${field.name}-error`;
  return <div><label className="text-sm font-bold" htmlFor={field.name}>{field.label}</label><input id={field.name} type={field.type || "text"} className="yogi-input mt-2" placeholder={field.placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} {...register(field.name)} />{error && <p id={errorId} className="mt-1 text-sm font-semibold text-red-800">{error.message}</p>}</div>;
}
