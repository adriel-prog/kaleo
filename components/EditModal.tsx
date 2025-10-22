import React, { useState, useEffect } from 'react';
// FIX: Changed the import for EditableItem to come from '../types' instead of '../App' where it was not defined, and combined type imports.
import type { EditableItem, BandMember, TimelineEvent, TourLocation } from '../types';

interface EditModalProps {
  item: EditableItem;
  onSave: (item: EditableItem) => void;
  onClose: () => void;
  onDelete: (item: EditableItem) => void;
}

const EditModal: React.FC<EditModalProps> = ({ item, onSave, onClose, onDelete }) => {
  const [formData, setFormData] = useState(item.data);

  useEffect(() => {
    setFormData(item.data);
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isNumber = type === 'number';
    setFormData(prev => ({ ...prev, [name]: isNumber ? parseFloat(value) || 0 : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // FIX: Reconstruct the object to be saved to maintain the discriminated union type integrity.
    // The original one-liner `onSave({ ...item, data: formData })` caused a type error because
    // TypeScript couldn't guarantee the correlation between `item.type` and the shape of `formData`.
    switch (item.type) {
      case 'timeline':
        onSave({ type: 'timeline', data: formData as TimelineEvent });
        break;
      case 'member':
        onSave({ type: 'member', data: formData as BandMember });
        break;
      case 'location':
        onSave({ type: 'location', data: formData as TourLocation });
        break;
    }
  };

  const getTitle = () => {
    const isNew = !('id' in item.data && (item.data as any).id > 1000000000000); // Simple check for new item
    const action = isNew ? 'Adicionar' : 'Editar';
    switch (item.type) {
      case 'timeline': return `${action} Evento na Linha do Tempo`;
      case 'member': return `${action} Membro`;
      case 'location': return `${action} Localização`;
      default: return 'Editar Item';
    }
  };
  
  const renderFormFields = () => {
    return Object.entries(formData).map(([key, value]) => {
      if (key === 'id') return null;
      
      const type = (typeof value === 'number') ? 'number' : 'text';
      const step = (key === 'latitude' || key === 'longitude') ? 'any' : undefined;

      return (
        <div key={key}>
          <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">
            {key.replace(/([A-Z])/g, ' $1')}
          </label>
          <input
            type={type}
            name={key}
            id={key}
            value={value as any}
            onChange={handleChange}
            step={step}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
      );
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-display font-bold leading-6 text-gray-900">{getTitle()}</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
                onClick={onClose}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {renderFormFields()}
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
            <button
                type="button"
                onClick={() => onDelete(item)}
                className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-red-700 hover:text-red-900 hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
              >
                Excluir
            </button>
            <div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mr-3"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;