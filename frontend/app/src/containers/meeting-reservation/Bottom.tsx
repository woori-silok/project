import React from 'react';
import Bottom from '../../components/meeting-reservation/Bottom';
import { FormData } from '../../interfaces';

interface BottomContainerProps {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const BottomContainer: React.FC<BottomContainerProps> = (props) => {
  const { setFormData } = props;

  return <Bottom setFormData={setFormData} />;
};

export default BottomContainer;
