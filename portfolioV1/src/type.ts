import { z } from "zod";

// Definerer et Zod-skjema for Habit
export const ProjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  /*image: z
    .instanceof(File)
    .refine(file => file.type.startsWith('image/'), {
      message: "Filtypen må være et bilde (f.eks. JPEG, PNG).",
    })
    .refine(file => file.size <= 5 * 1024 * 1024, {
      message: "Bildet må være mindre enn 5MB.",
    }),*/
  startDate: z.string(),
  endDate: z.string(),
});

// Definerer et Zod-skjema for å opprette en ny Habit
export const ProjectCreateSchema = ProjectSchema.omit({ id: true });

// Definerer et Zod-skjema for en array av Habit
export const ProjectArraySchema = z.array(ProjectSchema);

// Oppdatert type-definisjon basert på Zod-skjemaet
export type Project = z.infer<typeof ProjectSchema>;

// Oppdatert type-definisjon basert på Zod-skjemaet
export type CreateProject = z.infer<typeof ProjectCreateSchema>;