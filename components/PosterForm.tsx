
import React from 'react';
import { PosterData } from '../types';

interface PosterFormProps {
  data: PosterData;
  onChange: (data: PosterData) => void;
  onSubmit: () => void;
  loading: boolean;
}

const PosterForm: React.FC<PosterFormProps> = ({ data, onChange, onSubmit, loading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Event Title</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            placeholder="e.g. Neon Nights Jazz"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-white border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Event Type</label>
          <input
            type="text"
            name="eventType"
            value={data.eventType}
            onChange={handleChange}
            placeholder="e.g. Music Festival"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-white border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date & Time</label>
          <input
            type="text"
            name="date"
            value={data.date}
            onChange={handleChange}
            placeholder="e.g. October 12, 8:00 PM"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-white border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Preferred Colors</label>
          <input
            type="text"
            name="colors"
            value={data.colors}
            onChange={handleChange}
            placeholder="e.g. Deep Blues and Gold"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-white border"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Target Audience</label>
        <input
          type="text"
          name="audience"
          value={data.audience}
          onChange={handleChange}
          placeholder="e.g. Young professionals, art lovers"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-white border"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tone/Vibe</label>
        <textarea
          name="tone"
          value={data.tone}
          onChange={handleChange}
          placeholder="e.g. High energy, elegant, minimalist..."
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-white border"
        />
      </div>
      <button
        onClick={onSubmit}
        disabled={loading}
        className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {loading ? 'Crafting Your Design...' : 'Generate Poster Concept'}
      </button>
    </div>
  );
};

export default PosterForm;
