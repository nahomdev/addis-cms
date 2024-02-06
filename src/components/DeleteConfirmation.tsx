import React from 'react';
import styled from '@emotion/styled';

interface DeleteConfirmationProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmationContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
`;

const ConfirmationText = styled.p`
  margin-bottom: 16px;
`;

const ConfirmationButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ConfirmButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b71c1c;
  }
`;

const CancelButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0d47a1;
  }
`;

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ConfirmationContainer>
      <ConfirmationContent>
        <ConfirmationText>Are you sure you want to delete this song?</ConfirmationText>
        <ConfirmationButtons>
          <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
        </ConfirmationButtons>
      </ConfirmationContent>
    </ConfirmationContainer>
  );
};

export default DeleteConfirmation;
