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
        
@frappe.whitelist()
def create_assessments(request_data):
    request_data = json.loads(request_data)
    if not request_data:
        frappe.throw("No data provided.")

    for assessment_data in request_data:
        doc = frappe.get_doc({
            "doctype": "Assessment",
            "enrolment_reference_number": assessment_data.get("enr_referenceNumber"),
            "skill_code": assessment_data.get("skillCode"),
            "reference_number": assessment_data.get("id_referenceNumber"),
            "training_partner_name":assessment_data.get("trainingPartner_name"),
            "training_partner_code":assessment_data.get("trainingPartner_code"),
            "training_partner_uen": assessment_data.get("trainingPartner_uen"),
            "conferring_institute_name":assessment_data.get("conferring_institute_name"),
            "conferring_institute_code":assessment_data.get("conferring_institute_code"),
            "conferring_institute_uen":assessment_data.get("conferring_institute_uen"),
            "result":assessment_data.get("result"),
            "score":assessment_data.get("score"),
            "grade":assessment_data.get("grade"),
            "course_title": assessment_data.get("course_title"),
            "course_reference_number":assessment_data.get("course_reference_number"),
            "course_run_id":assessment_data.get("course_run_id"),
            "course_start_date":assessment_data.get("course_run_start_date"),
            "course_end_date": assessment_data.get("course_run_end_date"),
            "trainee_id": assessment_data.get("trainee_id"),
            "trainee_id_type": assessment_data.get("trainee_id_type"),
            "trainee_full_name": assessment_data.get("trainee_full_name"),
            "assessment_date":assessment_data.get("assessment_date"),
            
        })
        doc.insert(ignore_permissions=True)
     