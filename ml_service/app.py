# app.py - Flask API for Multi-Property ML Prediction
from flask import Flask, request, jsonify
from flask_cors import CORS
from multi_property_predictor import MultiPropertyPredictor
import traceback

app = Flask(__name__)
CORS(app)

# Initialize predictor
predictor = MultiPropertyPredictor()

try:
    predictor.load_models('ml_models')
    print("✅ All models loaded successfully!")
except Exception as e:
    print(f"⚠️ Warning: Could not load models - {e}")
    print("Please train models first by running: python multi_property_predictor.py")

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'running',
        'models_loaded': {
            'house': predictor.models['house'] is not None,
            'flat': predictor.models['flat'] is not None,
            'plot': predictor.models['plot'] is not None
        }
    })

@app.route('/api/predict-price', methods=['POST'])
def predict_price():
    """Predict property price"""
    try:
        data = request.json
        property_type = data.get('propertyType', '').lower()
        
        if property_type not in ['house', 'flat', 'plot']:
            return jsonify({
                'success': False,
                'message': 'Property type must be house, flat, or plot'
            }), 400
        
        # Predict price
        predicted_price = predictor.predict_price(property_type, data)
        
        # Calculate price per sqft
        if property_type == 'house':
            size = data.get('built_up_area_sqft', 1200)
        elif property_type == 'flat':
            size = data.get('flat_size_sqft', 1000)
        else:  # plot
            size = data.get('plot_size_sqft', 1500)
        
        price_per_sqft = predicted_price / size if size > 0 else 0
        
        return jsonify({
            'success': True,
            'data': {
                'predictedPrice': predicted_price,
                'pricePerSqft': price_per_sqft,
                'propertyType': property_type,
                'area': data.get('area', '')
            }
        })
        
    except Exception as e:
        print(f"Error in predict_price: {str(e)}")
        traceback.print_exc()
        return jsonify({
            'success': False,
            'message': f'Prediction failed: {str(e)}'
        }), 500

@app.route('/api/calculate-investment', methods=['POST'])
def calculate_investment():
    """Calculate investment benefit and ROI"""
    try:
        data = request.json
        property_type = data.get('propertyType', '').lower()
        
        if property_type not in ['house', 'flat', 'plot']:
            return jsonify({
                'success': False,
                'message': 'Property type must be house, flat, or plot'
            }), 400
        
        # Get current price prediction
        predicted_price = predictor.predict_price(property_type, data)
        
        # Calculate investment benefit
        years = int(data.get('investmentYears', 5))
        monthly_rent = float(data.get('monthlyRent', 0))
        area = data.get('area', '')
        
        investment_analysis = predictor.calculate_investment_benefit(
            property_type=property_type,
            purchase_price=predicted_price,
            years=years,
            monthly_rent=monthly_rent,
            area=area
        )
        
        return jsonify({
            'success': True,
            'data': investment_analysis
        })
        
    except Exception as e:
        print(f"Error in calculate_investment: {str(e)}")
        traceback.print_exc()
        return jsonify({
            'success': False,
            'message': f'Investment calculation failed: {str(e)}'
        }), 500

@app.route('/api/future-price', methods=['POST'])
def predict_future_price():
    """Predict future price"""
    try:
        data = request.json
        property_type = data.get('propertyType', '').lower()
        
        # Get current price
        current_price = predictor.predict_price(property_type, data)
        
        # Calculate future value
        years = int(data.get('years', 5))
        area = data.get('area', '')
        
        future_data = predictor.calculate_future_value(
            property_type=property_type,
            current_price=current_price,
            years=years,
            area=area
        )
        
        return jsonify({
            'success': True,
            'data': {
                'current_price': current_price,
                **future_data,
                'years': years
            }
        })
        
    except Exception as e:
        print(f"Error in predict_future_price: {str(e)}")
        traceback.print_exc()
        return jsonify({
            'success': False,
            'message': f'Future price prediction failed: {str(e)}'
        }), 500

@app.route('/api/available-areas', methods=['GET'])
def get_available_areas():
    """Get list of all available areas"""
    try:
        if 'area' in predictor.encoders:
            areas = predictor.encoders['area'].classes_.tolist()
            return jsonify({
                'success': True,
                'data': {'areas': areas}
            })
        else:
            return jsonify({
                'success': True,
                'data': {
                    'areas': ['Vaishali Nagar', 'Malviya Nagar', 'C-Scheme', 'Mansarovar']
                }
            })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/property-types', methods=['GET'])
def get_property_types():
    """Get available property types"""
    return jsonify({
        'success': True,
        'data': {
            'propertyTypes': [
                {'value': 'house', 'label': 'House'},
                {'value': 'flat', 'label': 'Flat'},
                {'value': 'plot', 'label': 'Plot'}
            ]
        }
    })

if __name__ == '__main__':
    print("=" * 70)
    print("MULTI-PROPERTY ML PRICE PREDICTION API")
    print("=" * 70)
    print("Server running on http://localhost:5000")
    print("\nAvailable endpoints:")
    print("  POST /api/predict-price - Predict current price")
    print("  POST /api/calculate-investment - Calculate ROI and benefits")
    print("  POST /api/future-price - Predict future price")
    print("  GET  /api/available-areas - Get all areas")
    print("  GET  /api/property-types - Get property types")
    print("=" * 70)
    
    app.run(debug=True, host='0.0.0.0', port=5000)