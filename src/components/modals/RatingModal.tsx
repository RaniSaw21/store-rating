import { useState } from 'react';
import { Star } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
  currentRating?: number;
}

export default function RatingModal({ isOpen, onClose, onSubmit, currentRating }: RatingModalProps) {
  const [rating, setRating] = useState(currentRating || 0);
  const [hovered, setHovered] = useState(0);

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating);
      onClose();
      setRating(0);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Rate this store">
      <div className="space-y-4">
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-8 w-8 ${
                  star <= (hovered || rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-gray-600">
          {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select a rating'}
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={rating === 0}>
            Submit Rating
          </Button>
        </div>
      </div>
    </Modal>
  );
}
