import ComponentCard from '@/components/tailAdmin/common/ComponentCard'
import Input from '@/components/tailAdmin/form/input/InputField'
import Label from '@/components/tailAdmin/form/Label'
import Switch from '@/components/tailAdmin/form/switch/Switch'
import Button from '@/components/tailAdmin/ui/button/Button'
import { Modal } from '@/components/tailAdmin/ui/modal'

import React, { useState } from 'react'

interface ModalProps {
  openModal: () => void
  closeModal: () => void
  isOpen: boolean
  totalBudget: number
  handleSubmit: () => void
}

function ConfirmVacancyTerms({
  openModal,
  closeModal,
  isOpen,
  totalBudget,
  handleSubmit,
}: ModalProps) {
  const [generalTermsAgreed, setGeneralTermsAgreed] = useState(false)
  const [budgetTermsAgreed, setBudgetTermsAgreed] = useState(false)

  const handleClose = () => {
    setGeneralTermsAgreed(false)
    setBudgetTermsAgreed(false)
    closeModal()
  }

  const handleConfirm = () => {
    handleSubmit()
    // Logic to handle the submission of the vacancy terms
    // This could involve API calls or state updates
    console.log('Vacancy terms agreed:', {
      generalTermsAgreed,
      budgetTermsAgreed,
    })
    handleClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[584px] p-5 lg:p-10"
    >
      <ComponentCard title="Confirm Vacancy Terms" className="w-full">
        <form className="">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <Switch
              defaultChecked={generalTermsAgreed}
              name="termsAndConditions"
              label={`I agree to the terms and conditions`}
              onChange={() => setGeneralTermsAgreed(!generalTermsAgreed)}
            />
            <p className="text-brand-red">{String(generalTermsAgreed)}</p>

            <Switch
              defaultChecked={budgetTermsAgreed}
              label={`I authorize Longlister to charge up to AED ${totalBudget?.toFixed(2)} based on CVs I approve`}
              onChange={() => setBudgetTermsAgreed(!budgetTermsAgreed)}
            />
            <p className="text-brand-red">{String(budgetTermsAgreed)}</p>
          </div>

          <div className="mt-6 flex w-full items-center justify-end gap-3">
            <Button size="sm" variant="outline" onClick={handleClose}>
              Close
            </Button>
            <Button
              size="sm"
              onClick={handleConfirm}
              disabled={!generalTermsAgreed || !budgetTermsAgreed}
            >
              Create Vacancy
            </Button>
          </div>
        </form>
      </ComponentCard>
    </Modal>
  )
}

export default ConfirmVacancyTerms
