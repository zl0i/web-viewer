import { PropsWithChildren } from 'react';
import './Dialog.css';

export default function Dialog({ isOpen, setIsOpen, children }: { isOpen: boolean; setIsOpen: Function } & PropsWithChildren) {
  return (
    <div className={`dialog-background ${isOpen ? 'dialog-visible' : ''}`} onClick={() => setIsOpen(false)}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
