'use client'
import { useState } from 'react';

interface SurveyModalProps {
  closeModal: () => void;
  handleSubmit: () => void;
}

const SurveyModal: React.FC<SurveyModalProps> = ({ closeModal, handleSubmit }) => {
  const [solved, setSolved] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(1);
  const [feedback, setFeedback] = useState<string>('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ solved, rating, feedback });
    handleSubmit();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-md mx-auto p-4 border rounded-md shadow-md bg-white relative">
        <h2 className="text-2xl font-bold mb-4">설문 조사</h2>
        <button
          className="absolute top-4 right-4 px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={closeModal}
        >
          닫기
        </button>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-lg">잘 해결되셨습니까?</label>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  value="yes"
                  checked={solved === true}
                  onChange={() => setSolved(true)}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-red-600"
                  value="no"
                  checked={solved === false}
                  onChange={() => setSolved(false)}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">평점을 1~5로 남겨주세요:</label>
            <input
              type="number"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              min="1"
              max="5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">추가 피드백을 남겨주세요:</label>
            <textarea
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              제출
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyModal;
