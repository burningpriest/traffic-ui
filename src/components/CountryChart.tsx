import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Box, Paper, Typography } from '@mui/material'
import styled from '@emotion/styled'
import en from '../i18n/en.json'
import type { TrafficSummary } from '../types'

interface CountryChartProps {
  data: TrafficSummary[]
  selectedCountry: string | null
  selectedVehicle: string | null
  formatNumber: (value: number) => string
  total: (data: TrafficSummary[]) => number
  onCountrySelect: (country: string) => void
}

const ChartPaper = styled(Paper)`
  height: 100%;
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
`

export default function CountryChart({
  data,
  selectedCountry,
  selectedVehicle,
  formatNumber,
  total,
  onCountrySelect,
}: CountryChartProps) {
  return (
    <ChartPaper>
      <Typography variant="h5" fontWeight={700}>
        {en.countryChart.title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 2 }}
      >
        {selectedVehicle
          ? en.countryChart.selectedVehicle.replace('{vehicle}', selectedVehicle)
          : en.countryChart.allVehicleTypes}
        {' · '}
        {en.countryChart.countries.replace('{count}', String(data.length))}
        {' · '}
        {en.countryChart.movements.replace(
          '{count}',
          formatNumber(total(data))
        )}
      </Typography>

      <Box
        sx={{
          height: Math.max(390, data.length * 34),
          maxHeight: 620,
          overflowY: 'auto',
        }}
      >
        <ResponsiveContainer
          width="100%"
          height={Math.max(390, data.length * 34)}
        >
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 4,
              right: 28,
              bottom: 4,
              left: 30,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
            />

            <XAxis
              type="number"
              tickFormatter={formatNumber}
            />

            <YAxis
              type="category"
              dataKey="category"
              width={116}
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              formatter={(value: number) => [
                formatNumber(value),
                en.countryChart.tooltip,
              ]}
            />

            <Bar
              dataKey="total"
              name={en.countryChart.tooltip}
              radius={[0, 6, 6, 0]}
              cursor="pointer"
              onClick={(chartData: any) => {
                const country = chartData?.payload?.category
                if (country) {
                  onCountrySelect(country)
                }
              }}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.category}
                  fill={
                    entry.category === selectedCountry
                      ? '#7c3aed'
                      : '#2563eb'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Typography
        variant="caption"
        color="text.secondary"
      >
        {en.countryChart.hint}
      </Typography>
    </ChartPaper>
  )
}
