'use client';

import React, { useEffect, useCallback, useMemo } from 'react';
import { Input } from '../ui/input';

interface Props {
  personnel: Record<string, number>;
  onPersonnelChange: (key: string, value: number) => void;
  startTimes: Record<string, number[]>;
  onStartTimesChange: (dept: string, index: number, value: number) => void;
}

const DepartmentLineEditor: React.FC<Props> = ({
  personnel,
  onPersonnelChange,
  startTimes,
  onStartTimesChange,
}) => {
  const departments = useMemo(() => ['MAS', 'DAS', 'WDA'], []);
  const defaultLines: Record<string, number> = useMemo(() => ({ MAS: 1, DAS: 2, WDA: 2 }), []);

  const initializeLines = useCallback(() => {
    departments.forEach((dept) => {
      for (let i = 0; i < defaultLines[dept]; i++) {
        const key = `${dept}${i + 1}`;
        const defaultPersonnel = dept === 'MAS' ? 33 : dept === 'DAS' ? 8 : 10;
        if (personnel[key] === undefined) {
          onPersonnelChange(key, defaultPersonnel);
        }
        if (!startTimes[dept] || startTimes[dept][i] === undefined) {
          onStartTimesChange(dept, i, 9);
        }
      }
    });
  }, [departments, defaultLines, personnel, startTimes, onPersonnelChange, onStartTimesChange]);

  useEffect(() => {
    initializeLines();
  }, [initializeLines]);

  return (
    <div className="space-y-4">
      {departments.map((dept) => (
        <div key={dept} className="border p-2 rounded">
          <h3 className="font-bold mb-2">{dept}</h3>
          {[...Array(defaultLines[dept])].map((_, i) => {
            const lineKey = `${dept}${i + 1}`;
            return (
              <div key={lineKey} className="flex space-x-4 mb-2">
                <div>
                  <label className="block text-sm">{lineKey} 人数</label>
                  <Input
                    type="number"
                    value={personnel[lineKey] ?? ''}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val)) onPersonnelChange(lineKey, val);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm">{lineKey} 開始時刻</label>
                  <Input
                    type="number"
                    step="0.25"
                    value={startTimes[dept]?.[i] ?? ''}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val)) onStartTimesChange(dept, i, val);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default DepartmentLineEditor;