import Input from '@/components/tailAdmin/form/input/InputField'
import Label from '@/components/tailAdmin/form/Label'
import Button from '@/components/tailAdmin/ui/button/Button'
import { Modal } from '@/components/tailAdmin/ui/modal'

import React from 'react'

interface CreateVacancyModalProps {
  openModal: () => void
  closeModal: () => void
  isOpen: boolean
}

function CreateVacancyModal({
  openModal,
  closeModal,
  isOpen,
}: CreateVacancyModalProps) {
  const handleSave = () => {
    // Handle save logic here
    console.log('Saving changes...')
    closeModal()
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="max-w-[584px] p-5 lg:p-10"
    >
      <form className="">
        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
          Personal Information
        </h4>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="col-span-1">
            <Label>First Name</Label>
            <Input type="text" placeholder="Emirhan" />
          </div>

          <div className="col-span-1">
            <Label>Last Name</Label>
            <Input type="text" placeholder="Boruch" />
          </div>

          <div className="col-span-1">
            <Label>Last Name</Label>
            <Input type="email" placeholder="emirhanboruch55@gmail.com" />
          </div>

          <div className="col-span-1">
            <Label>Phone</Label>
            <Input type="text" placeholder="+09 363 398 46" />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <Label>Bio</Label>
            <Input type="text" placeholder="Team Manager" />
          </div>
        </div>

        <div className="mt-6 flex w-full items-center justify-end gap-3">
          <Button size="sm" variant="outline" onClick={closeModal}>
            Close
          </Button>
          <Button size="sm" onClick={openModal}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateVacancyModal
