import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  MapPin,
  Home,
  DollarSign,
  Activity,
  Info,
  Loader,
  Building2,
  Calculator,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from "recharts";

const ML_API_URL = "http://localhost:5000/api";

const MLPropertyCalculator = () => {
  const [propertyType, setPropertyType] = useState("house");
  const [areas, setAreas] = useState([]);
  const [inputs, setInputs] = useState({
    area: "",
    investmentYears: 5,
    monthlyRent: 0,
  });

  const [houseInputs, setHouseInputs] = useState({
    distance_to_city_center_km: 5,
    plot_size_sqft: 1500,
    built_up_area_sqft: 1200,
    bhk: 2,
    bathrooms: 2,
    floors: 1,
    parking_spaces: 1,
    age_of_property_years: 5,
    facing_direction: "North",
    furnishing_status: "Unfurnished",
    near_school: false,
    near_hospital: false,
    near_metro: false,
    zone_type: "Residential",
    avg_price_last_6_months: 0,
  });

  const [flatInputs, setFlatInputs] = useState({
    distance_to_city_center_km: 5,
    flat_size_sqft: 1000,
    bhk: 2,
    bathrooms: 2,
    floor_number: 3,
    total_floors: 10,
    age_of_property_years: 5,
    furnishing_status: "Unfurnished",
    near_school: false,
    near_hospital: false,
    near_metro: false,
    zone_type: "Residential",
    avg_price_last_6_months: 0,
  });

  const [plotInputs, setPlotInputs] = useState({
    distance_to_city_center_km: 5,
    plot_size_sqft: 1500,
    road_width_ft: 20,
    near_school: false,
    near_hospital: false,
    zone_type: "Residential",
    has_water_supply: true,
    has_electricity: true,
    avg_price_last_6_months: 0,
  });

  const [prediction, setPrediction] = useState(null);
  const [investmentAnalysis, setInvestmentAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const res = await fetch(`${ML_API_URL}/available-areas`).then((r) =>
        r.json(),
      );
      if (res.success && res.data.areas.length > 0) {
        setAreas(res.data.areas);
        setInputs((prev) => ({ ...prev, area: res.data.areas[0] }));
      }
    } catch (err) {
      setAreas(["Vaishali Nagar", "Malviya Nagar", "C-Scheme", "Mansarovar"]);
      setInputs((prev) => ({ ...prev, area: "Vaishali Nagar" }));
    }
  };

  const getCurrentInputs = () => {
    if (propertyType === "house") return houseInputs;
    if (propertyType === "flat") return flatInputs;
    return plotInputs;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    if (propertyType === "house") {
      setHouseInputs((prev) => ({ ...prev, [name]: val }));
    } else if (propertyType === "flat") {
      setFlatInputs((prev) => ({ ...prev, [name]: val }));
    } else {
      setPlotInputs((prev) => ({ ...prev, [name]: val }));
    }
  };

  const handleCalculate = async () => {
    if (!inputs.area) {
      setError("Please select an area");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const currentInputs = getCurrentInputs();
      const payload = {
        ...currentInputs,
        ...inputs,
        propertyType: propertyType,
      };

      const [priceRes, investmentRes] = await Promise.all([
        fetch(`${ML_API_URL}/predict-price`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).then((r) => r.json()),
        fetch(`${ML_API_URL}/calculate-investment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).then((r) => r.json()),
      ]);

      if (priceRes.success) setPrediction(priceRes.data);
      if (investmentRes.success) setInvestmentAnalysis(investmentRes.data);
    } catch (err) {
      setError(
        "Failed to get prediction. Make sure ML server is running on port 5000.",
      );
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 mb-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Activity size={40} />
            <div>
              <h1 className="text-3xl font-bold">
                AI Property Investment Calculator
              </h1>
              <p className="text-indigo-100 mt-2">
                Predict prices, analyze ROI, and visualize investment benefits
                with ML
              </p>
            </div>
          </div>
        </div>

        {/* Property Type Selector */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex gap-3 flex-wrap">
            {[
              { value: "house", label: "House", icon: Home },
              { value: "flat", label: "Flat", icon: Building2 },
              { value: "plot", label: "Plot", icon: MapPin },
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => setPropertyType(type.value)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                  propertyType === type.value
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <type.icon size={20} />
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Property Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Area
                </label>
                <select
                  value={inputs.area}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, area: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {propertyType === "house" && (
                <>
                  <InputField
                    label="Distance to City Center (km)"
                    name="distance_to_city_center_km"
                    value={houseInputs.distance_to_city_center_km}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <InputField
                    label="Plot Size (sqft)"
                    name="plot_size_sqft"
                    value={houseInputs.plot_size_sqft}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <InputField
                    label="Built-up Area (sqft)"
                    name="built_up_area_sqft"
                    value={houseInputs.built_up_area_sqft}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <InputField
                    label="BHK"
                    name="bhk"
                    value={houseInputs.bhk}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <InputField
                    label="Bathrooms"
                    name="bathrooms"
                    value={houseInputs.bathrooms}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <InputField
                    label="Floors"
                    name="floors"
                    value={houseInputs.floors}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <InputField
                    label="Parking Spaces"
                    name="parking_spaces"
                    value={houseInputs.parking_spaces}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <InputField
                    label="Age (years)"
                    name="age_of_property_years"
                    value={houseInputs.age_of_property_years}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <SelectField
                    label="Facing Direction"
                    name="facing_direction"
                    value={houseInputs.facing_direction}
                    onChange={handleInputChange}
                    options={["North", "South", "East", "West"]}
                  />
                  <SelectField
                    label="Furnishing"
                    name="furnishing_status"
                    value={houseInputs.furnishing_status}
                    onChange={handleInputChange}
                    options={["Furnished", "Semi-Furnished", "Unfurnished"]}
                  />
                  <CheckboxField
                    label="Near School"
                    name="near_school"
                    checked={houseInputs.near_school}
                    onChange={handleInputChange}
                  />
                  <CheckboxField
                    label="Near Hospital"
                    name="near_hospital"
                    checked={houseInputs.near_hospital}
                    onChange={handleInputChange}
                  />
                  <CheckboxField
                    label="Near Metro"
                    name="near_metro"
                    checked={houseInputs.near_metro}
                    onChange={handleInputChange}
                  />
                  <SelectField
                    label="Zone Type"
                    name="zone_type"
                    value={houseInputs.zone_type}
                    onChange={handleInputChange}
                    options={["Residential", "Commercial", "Mixed"]}
                  />
                </>
              )}

              {propertyType === "flat" && (
                <>
                  <InputField
                    label="Distance to City Center (km)"
                    name="distance_to_city_center_km"
                    value={flatInputs.distance_to_city_center_km}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <InputField
                    label="Flat Size (sqft)"
                    name="flat_size_sqft"
                    value={flatInputs.flat_size_sqft}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <InputField
                    label="BHK"
                    name="bhk"
                    value={flatInputs.bhk}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <InputField
                    label="Bathrooms"
                    name="bathrooms"
                    value={flatInputs.bathrooms}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <InputField
                    label="Floor Number"
                    name="floor_number"
                    value={flatInputs.floor_number}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <InputField
                    label="Total Floors"
                    name="total_floors"
                    value={flatInputs.total_floors}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <InputField
                    label="Age (years)"
                    name="age_of_property_years"
                    value={flatInputs.age_of_property_years}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <SelectField
                    label="Furnishing"
                    name="furnishing_status"
                    value={flatInputs.furnishing_status}
                    onChange={handleInputChange}
                    options={["Furnished", "Semi-Furnished", "Unfurnished"]}
                  />
                  <CheckboxField
                    label="Near School"
                    name="near_school"
                    checked={flatInputs.near_school}
                    onChange={handleInputChange}
                  />
                  <CheckboxField
                    label="Near Hospital"
                    name="near_hospital"
                    checked={flatInputs.near_hospital}
                    onChange={handleInputChange}
                  />
                  <CheckboxField
                    label="Near Metro"
                    name="near_metro"
                    checked={flatInputs.near_metro}
                    onChange={handleInputChange}
                  />
                  <SelectField
                    label="Zone Type"
                    name="zone_type"
                    value={flatInputs.zone_type}
                    onChange={handleInputChange}
                    options={["Residential", "Commercial", "Mixed"]}
                  />
                </>
              )}

              {propertyType === "plot" && (
                <>
                  <InputField
                    label="Distance to City Center (km)"
                    name="distance_to_city_center_km"
                    value={plotInputs.distance_to_city_center_km}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <InputField
                    label="Plot Size (sqft)"
                    name="plot_size_sqft"
                    value={plotInputs.plot_size_sqft}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <InputField
                    label="Road Width (ft)"
                    name="road_width_ft"
                    value={plotInputs.road_width_ft}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <CheckboxField
                    label="Near School"
                    name="near_school"
                    checked={plotInputs.near_school}
                    onChange={handleInputChange}
                  />
                  <CheckboxField
                    label="Near Hospital"
                    name="near_hospital"
                    checked={plotInputs.near_hospital}
                    onChange={handleInputChange}
                  />
                  <SelectField
                    label="Zone Type"
                    name="zone_type"
                    value={plotInputs.zone_type}
                    onChange={handleInputChange}
                    options={["Residential", "Commercial", "Mixed"]}
                  />
                  <CheckboxField
                    label="Water Supply"
                    name="has_water_supply"
                    checked={plotInputs.has_water_supply}
                    onChange={handleInputChange}
                  />
                  <CheckboxField
                    label="Electricity"
                    name="has_electricity"
                    checked={plotInputs.has_electricity}
                    onChange={handleInputChange}
                  />
                </>
              )}
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Investment Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Investment Period (years)"
                  value={inputs.investmentYears}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      investmentYears: e.target.value,
                    }))
                  }
                  type="number"
                />
                <InputField
                  label="Expected Monthly Rent (₹)"
                  value={inputs.monthlyRent}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      monthlyRent: e.target.value,
                    }))
                  }
                  type="number"
                />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={loading}
              className="w-full mt-6 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:bg-gray-400"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator size={20} />
                  Calculate Investment
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
          </div>

          {prediction && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Price Prediction
              </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-2 border-green-200">
                  <p className="text-sm text-gray-600 mb-1">Predicted Price</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹
                    {prediction.predictedPrice.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Price per sqft</p>
                  <p className="text-xl font-bold text-blue-600">
                    ₹
                    {prediction.pricePerSqft.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {investmentAnalysis && (
          <>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Investment Summary
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard
                  title="Purchase Price"
                  value={`₹${investmentAnalysis.purchase_price.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
                  color="blue"
                />
                <MetricCard
                  title={`Future Value (${inputs.investmentYears}Y)`}
                  value={`₹${investmentAnalysis.future_price.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
                  color="green"
                />
                <MetricCard
                  title="Total Profit"
                  value={`₹${investmentAnalysis.total_profit.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
                  color="purple"
                />
                <MetricCard
                  title="ROI"
                  value={`${investmentAnalysis.roi_percentage.toFixed(2)}%`}
                  color="orange"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Yearly Investment Growth
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={investmentAnalysis.yearly_breakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="year"
                      label={{
                        value: "Year",
                        position: "insideBottom",
                        offset: -5,
                      }}
                    />
                    <YAxis
                      tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
                    />
                    <Tooltip
                      formatter={(v) =>
                        `₹${parseInt(v).toLocaleString("en-IN")}`
                      }
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="property_value"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Property Value"
                    />
                    <Line
                      type="monotone"
                      dataKey="total_gain"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Total Gain"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Income vs Expenses Breakdown
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RePieChart>
                    <Pie
                      data={[
                        {
                          name: "Capital Appreciation",
                          value: investmentAnalysis.capital_appreciation,
                        },
                        {
                          name: "Rental Income",
                          value: investmentAnalysis.total_rental_income,
                        },
                        {
                          name: "Maintenance Cost",
                          value: investmentAnalysis.total_maintenance_cost,
                        },
                        {
                          name: "Property Tax",
                          value: investmentAnalysis.total_property_tax,
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {COLORS.map((color, idx) => (
                        <Cell key={idx} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v) =>
                        `₹${parseInt(v).toLocaleString("en-IN")}`
                      }
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Detailed Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailRow
                  label="Capital Appreciation"
                  value={`₹${investmentAnalysis.capital_appreciation.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
                  positive
                />
                <DetailRow
                  label="Annual Appreciation Rate"
                  value={`${investmentAnalysis.appreciation_rate.toFixed(2)}%`}
                />
                <DetailRow
                  label="Total Rental Income"
                  value={`₹${investmentAnalysis.total_rental_income.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
                  positive
                />
                <DetailRow
                  label="Net Rental Income"
                  value={`₹${investmentAnalysis.net_rental_income.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
                  positive
                />
                <DetailRow
                  label="Maintenance Costs"
                  value={`₹${investmentAnalysis.total_maintenance_cost.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
                  negative
                />
                <DetailRow
                  label="Property Tax"
                  value={`₹${investmentAnalysis.total_property_tax.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
                  negative
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const CheckboxField = ({ label, name, checked, onChange }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    />
    <label className="text-sm font-semibold text-gray-700">{label}</label>
  </div>
);

const MetricCard = ({ title, value, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  };
  return (
    <div className={`${colors[color]} p-4 rounded-lg border-2`}>
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};

const DetailRow = ({ label, value, positive, negative }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-200">
    <span className="text-gray-700 font-medium">{label}</span>
    <span
      className={`font-bold ${positive ? "text-green-600" : negative ? "text-red-600" : "text-gray-900"}`}
    >
      {value}
    </span>
  </div>
);

export default MLPropertyCalculator;
