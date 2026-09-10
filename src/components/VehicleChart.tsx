import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { Box, Paper, Typography } from '@mui/material'
import styled from '@emotion/styled'
import en from '../i18n/en.json'
import type { TrafficSummary } from '../types'

interface VehicleChartProps {
  data: TrafficSummary[]
  selectedCountry: string | null
  selectedVehicle: string | null
  formatNumber: (value: number) => string
  onVehicleSelect: (vehicle: string) => void
}

const COLORS = [
  '#2563eb',
  '#7c3aed',
  '#db2777',
  '#ea580c',
  '#059669',
]

const VEHICLE_TYPES = [
  'Car',
  'Truck',
  'Bus',
  'Motorcycle',
  'Van',
]

const ChartPaper = styled(Paper)`
  height: 100%;
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
`

export default function VehicleChart({
  data,
  selectedCountry,
  selectedVehicle,
  formatNumber,
  onVehicleSelect,
}: VehicleChartProps) {
  const sortedVehicleData = [...data].sort(
    (a, b) =>
      VEHICLE_TYPES.indexOf(a.category) -
      VEHICLE_TYPES.indexOf(b.category)
  )

  return (
    <ChartPaper>
      <Typography variant="h5" fontWeight={700}>
        {en.vehicleChart.title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 2 }}
      >
        {selectedCountry
          ? en.vehicleChart.selectedCountry.replace('{country}', selectedCountry)
          : en.vehicleChart.allCountries}
      </Typography>

      <Box sx={{ height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              key={selectedCountry ?? 'all'}
              data={sortedVehicleData}
              dataKey="total"
              nameKey="category"
              innerRadius={86}
              outerRadius={140}
              paddingAngle={3}
              cursor="pointer"
              onClick={(data: any) => {
                const vehicle = data?.payload?.category
                if (vehicle) {
                  // Vehicle selection is handled by the parent via the callback.
                  onVehicleSelect(vehicle)
                }
              }}
            >
              {sortedVehicleData.map((entry, index) => (
                <Cell
                  key={entry.category}
                  fill={
                    entry.category === selectedVehicle
                      ? '#7c3aed'
                      : COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number) => [
                formatNumber(value),
                en.vehicleChart.tooltip,
              ]}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <Typography
        variant="caption"
        color="text.secondary"
      >
        {en.vehicleChart.hint}
      </Typography>
    </ChartPaper>
  )
}
