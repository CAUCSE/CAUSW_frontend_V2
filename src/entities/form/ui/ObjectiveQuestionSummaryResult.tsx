'use client';

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ObjectiveQuestionSummaryResultProps {
  objectiveQuestion: {
    id: string;
    data?: {
      optionText: string;
      selectedCount: number;
    }[];
  };
}

export const ObjectiveQuestionSummaryResult = ({
  objectiveQuestion,
}: ObjectiveQuestionSummaryResultProps) => {
  return (
    <ResponsiveContainer width="100%" height={300} key={objectiveQuestion.id}>
      <BarChart
        layout="vertical"
        data={objectiveQuestion.data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 5,
        }}
        barSize={15}
      >
        <XAxis
          type="number"
          domain={[0, 'dataMax']}
          tickLine={false}
          allowDecimals={false}
        />
        {/* X축: 값의 축 */}
        <YAxis dataKey="optionText" type="category" />
        {/* Y축: 카테고리 */}
        <Tooltip />
        <Legend />
        <Bar dataKey="selectedCount" name="응답 수" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};
