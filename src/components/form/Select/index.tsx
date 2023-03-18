import { useDisplay } from '@hooks/useDisplay';
import BottomSheetSelect from './BottomSheetSelect/BottomSheetSelect';
import BaseSelect from './BaseSelect/BaseSelect';
import { MultipleSelectProps, SelectProps } from './types/props';

function Select(props: SelectProps | MultipleSelectProps) {
  const { isMobile } = useDisplay();

  return <div>{isMobile ? <BottomSheetSelect {...props} /> : <BaseSelect {...props} />}</div>;
}

export default Select;
