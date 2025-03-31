# Copyright (c) 2025, ravi and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import requests
import json

class Assessment(Document):
	pass

def get_assesment_list(filters):
    pass

@frappe.whitelist()
def get_assessments(request_data):
    return _get_assessments(request_data)

@frappe.whitelist()
def _get_assessments(request_data):
    """Calls the third-party API and returns the response"""
    try:
        if isinstance(request_data,str):
            request_data = json.loads(request_data)
        url = "https://mock-api.ssg-wsg.sg/tpg/assessments/search"  # Replace with actual API URL
        headers = {
            "Content-Type": "application/json",
            "x-api-version":"v1",
            "accept":"application/json"
        }
        response = requests.post(url, headers=headers, data=json.dumps(request_data))
        
        if response.status_code == 200:
            return response.json()  # Return JSON response
        else:
            frappe.throw(f"API Error: {response.status_code} - {response.text}")

    except Exception as e:
        frappe.log_error(message=frappe.get_traceback(), title="External API Error")
        frappe.throw(f"An error occurred: {str(e)}")
     