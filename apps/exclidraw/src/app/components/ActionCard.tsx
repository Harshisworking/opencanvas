import React from 'react';

interface ActionCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    variant?: 'blue' | 'purple'; // Renamed from cyan/purple for clearer light theme intent
    children?: React.ReactNode;
    onClick?: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({
    title,
    description,
    icon,
    variant = 'blue',
    children,
    onClick
}) => {

    const colors = {
        blue: {
            border: 'hover:border-indigo-300',
            shadow: 'hover:shadow-xl hover:shadow-indigo-100',
            iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        },
        purple: {
            border: 'hover:border-fuchsia-300',
            shadow: 'hover:shadow-xl hover:shadow-fuchsia-100',
            iconBg: 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100',
        }
    };

    const theme = colors[variant];

    return (
        <div
            onClick={onClick}
            className={`group relative overflow-hidden rounded-3xl bg-white border border-gray-200 p-10 flex flex-col items-center text-center transition-all duration-300 shadow-sm cursor-pointer ${theme.border} ${theme.shadow}`}
        >
            <div className={`w-20 h-20 mb-6 rounded-full border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${theme.iconBg}`}>
                <div className="w-10 h-10">
                    {icon}
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-500 mb-8 max-w-xs leading-relaxed">{description}</p>

            <div className="w-full flex justify-center" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default ActionCard;