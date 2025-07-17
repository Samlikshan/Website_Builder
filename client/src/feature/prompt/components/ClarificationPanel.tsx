import React from "react";
import { MessageCircle, HelpCircle } from "lucide-react";

interface ClarificationPanelProps {
  message: string;
  questions: string[];
}

const ClarificationPanel: React.FC<ClarificationPanelProps> = ({
  message,
  questions,
}) => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 shadow-lg">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-100 rounded-lg">
          <MessageCircle className="w-5 h-5 text-amber-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            We need a bit more information
          </h3>
          <p className="text-amber-700 mb-4 leading-relaxed">{message}</p>

          {questions.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-amber-800 text-sm">
                Please consider:
              </h4>
              <ul className="space-y-1">
                {questions.map((question, index) => (
                  <li
                    key={index}
                    className="text-amber-700 text-sm flex items-start gap-2"
                  >
                    <span className="text-amber-500 font-medium">•</span>
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 p-3 bg-amber-100/50 rounded-lg">
            <p className="text-amber-700 text-sm">
              💡 <strong>Tip:</strong> Please update your description above with
              more details and try again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClarificationPanel;
