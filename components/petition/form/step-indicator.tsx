import { ChevronRight } from 'lucide-react';

type Step = {
    id: string;
    title: string;
    icon: React.ReactNode;
};

type StepIndicatorProps = {
    steps: Step[];
    currentStepIndex: number;
};

export function StepIndicator({ steps, currentStepIndex }: StepIndicatorProps) {
    return (
        <div className="flex flex-wrap items-center gap-2 pb-2">
            {steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-2">
                    <div
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                            index <= currentStepIndex
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                        {step.icon}
                        <span className="hidden sm:inline">{step.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                </div>
            ))}
        </div>
    );
}
