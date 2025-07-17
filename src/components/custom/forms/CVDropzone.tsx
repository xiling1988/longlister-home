import { CheckLineIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface CVDropzoneProps {
  isPending?: boolean
  cvFile: File | null
  setCvFile: (file: File | null) => void
}

function CVDropzone({ isPending = false, cvFile, setCvFile }: CVDropzoneProps) {
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setCvFile(acceptedFiles[0])
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': [],
    },
  })
  return (
    <div
      className={`col-span-3 cursor-pointer rounded-xl ${isPending ? '' : 'border border-dashed border-gray-300 transition hover:border-brand-red'} dark:border-gray-700 dark:hover:border-brand-red`}
    >
      <div
        {...getRootProps()}
        className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10 ${
          isDragActive
            ? 'border-brand-red bg-gray-100 dark:bg-gray-800'
            : 'border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900'
        } `}
        id="demo-upload"
      >
        <input {...getInputProps()} />
        <div className="dz-message m-0! flex flex-col items-center">
          {/* Icon Container */}
          <div className="mb-[22px] flex justify-center">
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-brand-coral text-gray-700 dark:bg-gray-800 dark:text-gray-400">
              {isPending ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline h-8 w-8 animate-spin fill-brand-red text-brand-cream dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : cvFile ? (
                <CheckLineIcon />
              ) : (
                <svg
                  className="fill-current"
                  width="29"
                  height="28"
                  viewBox="0 0 29 28"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                  />
                </svg>
              )}
            </div>
          </div>

          {/* Text Content */}
          {cvFile ? (
            <>
              <h4 className="mb-3 text-theme-xl font-semibold text-gray-800 dark:text-white/90">
                {cvFile.name}
              </h4>
              <Trash2Icon
                className="h-4 w-4 cursor-pointer text-brand-red"
                onClick={(e) => {
                  e.stopPropagation()
                  setCvFile(null)
                }}
              />
            </>
          ) : (
            <>
              <h4 className="mb-3 text-theme-xl font-semibold text-gray-800 dark:text-white/90">
                {isPending
                  ? 'Uploading CV and Building Candidate Profile'
                  : isDragActive
                    ? 'Drop Files Here'
                    : 'Drag & Drop Files Here'}
              </h4>

              <span className="mb-5 block w-full max-w-lg text-center text-sm text-gray-700 dark:text-gray-400">
                {isPending
                  ? 'Our AI is identifying and profiling your candidate. All personal information will be hidden to this client until they choose to unlock them.'
                  : 'Drag and drop your PNG, JPG, WebP, SVG images here or browse'}
              </span>

              {!isPending && (
                <span className="text-theme-sm font-medium text-brand-red underline">
                  Browse File
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CVDropzone
