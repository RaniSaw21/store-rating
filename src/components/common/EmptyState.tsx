import { Package } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Package className="mb-4 h-16 w-16 text-gray-300" />
      <h3 className="mb-2 text-lg font-medium text-gray-900">{title}</h3>
      {description && <p className="mb-4 text-center text-gray-500">{description}</p>}
      {action}
    </div>
  );
}
