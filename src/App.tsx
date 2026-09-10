import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material'
import styled from '@emotion/styled'
import CountryChart from './components/CountryChart'
import VehicleChart from './components/VehicleChart'
import en from './i18n/en.json'
import type { TrafficSummary } from './types'

const VEHICLE_TYPES = [
  'Car',
  'Truck',
  'Bus',
  'Motorcycle',
  'Van',
]

const AppContainer = styled(Box)`
  min-height: 100vh;
  background: #f8fafc;
  padding: 32px 0 48px;
`

function App() {
  const [countryData, setCountryData] = useState<TrafficSummary[]>([])
  const [vehicleData, setVehicleData] = useState<TrafficSummary[]>([])

  const [selectedYear, setSelectedYear] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const years = useMemo(
    () => Array.from({ length: 11 }, (_, index) => String(2025 - index)),
    []
  )

  const formatNumber = (value: number) =>
    new Intl.NumberFormat('en-US').format(value)

  const total = (data: TrafficSummary[]) =>
    data.reduce((sum, item) => sum + item.total, 0)

  const loadCountryData = async () => {
    const response = await axios.get<TrafficSummary[]>(
      '/api/traffic/summary/country',
      {
        params: {
          year: selectedYear || undefined,
          vehicleType: selectedVehicle || undefined,
        },
      }
    )

    setCountryData(response.data)
  }

  const loadVehicleData = async () => {
    const response = await axios.get<TrafficSummary[]>(
      '/api/traffic/summary/vehicle-type',
      {
        params: {
          year: selectedYear || undefined,
          country: selectedCountry || undefined,
        },
      }
    )

    setVehicleData(response.data)
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)

      try {
        await Promise.all([
          loadCountryData(),
          loadVehicleData(),
        ])
      } catch (err) {
        console.error(err)
        setError(en.states.error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [selectedYear, selectedCountry, selectedVehicle])

  const reset = () => {
    setSelectedYear('')
    setSelectedCountry(null)
    setSelectedVehicle(null)
  }

  return (
    <AppContainer>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 800 }}
          >
            {en.title}
          </Typography>

          <Typography
            sx={{
              color: '#475569',
              mt: 1,
            }}
          >
            {en.subtitle}
          </Typography>
        </Box>

        <Paper
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1.5,
              flexWrap: 'wrap',
            }}
          >
            <FormControl
              size="small"
              sx={{ minWidth: 170 }}
            >
              <InputLabel id="year-label">
                {en.filters.reportingYear}
              </InputLabel>

              <Select
                labelId="year-label"
                value={selectedYear}
                label={en.filters.reportingYear}
                onChange={(event) =>
                  setSelectedYear(event.target.value)
                }
              >
                <MenuItem value="">
                  {en.filters.allAvailableYears}
                </MenuItem>

                {years.map((year) => (
                  <MenuItem
                    key={year}
                    value={year}
                  >
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              size="small"
              sx={{ minWidth: 170 }}
            >
              <InputLabel id="vehicle-label">
                {en.filters.vehicleType}
              </InputLabel>

              <Select
                labelId="vehicle-label"
                value={selectedVehicle ?? ''}
                label={en.filters.vehicleType}
                onChange={(event) =>
                  setSelectedVehicle(event.target.value || null)
                }
              >
                <MenuItem value="">
                  {en.filters.allVehicleTypes}
                </MenuItem>

                {VEHICLE_TYPES.map((vehicle) => (
                  <MenuItem
                    key={vehicle}
                    value={vehicle}
                  >
                    {en.vehicleTypes[vehicle as keyof typeof en.vehicleTypes]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              onClick={reset}
            >
              {en.filters.reset}
            </Button>
          </Box>

          {(selectedYear ||
            selectedCountry ||
            selectedVehicle) && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                mt: 2,
                flexWrap: 'wrap',
              }}
            >
              {selectedYear && (
                <Chip
                  label={en.filters.year.replace('{year}', selectedYear)}
                  onDelete={() => setSelectedYear('')}
                />
              )}

              {selectedCountry && (
                <Chip
                  label={en.filters.country.replace('{country}', selectedCountry)}
                  onDelete={() => setSelectedCountry(null)}
                />
              )}

              {selectedVehicle && (
                <Chip
                  label={en.filters.vehicle.replace('{vehicle}', selectedVehicle)}
                  onDelete={() => setSelectedVehicle(null)}
                />
              )}
            </Box>
          )}
        </Paper>

        {error ? (
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              color: 'error.main',
            }}
          >
            {error}
          </Paper>
        ) : loading ? (
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
            }}
          >
            {en.states.loading}
          </Paper>
        ) : (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, lg: 7 }}>
              <CountryChart
                data={countryData}
                selectedCountry={selectedCountry}
                selectedVehicle={selectedVehicle}
                formatNumber={formatNumber}
                total={total}
                onCountrySelect={setSelectedCountry}
              />
            </Grid>

            <Grid size={{ xs: 12, lg: 5 }}>
              <VehicleChart
                data={vehicleData}
                selectedCountry={selectedCountry}
                selectedVehicle={selectedVehicle}
                formatNumber={formatNumber}
                onVehicleSelect={setSelectedVehicle}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </AppContainer>
  )
}

export default App
