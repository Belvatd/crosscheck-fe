import { z } from "zod";

export const MedicalRecordSchema= z.object({
    nik: z
    .string({ required_error: "NIK harus diisi" })
    .nonempty({ message: "NIK harus diisi" }),
})

export type MedicalRecordType = z.infer<typeof MedicalRecordSchema>