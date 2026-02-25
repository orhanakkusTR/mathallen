import requests
import sys
from datetime import datetime

class MathallenAPITester:
    def __init__(self, base_url="https://stormarknad-malmo.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if not endpoint.startswith('http') else endpoint
        test_headers = {'Content-Type': 'application/json'}
        
        if headers:
            test_headers.update(headers)
            
        if self.token and 'Authorization' not in test_headers:
            test_headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                self.test_results.append(f"✅ {name}: PASSED")
                try:
                    return success, response.json() if response.text else {}
                except:
                    return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if response.text:
                    print(f"   Response: {response.text}")
                self.test_results.append(f"❌ {name}: FAILED (Expected {expected_status}, got {response.status_code})")
                return False, {}

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            self.test_results.append(f"❌ {name}: NETWORK ERROR - {str(e)}")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append(f"❌ {name}: ERROR - {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "", 200)

    def test_admin_setup(self):
        """Test admin setup - might fail if already exists"""
        success, response = self.run_test("Admin Setup", "POST", "setup/admin", 200)
        if not success:
            # If admin already exists, that's fine
            print("   Note: Admin might already exist, continuing...")
        return True, {}

    def test_admin_login(self, username="admin", password="mathallen2024"):
        """Test admin login and get token"""
        success, response = self.run_test(
            "Admin Login",
            "POST", 
            "auth/login",
            200,
            data={"username": username, "password": password}
        )
        if success and 'access_token' in response:
            self.token = response['access_token']
            print(f"   🔑 Token acquired: {self.token[:20]}...")
            return True, response
        return False, {}

    def test_auth_me(self):
        """Test getting current admin user"""
        if not self.token:
            print("❌ No token available for /auth/me test")
            return False, {}
        return self.run_test("Get Current User", "GET", "auth/me", 200)

    def test_get_offers(self):
        """Test getting offers"""
        return self.run_test("Get All Offers", "GET", "offers", 200)

    def test_get_current_offers(self):
        """Test getting current week offers"""
        return self.run_test("Get Current Week Offers", "GET", "offers/current", 200)

    def test_create_offer(self):
        """Test creating a new offer"""
        if not self.token:
            print("❌ No token available for offer creation")
            return False, {}
            
        offer_data = {
            "product_name": "Test Produkt",
            "offer_price": 49.99,
            "original_price": 69.99,
            "unit": "st",
            "category": "Dagligvaror",
            "week_number": 1,
            "year": 2024,
            "is_active": True
        }
        
        success, response = self.run_test(
            "Create Offer",
            "POST",
            "offers", 
            200,
            data=offer_data
        )
        return success, response

    def test_get_categories(self):
        """Test getting categories"""
        return self.run_test("Get Categories", "GET", "categories", 200)

    def test_contact_form(self):
        """Test contact form submission"""
        contact_data = {
            "name": "Test Användare",
            "email": "test@example.com",
            "phone": "070-123 45 67",
            "message": "Detta är ett testmeddelande från automatiska tester."
        }
        
        return self.run_test(
            "Contact Form Submission",
            "POST",
            "contact",
            200,
            data=contact_data
        )

    def test_get_contact_messages(self):
        """Test getting contact messages (admin only)"""
        if not self.token:
            print("❌ No token available for contact messages test")
            return False, {}
        return self.run_test("Get Contact Messages", "GET", "contact/messages", 200)

    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("🧪 MATHALLEN API TEST SUMMARY")
        print("="*60)
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%" if self.tests_run > 0 else "0%")
        print("\nDetailed Results:")
        for result in self.test_results:
            print(f"  {result}")
        print("="*60)

def main():
    print("🚀 Starting Mathallen Malmö API Tests...")
    print("="*60)
    
    # Initialize tester with public URL
    tester = MathallenAPITester()
    
    # Test sequence
    print("\n📋 Phase 1: Basic API Tests")
    tester.test_root_endpoint()
    
    print("\n📋 Phase 2: Admin Setup & Authentication")
    tester.test_admin_setup()
    success, _ = tester.test_admin_login()
    
    if success:
        tester.test_auth_me()
    
    print("\n📋 Phase 3: Offers Management")
    tester.test_get_offers()
    tester.test_get_current_offers()
    
    if tester.token:
        tester.test_create_offer()
    
    print("\n📋 Phase 4: Categories & Contact")
    tester.test_get_categories()
    tester.test_contact_form()
    
    if tester.token:
        tester.test_get_contact_messages()
    
    # Print final summary
    tester.print_summary()
    
    # Return appropriate exit code
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())