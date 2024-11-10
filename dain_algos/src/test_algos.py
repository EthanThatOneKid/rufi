import requests
import json

# Define the base URL of the DAIN service
BASE_URL = "http://localhost:2022"

def test_get_stock_price(ticker="AAPL"):
    url = f"{BASE_URL}/get-stock-price"
    payload = {"ticker": ticker}
    response = requests.post(url, json=payload)
    try:
        data = response.json()
        print("\nGet Stock Price:")
        print(json.dumps(data, indent=2))
    except requests.JSONDecodeError:
        print("\nGet Stock Price: Response not in JSON format")
        print("Response Text:", response.text)

def test_get_stock_news(ticker="AAPL", limit=5):
    url = f"{BASE_URL}/get-stock-news"
    payload = {"ticker": ticker, "limit": limit}
    response = requests.post(url, json=payload)
    try:
        data = response.json()
        print("\nGet Stock News:")
        print(json.dumps(data, indent=2))
    except requests.JSONDecodeError:
        print("\nGet Stock News: Response not in JSON format")
        print("Response Text:", response.text)

def test_get_stock_chart(ticker="AAPL", multiplier=1, timespan="day", from_date="2023-01-01", to_date="2023-01-31"):
    url = f"{BASE_URL}/get-stock-chart"
    payload = {
        "ticker": ticker,
        "multiplier": multiplier,
        "timespan": timespan,
        "from": from_date,
        "to": to_date
    }
    response = requests.post(url, json=payload)
    try:
        data = response.json()
        print("\nGet Stock Chart:")
        print(json.dumps(data, indent=2))
    except requests.JSONDecodeError:
        print("\nGet Stock Chart: Response not in JSON format")
        print("Response Text:", response.text)

def test_get_stock_details(ticker="AAPL"):
    url = f"{BASE_URL}/get-stock-details"
    payload = {"ticker": ticker}
    response = requests.post(url, json=payload)
    try:
        data = response.json()
        print("\nGet Stock Details:")
        print(json.dumps(data, indent=2))
    except requests.JSONDecodeError:
        print("\nGet Stock Details: Response not in JSON format")
        print("Response Text:", response.text)

def test_get_stock_dividends(ticker="AAPL", limit=10):
    url = f"{BASE_URL}/get-stock-dividends"
    payload = {"ticker": ticker, "limit": limit}
    response = requests.post(url, json=payload)
    try:
        data = response.json()
        print("\nGet Stock Dividends:")
        print(json.dumps(data, indent=2))
    except requests.JSONDecodeError:
        print("\nGet Stock Dividends: Response not in JSON format")
        print("Response Text:", response.text)

def test_get_stock_splits(ticker="AAPL", limit=5):
    url = f"{BASE_URL}/get-stock-splits"
    payload = {"ticker": ticker, "limit": limit}
    response = requests.post(url, json=payload)
    try:
        data = response.json()
        print("\nGet Stock Splits:")
        print(json.dumps(data, indent=2))
    except requests.JSONDecodeError:
        print("\nGet Stock Splits: Response not in JSON format")
        print("Response Text:", response.text)

# Run all tests for non-algorithm endpoints
def run_all_tests():
    print("Testing Get Stock Price...")
    test_get_stock_price()

    print("Testing Get Stock News...")
    test_get_stock_news()

    print("Testing Get Stock Chart...")
    test_get_stock_chart()

    print("Testing Get Stock Details...")
    test_get_stock_details()

    print("Testing Get Stock Dividends...")
    test_get_stock_dividends()

    print("Testing Get Stock Splits...")
    test_get_stock_splits()

if __name__ == "__main__":
    run_all_tests()
