import ComponentCard from '@/components/tailAdmin/common/ComponentCard'
import Input from '@/components/tailAdmin/form/input/InputField'
import Label from '@/components/tailAdmin/form/Label'
import Switch from '@/components/tailAdmin/form/switch/Switch'
import Button from '@/components/tailAdmin/ui/button/Button'
import { Modal } from '@/components/tailAdmin/ui/modal'
import Link from 'next/link'

import React, { useState } from 'react'

interface ModalProps {
  openModal: () => void
  closeModal: () => void
  isOpen: boolean
  handleSubmit: () => void
}

function ConfirmGeneralTerms({
  openModal,
  closeModal,
  isOpen,
  handleSubmit,
}: ModalProps) {
  const [generalTermsAgreed, setGeneralTermsAgreed] = useState(false)

  const handleClose = () => {
    setGeneralTermsAgreed(false)
    closeModal()
  }

  const handleConfirm = () => {
    handleSubmit()
    // Logic to handle the submission of the vacancy terms
    // This could involve API calls or state updates
    console.log('Vacancy terms agreed:', {
      generalTermsAgreed,
    })
    handleClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[584px] p-5 lg:p-10"
    >
      <ComponentCard title="Terms and Conditions" className="w-full">
        <form className="">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
            <Link
              href={'/terms-and-conditions'}
              target="_blank"
              className="col-span-3"
            >
              <Label className="text-sm font-semibold">
                Please read our{' '}
                <Button
                  variant="plain"
                  className="text-brand-blue inline hover:underline"
                >
                  Terms and Conditions
                </Button>
              </Label>
            </Link>
            <Switch
              defaultChecked={generalTermsAgreed}
              name="termsAndConditions"
              label={`I agree to the terms and conditions`}
              onChange={() => setGeneralTermsAgreed(!generalTermsAgreed)}
              className="col-span-3"
            />

            <div className="col-span-3 mt-6 flex w-full items-center justify-start gap-3">
              <Button size="sm" variant="outline" onClick={handleClose}>
                Close
              </Button>
              <Button
                size="sm"
                onClick={handleConfirm}
                disabled={!generalTermsAgreed}
              >
                Complete Profile
              </Button>
            </div>
          </div>
        </form>
      </ComponentCard>
    </Modal>
  )
}

export default ConfirmGeneralTerms
