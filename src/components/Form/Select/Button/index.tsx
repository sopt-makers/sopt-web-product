import { Fragment } from 'react';
import { Listbox } from '@headlessui/react';
import { styled } from 'stitches.config';
import ArrowSmallDownIcon from '@assets/svg/arrow_small_down.svg';
import { Option } from '../types';

interface ButtonProps {
  open?: boolean;
  value: Option;
}

function Button({ value, open }: ButtonProps) {
  return (
    <Listbox.Button as={Fragment}>
      <SButton>
        {value.label}
        <ArrowSmallDownIcon
          style={{ transform: `rotate(${open ? '180deg' : '0'})` }}
        />
      </SButton>
    </Listbox.Button>
  );
}

export default Button;

const SButton = styled('button', {
  minWidth: '147px',
  padding: '16px 20px 16px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  fontAg: '16_medium_100',
  color: '$white',
  background: '$black40',
  borderRadius: 10,
});
