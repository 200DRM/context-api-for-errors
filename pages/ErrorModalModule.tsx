import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { useImmer } from 'use-immer';

interface State {
  isOpen: boolean;
  message: string;
}

interface Actions {
  show: (message: string) => void;
}

const ErrorModalContext = createContext<{
  actions: Actions,
  state: State
} | null>(null);

interface ErrorModalModuleProps {
  children: ReactNode;
}

export const ErrorModalModule = (props : ErrorModalModuleProps) => {

  const { children } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [state, setState] = useImmer<State>({
    isOpen: false,
    message: ''
  });

  const actions = useMemo<Actions>(() => {
    return {
      show: (message) => {
        setState(draft => {
          draft.isOpen = true;
          draft.message = message;
        })
      }
    }
  }, []);

  return (
    <>
      <Modal isOpen={state.isOpen} toggle={() => setState(draft => {
        draft.isOpen = false
      })}>
        <ModalHeader>
          Error
        </ModalHeader>
        <ModalBody>
          {state.message}
        </ModalBody>
      </Modal>
      <ErrorModalContext.Provider
        value={{
          actions,
          state
        }}
      >
        {children}
      </ErrorModalContext.Provider>
    </>
  );

};

export function useErrorModalActions() {
  const context = useContext(ErrorModalContext);
  if (!context) {
    throw new Error('ErrorModalModule is not set');
  }
  return context.actions;
};