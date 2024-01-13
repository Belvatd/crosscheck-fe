"use client"
import { FormInputText } from "@/components/FormInputText"
import {
  MedicalRecordSchema,
  MedicalRecordType,
  useGetMedicalRecord,
} from "@/hooks/services/MedicalRecord"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { use, useEffect, useState } from "react"
import { FieldErrors, useForm } from "react-hook-form"
import { BounceLoader, PulseLoader } from "react-spinners"

function Page() {
  const { handleSubmit, control } = useForm<MedicalRecordType>({
    resolver: zodResolver(MedicalRecordSchema),
    defaultValues: {
      nik: "",
    },
    mode: "onChange",
  })

  const [dataUser, setDataUser] = useState<any>()
  const [isDataEnable, setIsDataEnable] = useState<boolean>(false)

  const { mutateAsync, isPending, status } = useGetMedicalRecord({
    onSuccess: (data) => {
      console.log(data, "success")
    },
    onError: (error) => {
      console.log(error)
    },
  })

  useEffect(() => {
    if (!isPending && status === "success" && dataUser) {
      setIsDataEnable(true)
    }
  }, [isPending, status, dataUser])

  const onError = (error: FieldErrors<MedicalRecordType>) => {
    console.log(error)
    return error
  }

  const onSubmit = async (data: MedicalRecordType) => {
    try {
      const result = await mutateAsync(data)
      console.log(result, "result")
      if (result) {
        setDataUser(result)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const LabelValue = ({ label, value }: { label: string; value: string }) => {
    return (
      <div className="flex gap-1">
        <p className="text-[14px] font-medium">{label}: </p>
        <p className="text-[14px] font-normal">{value}</p>
      </div>
    )
  }

  return (
    <div className="mt-auto grid w-full gap-5 rounded-2xl bg-white p-4 pb-5">
      <div>
        <p className="text-xl font-semibold text-gray-900">Selamat Datang</p>
        <p className="mt-2 text-sm text-gray-500">
          Masukkan NIK untuk mendapatkan rekam medis
        </p>
      </div>
      <div>
        <form
          className="flex w-[100%] flex-col gap-5"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <FormInputText name={"nik"} control={control} label={"NIK"} />
          <button
            type="submit"
            className="rounded-lg bg-green-500 py-2 text-white"
          >
            {isPending ? <PulseLoader color="#fff" /> : "Cari"}
          </button>
        </form>
        {dataUser?.data === undefined && isDataEnable && (
          <div className="flex justify-center pt-6">
            <div>
              <p className="text-[20px] font-semibold">
                Mohon Maaf Data tidak ditemukan
              </p>
              <p className="text-[14px] font-normal pt-2 flex justify-center pb-4">
                Silahkan cek kembali nomor NIK anda!
              </p>
            </div>
          </div>
        )}
        {isDataEnable && dataUser?.data !== undefined && (
          <div className="pt-6">
            <p className="text-[20px] font-semibold">Rekam Medis</p>
            <div className="flex flex-col gap-2 pt-4">
              <LabelValue
                label={"Nama Lengkap"}
                value={dataUser?.data?.name || "-"}
              />
              <LabelValue
                label={"Alamat"}
                value={dataUser?.data?.address || "-"}
              />
              <LabelValue
                label={"Berat Badan"}
                value={`${dataUser?.data?.weight} Kg` || "-"}
              />
              <LabelValue
                label={"Tinggi Badan"}
                value={`${dataUser?.data?.height} Cm` || "-"}
              />
              <LabelValue
                label={"Status Asuransi"}
                value={dataUser?.data?.weight ? "Aktif" : "Tidak Aktif"}
              />
              <LabelValue
                label={"Penyedia Asuransi"}
                value={dataUser?.data?.insurancaCarrier || "Tidak Ada"}
              />
              <LabelValue
                label={"Nomor Polis Asuransi"}
                value={dataUser?.data?.policyNumber || "Tidak Ada"}
              />
              <LabelValue
                label={"Nama Kontak Darurat"}
                value={dataUser?.data?.emergencyContactName || "Tidak Ada"}
              />
              <LabelValue
                label={"No. Hp Kontak Darurat"}
                value={dataUser?.data?.emergencyContactNumber || "Tidak Ada"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
