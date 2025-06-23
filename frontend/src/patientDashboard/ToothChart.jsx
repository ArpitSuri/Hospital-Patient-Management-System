import React, { useState } from 'react';

const ToothChart = ({ selectedTeeth, setSelectedTeeth }) => {
    const permanentGrid = {
        UL: ['8', '7', '6', '5', '4', '3', '2', '1'],
        UR: ['1', '2', '3', '4', '5', '6', '7', '8'],
        BL: ['8', '7', '6', '5', '4', '3', '2', '1'],
        BR: ['1', '2', '3', '4', '5', '6', '7', '8']
    };

    const milkGrid = {
        UL: ['E', 'D', 'C', 'B', 'A'],
        UR: ['A', 'B', 'C', 'D', 'E'],
        BL: ['E', 'D', 'C', 'B', 'A'],
        BR: ['A', 'B', 'C', 'D', 'E']
    };

    const toggleTooth = (label) => {
        setSelectedTeeth((prev) =>
            prev.includes(label)
                ? prev.filter((t) => t !== label)
                : [...prev, label]
        );
    };

    const renderRow = (grid, type) => (
        <div className="flex justify-center gap-1 mb-2 flex-wrap">
            {grid.UL.map((tooth) => {
                const label = `UL-${tooth}`;
                return (
                    <ToothBox
                        key={label}
                        label={label}
                        active={selectedTeeth.includes(label)}
                        onClick={() => toggleTooth(label)}
                    />
                );
            })}
            <div className="w-4" />
            {grid.UR.map((tooth) => {
                const label = `UR-${tooth}`;
                return (
                    <ToothBox
                        key={label}
                        label={label}
                        active={selectedTeeth.includes(label)}
                        onClick={() => toggleTooth(label)}
                    />
                );
            })}
        </div>
    );

    const renderLowerRow = (grid, type) => (
        <div className="flex justify-center gap-1 flex-wrap">
            {grid.BL.map((tooth) => {
                const label = `BL-${tooth}`;
                return (
                    <ToothBox
                        key={label}
                        label={label}
                        active={selectedTeeth.includes(label)}
                        onClick={() => toggleTooth(label)}
                    />
                );
            })}
            <div className="w-4" />
            {grid.BR.map((tooth) => {
                const label = `BR-${tooth}`;
                return (
                    <ToothBox
                        key={label}
                        label={label}
                        active={selectedTeeth.includes(label)}
                        onClick={() => toggleTooth(label)}
                    />
                );
            })}
        </div>
    );

    return (
        <div className="p-2 border border-purple-200 rounded-md bg-purple-50 mt-4">
            <p className="text-sm font-semibold text-purple-700 mb-2">🧒 Milk Teeth (Deciduous)</p>
            {renderRow(milkGrid, 'milk')}
            {renderLowerRow(milkGrid, 'milk')}

            <p className="text-sm font-semibold text-purple-700 mt-4 mb-2">🦷 Permanent Teeth</p>
            {renderRow(permanentGrid, 'perm')}
            {renderLowerRow(permanentGrid, 'perm')}
        </div>
    );
};

const ToothBox = ({ label, active, onClick }) => (
    <button type='button'
        onClick={onClick}
        className={`w-8 h-8 border text-xs font-medium rounded ${active ? 'bg-purple-600 text-white' : 'bg-white text-gray-800'
            } hover:ring-2 hover:ring-purple-400 transition-all`}
    >
        {label.split('-')[1]}
    </button>
);

export default ToothChart;
