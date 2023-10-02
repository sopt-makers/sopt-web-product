import { styled } from 'stitches.config';
import { Dialog } from '@headlessui/react';
import ModalContainer from './ModalContainer';

interface ConfirmModalProps {
  isModalOpened: boolean;
  message: string;
  cancelButton: string;
  confirmButton: string;
  handleModalClose: () => void;
  handleConfirm: () => void;
}

const ConfirmModal = ({
  isModalOpened,
  message,
  cancelButton,
  confirmButton,
  handleModalClose,
  handleConfirm,
}: ConfirmModalProps) => {
  return (
    <ModalContainer isModalOpened={isModalOpened} handleModalClose={handleModalClose}>
      <SDialogWrapper>
        <Dialog.Title className="title">{message}</Dialog.Title>
        <div>
          <button onClick={handleModalClose}>{cancelButton}</button>
          <button onClick={handleConfirm}>{confirmButton}</button>
        </div>
      </SDialogWrapper>
    </ModalContainer>
  );
};

export default ConfirmModal;

const SDialogWrapper = styled('div', {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '$2',
  width: '$508',
  height: '$298',
  padding: '$48 $69',
  borderRadius: '20px',
  backgroundColor: '$black80',
  boxShadow: '4px 4px 40px #181818',
  display: 'flex',
  flexDirection: 'column',

  '@tablet': {
    width: 'calc(100% - 40px)',
    height: '$194',
    padding: '$32',
  },

  '.title': {
    fontAg: '24_bold_150',
    textAlign: 'center',
    color: '$white100',
    whiteSpace: 'pre-wrap',
    flex: '1',
    flexType: 'center',

    '@tablet': {
      fontAg: '16_bold_150',
    },
  },

  button: {
    width: '$175',
    padding: '$19 0',
    borderRadius: '10px',
    fontAg: '20_bold_100',
    textAlign: 'center',
    color: '$white100',

    '@tablet': {
      width: 'calc(50% - 10px)',
      padding: '$16 0',
      fontAg: '14_bold_100',
    },
  },

  'button:first-child': {
    backgroundColor: '$black40',
    mr: '$20',
  },

  'button:last-child': {
    backgroundColor: '$white100',
    color: '$black100',
  },
});
