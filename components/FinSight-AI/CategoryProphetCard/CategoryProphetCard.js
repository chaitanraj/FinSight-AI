import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';

const CategoryProphetCard = ({ onInsight }) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.id) return;

    const fetchCategoryPredictions = async () => {
      try {
        const res = await fetch('/api/forecast/category', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id })
        });

        if (!res.ok) return;

        const data = await res.json();
        console.log('Category Predictions:', data);

        // Filter by confidence
        const allCategories = Object.entries(data);
        const reliableCategories = allCategories.filter(
          ([_, info]) => info.confidence === 'medium' || info.confidence === 'high'
        );
        const lowConfidenceCategories = allCategories.filter(
          ([_, info]) => info.confidence === 'low'
        );

        // No reliable predictions
        if (reliableCategories.length === 0) {
          onInsight({
            type: 'info',
            message: 'Category predictions are learning your spending patterns. Keep tracking expenses for personalized forecasts.',
            meta: {
              modelType: 'category_prophet',
              isPlaceholder: true,
              categories: data,
              reliableCount: 0,
              totalCount: allCategories.length
            }
          });
          return;
        }

        // Build message
        const categoryNames = reliableCategories
          .slice(0, 2)
          .map(([cat]) => cat)
          .join(', ');
        
        const moreCount = reliableCategories.length - 2;
        const moreSuffix = moreCount > 0 ? ` +${moreCount} more` : '';

        const message = `Reliable predictions for ${reliableCategories.length} ${
          reliableCategories.length === 1 ? 'category' : 'categories'
        }: ${categoryNames}${moreSuffix}.`;

        onInsight({
          type: 'info',
          message: message,
          meta: {
            modelType: 'category_prophet',
            isPlaceholder: false,
            categories: data,
            reliableCategories: reliableCategories,
            lowConfidenceCategories: lowConfidenceCategories,
            reliableCount: reliableCategories.length,
            totalCount: allCategories.length,
            display: `${reliableCategories.length}/${allCategories.length}`
          }
        });

      } catch (err) {
        console.error('Category predictions fetch failed:', err);
      }
    };

    fetchCategoryPredictions();
  }, [user?.id, onInsight]);

  return null;
};

export default CategoryProphetCard;