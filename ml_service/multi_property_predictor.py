# multi_property_predictor.py
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import mean_absolute_error, r2_score, mean_squared_error
import joblib
import json
from datetime import datetime, timedelta
import os

class MultiPropertyPredictor:
    def __init__(self):
        self.models = {
            'house': None,
            'flat': None,
            'plot': None
        }
        self.scalers = {
            'house': StandardScaler(),
            'flat': StandardScaler(),
            'plot': StandardScaler()
        }
        self.encoders = {}
        self.feature_columns = {}
        
    def load_and_prepare_house_data(self, csv_file):
        """Load and prepare house data"""
        df = pd.read_csv(csv_file)
        df = df.dropna()
        
        # Encode categorical variables
        for col in ['area', 'facing_direction', 'furnishing_status', 'zone_type']:
            if col not in self.encoders:
                self.encoders[col] = LabelEncoder()
            if col in df.columns:
                df[f'{col}_encoded'] = self.encoders[col].fit_transform(df[col].astype(str))
        
        # Convert boolean columns
        for col in ['near_school', 'near_hospital', 'near_metro']:
            if col in df.columns:
                df[col] = df[col].astype(int)
        
        # Feature engineering
        df['price_per_sqft'] = df['price'] / df['built_up_area_sqft']
        df['built_up_ratio'] = df['built_up_area_sqft'] / df['plot_size_sqft']
        
        self.feature_columns['house'] = [
            'area_encoded', 'distance_to_city_center_km', 'plot_size_sqft',
            'built_up_area_sqft', 'bhk', 'bathrooms', 'floors', 'parking_spaces',
            'age_of_property_years', 'facing_direction_encoded', 
            'furnishing_status_encoded', 'near_school', 'near_hospital',
            'near_metro', 'zone_type_encoded', 'avg_price_last_6_months'
        ]
        
        X = df[self.feature_columns['house']]
        y = df['price']
        
        return X, y, df
    
    def load_and_prepare_flat_data(self, csv_file):
        """Load and prepare flat data"""
        df = pd.read_csv(csv_file)
        df = df.dropna()
        
        # Encode categorical variables
        for col in ['area', 'furnishing_status', 'zone_type']:
            if col not in self.encoders:
                self.encoders[col] = LabelEncoder()
            if col in df.columns:
                df[f'{col}_encoded'] = self.encoders[col].fit_transform(df[col].astype(str))
        
        # Convert boolean columns
        for col in ['near_school', 'near_hospital', 'near_metro']:
            if col in df.columns:
                df[col] = df[col].astype(int)
        
        # Feature engineering
        df['price_per_sqft'] = df['price'] / df['flat_size_sqft']
        df['floor_ratio'] = df['floor_number'] / df['total_floors']
        
        self.feature_columns['flat'] = [
            'area_encoded', 'distance_to_city_center_km', 'flat_size_sqft',
            'bhk', 'bathrooms', 'floor_number', 'total_floors',
            'age_of_property_years', 'furnishing_status_encoded',
            'near_school', 'near_hospital', 'near_metro',
            'zone_type_encoded', 'avg_price_last_6_months'
        ]
        
        X = df[self.feature_columns['flat']]
        y = df['price']
        
        return X, y, df
    
    def load_and_prepare_plot_data(self, csv_file):
        """Load and prepare plot data"""
        df = pd.read_csv(csv_file)
        df = df.dropna()
        
        # Encode categorical variables
        for col in ['area', 'zone_type']:
            if col not in self.encoders:
                self.encoders[col] = LabelEncoder()
            if col in df.columns:
                df[f'{col}_encoded'] = self.encoders[col].fit_transform(df[col].astype(str))
        
        # Convert boolean columns
        for col in ['near_school', 'near_hospital', 'has_water_supply', 'has_electricity']:
            if col in df.columns:
                df[col] = df[col].astype(int)
        
        # Feature engineering
        df['price_per_sqft'] = df['price'] / df['plot_size_sqft']
        
        self.feature_columns['plot'] = [
            'area_encoded', 'distance_to_city_center_km', 'plot_size_sqft',
            'road_width_ft', 'near_school', 'near_hospital',
            'zone_type_encoded', 'has_water_supply', 'has_electricity',
            'avg_price_last_6_months'
        ]
        
        X = df[self.feature_columns['plot']]
        y = df['price']
        
        return X, y, df
    
    def train_model(self, property_type, csv_file):
        """Train model for specific property type"""
        print(f"\n{'='*60}")
        print(f"Training {property_type.upper()} Model")
        print('='*60)
        
        # Load data based on property type
        if property_type == 'house':
            X, y, df = self.load_and_prepare_house_data(csv_file)
        elif property_type == 'flat':
            X, y, df = self.load_and_prepare_flat_data(csv_file)
        elif property_type == 'plot':
            X, y, df = self.load_and_prepare_plot_data(csv_file)
        else:
            raise ValueError("Property type must be 'house', 'flat', or 'plot'")
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Scale features
        X_train_scaled = self.scalers[property_type].fit_transform(X_train)
        X_test_scaled = self.scalers[property_type].transform(X_test)
        
        # Train model
        print("Training model...")
        self.models[property_type] = GradientBoostingRegressor(
            n_estimators=200,
            learning_rate=0.1,
            max_depth=5,
            random_state=42
        )
        
        self.models[property_type].fit(X_train_scaled, y_train)
        
        # Evaluate
        y_pred = self.models[property_type].predict(X_test_scaled)
        mae = mean_absolute_error(y_test, y_pred)
        rmse = np.sqrt(mean_squared_error(y_test, y_pred))
        r2 = r2_score(y_test, y_pred)
        
        print(f"\nModel Performance:")
        print(f"Mean Absolute Error: ₹{mae:,.2f}")
        print(f"Root Mean Squared Error: ₹{rmse:,.2f}")
        print(f"R² Score: {r2:.4f}")
        print(f"Average Accuracy: {100 - (mae/y_test.mean())*100:.2f}%")
        
        return {
            'mae': float(mae),
            'rmse': float(rmse),
            'r2': float(r2),
            'accuracy': float(100 - (mae/y_test.mean())*100)
        }
    
    def predict_price(self, property_type, features_dict):
        """Predict property price"""
        if self.models[property_type] is None:
            raise Exception(f"Model for {property_type} not trained")
        
        # Create feature array based on property type
        features = self._prepare_features(property_type, features_dict)
        
        # Scale and predict
        features_scaled = self.scalers[property_type].transform([features])
        predicted_price = self.models[property_type].predict(features_scaled)[0]
        
        return float(predicted_price)
    
    def _prepare_features(self, property_type, features_dict):
        """Prepare features for prediction"""
        # Encode area
        area = features_dict.get('area', '')
        try:
            area_encoded = self.encoders['area'].transform([area])[0]
        except:
            area_encoded = 0
        
        if property_type == 'house':
            # Encode other categorical variables
            facing_encoded = self._encode_safe('facing_direction', features_dict.get('facing_direction', 'North'))
            furnishing_encoded = self._encode_safe('furnishing_status', features_dict.get('furnishing_status', 'Unfurnished'))
            zone_encoded = self._encode_safe('zone_type', features_dict.get('zone_type', 'Residential'))
            
            features = [
                area_encoded,
                features_dict.get('distance_to_city_center_km', 5),
                features_dict.get('plot_size_sqft', 1500),
                features_dict.get('built_up_area_sqft', 1200),
                features_dict.get('bhk', 2),
                features_dict.get('bathrooms', 2),
                features_dict.get('floors', 1),
                features_dict.get('parking_spaces', 1),
                features_dict.get('age_of_property_years', 5),
                facing_encoded,
                furnishing_encoded,
                int(features_dict.get('near_school', False)),
                int(features_dict.get('near_hospital', False)),
                int(features_dict.get('near_metro', False)),
                zone_encoded,
                features_dict.get('avg_price_last_6_months', 0)
            ]
            
        elif property_type == 'flat':
            furnishing_encoded = self._encode_safe('furnishing_status', features_dict.get('furnishing_status', 'Unfurnished'))
            zone_encoded = self._encode_safe('zone_type', features_dict.get('zone_type', 'Residential'))
            
            features = [
                area_encoded,
                features_dict.get('distance_to_city_center_km', 5),
                features_dict.get('flat_size_sqft', 1000),
                features_dict.get('bhk', 2),
                features_dict.get('bathrooms', 2),
                features_dict.get('floor_number', 3),
                features_dict.get('total_floors', 10),
                features_dict.get('age_of_property_years', 5),
                furnishing_encoded,
                int(features_dict.get('near_school', False)),
                int(features_dict.get('near_hospital', False)),
                int(features_dict.get('near_metro', False)),
                zone_encoded,
                features_dict.get('avg_price_last_6_months', 0)
            ]
            
        else:  # plot
            zone_encoded = self._encode_safe('zone_type', features_dict.get('zone_type', 'Residential'))
            
            features = [
                area_encoded,
                features_dict.get('distance_to_city_center_km', 5),
                features_dict.get('plot_size_sqft', 1500),
                features_dict.get('road_width_ft', 20),
                int(features_dict.get('near_school', False)),
                int(features_dict.get('near_hospital', False)),
                zone_encoded,
                int(features_dict.get('has_water_supply', True)),
                int(features_dict.get('has_electricity', True)),
                features_dict.get('avg_price_last_6_months', 0)
            ]
        
        return features
    
    def _encode_safe(self, encoder_name, value):
        """Safely encode categorical value"""
        try:
            return self.encoders[encoder_name].transform([value])[0]
        except:
            return 0
    
    def calculate_future_value(self, property_type, current_price, years, area=None):
        """Calculate future property value with appreciation"""
        # Area-specific appreciation rates (can be learned from historical data)
        appreciation_rates = {
            'Vaishali Nagar': 0.08,
            'Malviya Nagar': 0.07,
            'C-Scheme': 0.09,
            'Mansarovar': 0.065,
            'default': 0.07
        }
        
        rate = appreciation_rates.get(area, appreciation_rates['default'])
        future_price = current_price * ((1 + rate) ** years)
        
        return {
            'future_price': float(future_price),
            'appreciation': float(future_price - current_price),
            'appreciation_rate': float(rate * 100),
            'total_return_percentage': float(((future_price - current_price) / current_price) * 100)
        }
    
    def calculate_investment_benefit(self, property_type, purchase_price, years=5, 
                                    monthly_rent=0, area=None):
        """Calculate complete investment benefit analysis"""
        # Future value
        future_val = self.calculate_future_value(property_type, purchase_price, years, area)
        
        # Rental income calculation
        total_rental_income = monthly_rent * 12 * years if monthly_rent > 0 else 0
        
        # Maintenance costs (approximate)
        annual_maintenance = purchase_price * 0.01  # 1% of property value
        total_maintenance = annual_maintenance * years
        
        # Property tax (approximate)
        annual_tax = purchase_price * 0.005  # 0.5% of property value
        total_tax = annual_tax * years
        
        # Net profit
        capital_appreciation = future_val['appreciation']
        net_rental_income = total_rental_income - total_maintenance - total_tax
        total_profit = capital_appreciation + net_rental_income
        
        # ROI
        roi = (total_profit / purchase_price) * 100
        
        return {
            'purchase_price': float(purchase_price),
            'future_price': float(future_val['future_price']),
            'capital_appreciation': float(capital_appreciation),
            'appreciation_rate': float(future_val['appreciation_rate']),
            'total_rental_income': float(total_rental_income),
            'total_maintenance_cost': float(total_maintenance),
            'total_property_tax': float(total_tax),
            'net_rental_income': float(net_rental_income),
            'total_profit': float(total_profit),
            'roi_percentage': float(roi),
            'yearly_breakdown': self._get_yearly_breakdown(
                purchase_price, years, future_val['appreciation_rate']/100,
                monthly_rent, annual_maintenance, annual_tax
            )
        }
    
    def _get_yearly_breakdown(self, initial_price, years, appreciation_rate,
                             monthly_rent, annual_maintenance, annual_tax):
        """Get year-by-year breakdown"""
        breakdown = []
        current_value = initial_price
        
        for year in range(1, years + 1):
            current_value = current_value * (1 + appreciation_rate)
            annual_rent = monthly_rent * 12
            net_income = annual_rent - annual_maintenance - annual_tax
            
            breakdown.append({
                'year': year,
                'property_value': float(current_value),
                'appreciation': float(current_value - initial_price),
                'rental_income': float(annual_rent),
                'net_income': float(net_income),
                'total_gain': float((current_value - initial_price) + (net_income * year))
            })
        
        return breakdown
    
    def save_models(self, model_dir='ml_models'):
        """Save all trained models"""
        os.makedirs(model_dir, exist_ok=True)
        
        for prop_type in ['house', 'flat', 'plot']:
            if self.models[prop_type] is not None:
                joblib.dump(self.models[prop_type], f'{model_dir}/{prop_type}_model.pkl')
                joblib.dump(self.scalers[prop_type], f'{model_dir}/{prop_type}_scaler.pkl')
        
        # Save encoders
        for name, encoder in self.encoders.items():
            joblib.dump(encoder, f'{model_dir}/{name}_encoder.pkl')
        
        # Save feature columns
        with open(f'{model_dir}/feature_columns.json', 'w') as f:
            json.dump(self.feature_columns, f)
        
        print(f"\n✅ All models saved to {model_dir}/")
    
    def load_models(self, model_dir='ml_models'):
        """Load all trained models"""
        for prop_type in ['house', 'flat', 'plot']:
            try:
                self.models[prop_type] = joblib.load(f'{model_dir}/{prop_type}_model.pkl')
                self.scalers[prop_type] = joblib.load(f'{model_dir}/{prop_type}_scaler.pkl')
            except:
                print(f"Warning: Could not load {prop_type} model")
        
        # Load encoders
        encoder_files = ['area', 'facing_direction', 'furnishing_status', 'zone_type']
        for name in encoder_files:
            try:
                self.encoders[name] = joblib.load(f'{model_dir}/{name}_encoder.pkl')
            except:
                pass
        
        # Load feature columns
        with open(f'{model_dir}/feature_columns.json', 'r') as f:
            self.feature_columns = json.load(f)
        
        print("✅ Models loaded successfully!")


# Training script
if __name__ == "__main__":
    predictor = MultiPropertyPredictor()
    
    print("\n" + "="*60)
    print("MULTI-PROPERTY PRICE PREDICTION SYSTEM")
    print("="*60)
    
    # Train all three models
    # Replace with your actual CSV file paths
    try:
        predictor.train_model('house', 'house_data.csv')
    except Exception as e:
        print(f"Error training house model: {e}")
    
    try:
        predictor.train_model('flat', 'flat_data.csv')
    except Exception as e:
        print(f"Error training flat model: {e}")
    
    try:
        predictor.train_model('plot', 'plot_data.csv')
    except Exception as e:
        print(f"Error training plot model: {e}")
    
    # Save models
    predictor.save_models()
    
    print("\n" + "="*60)
    print("✅ Training Complete!")
    print("="*60)