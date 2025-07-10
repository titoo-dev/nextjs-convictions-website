"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type CategoryFilter = {
    id: string;
    label: string;
    value: string;
};

const categories: CategoryFilter[] = [
    { id: "all", label: "Toutes", value: "ALL" },
    { id: "environment", label: "Environnement", value: "ENVIRONMENT" },
    { id: "social", label: "Social", value: "SOCIAL" },
    { id: "politics", label: "Politique", value: "POLITICS" },
    { id: "education", label: "Éducation", value: "EDUCATION" },
    { id: "health", label: "Santé", value: "HEALTH" },
    { id: "economy", label: "Économie", value: "ECONOMY" },
    { id: "rights", label: "Droits", value: "RIGHTS" },
];

type FilterChipProps = {
    category: CategoryFilter;
    isActive: boolean;
    onClick: (value: string) => void;
};

function FilterChip({ category, isActive, onClick }: FilterChipProps) {
    return (
        <button
            onClick={() => onClick(category.value)}
            className={cn(
            "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium",
            "border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "min-w-0 whitespace-nowrap",
            isActive
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent"
            )}
            type="button"
        >
            {category.label}
        </button>
    );
}

export function FilterSection() {
    const [activeCategory, setActiveCategory] = useState<string>("ALL");

    const handleCategoryChange = (value: string) => {
        setActiveCategory(value);
        // TODO: Implement actual filtering logic here
        // This could involve updating URL params or calling a filtering function
    };

    return (
        <div className="mb-8">
            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                    {categories.map((category) => (
                        <FilterChip
                            key={category.id}
                            category={category}
                            isActive={activeCategory === category.value}
                            onClick={handleCategoryChange}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}