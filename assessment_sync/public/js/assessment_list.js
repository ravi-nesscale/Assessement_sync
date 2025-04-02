// Define the settings for the Assessment Listview
frappe.listview_settings["Assessment"] = {
    // Add a custom button "Search and Sync" to the Listview
    onload: function (listview) {
        listview.page.add_inner_button(__("Search and Sync"), function () {
            assessment_sync_dialog();  // Open the sync dialog when the button is clicked
        });
    },
};

// Function to create the sync dialog for fetching and importing assessment data
function assessment_sync_dialog() {
    let dialog = new frappe.ui.Dialog({
        title: 'API Request',
        fields: [
            // Pagination Section
            {
                fieldname: 'pagination_section', fieldtype: 'Section Break', label: 'Pagination'
            },
            { fieldname: 'page', fieldtype: 'Int', label: 'Page', default: 1, reqd: 1 },
            { fieldname: 'pagination_column', fieldtype: 'Column Break' },
            { fieldname: 'pageSize', fieldtype: 'Int', label: 'Page Size', default: 20, reqd: 1 },

            // Metadata Section (Optional)
            {
                fieldname: 'metadata_section', fieldtype: 'Section Break', label: 'Metadata (Optional)', collapsible: 1, collapsed: 1
            },
            { fieldname: 'lastUpdateDateFrom', fieldtype: 'Date', label: 'Last Update Date From', default: frappe.datetime.get_today() },
            { fieldname: 'col_break_4', fieldtype: 'Column Break' },
            { fieldname: 'lastUpdateDateTo', fieldtype: 'Date', label: 'Last Update Date To', default: frappe.datetime.get_today() },

            // Sorting Section (Optional)
            {
                fieldname: 'sort_section', fieldtype: 'Section Break', label: 'Sorting (Optional)', collapsible: 1, collapsed: 1
            },
            { fieldname: 'sortField', fieldtype: 'Data', label: 'Sort Field', default: 'updatedOn' },
            { fieldname: 'col_break_3', fieldtype: 'Column Break' },
            { fieldname: 'sortOrder', fieldtype: 'Select', label: 'Sort Order', options: ['asc', 'desc'], default: 'asc' },

            // Assessment Details Section (Optional)
            {
                fieldname: 'assessment_section', fieldtype: 'Section Break', label: 'Assessment Details (Optional)', collapsible: 1, collapsed: 1
            },
            { fieldname: 'courseRunId', fieldtype: 'Data', label: 'Course Run ID' },
            { fieldname: 'courseReferenceNumber', fieldtype: 'Data', label: 'Course Reference Number' },
            { fieldname: 'col_break_1', fieldtype: 'Column Break' },
            { fieldname: 'traineeId', fieldtype: 'Data', label: 'Trainee ID' },
            { fieldname: 'enrolmentReferenceNumber', fieldtype: 'Data', label: 'Enrolment Reference Number' },
            { fieldname: 'col_break_2', fieldtype: 'Column Break' },
            { fieldname: 'skillCode', fieldtype: 'Data', label: 'Skill Code' },
            { fieldname: 'trainingPartnerCode', fieldtype: 'Data', label: 'Training Partner Code' },

            // Assessment Details Section (Mandatory)
            {
                fieldname: 'assessment_section_mand', fieldtype: 'Section Break', label: 'Assessment Details (Mandatory)'
            },
            { fieldname: 'trainingPartnerUEN', fieldtype: 'Data', label: 'Training Partner UEN', reqd: 1 },

            // Results Section
            {
                fieldname: "results_section", fieldtype: "Section Break", label: "Results"
            },
            {
                fieldname: "assessment_results",  // Define a Table field for displaying results
                fieldtype: "Table",
                label: "Assessment Results",
                cannot_add_rows: true,
                cannot_delete_rows: true,
                in_place_edit: false,
                fields: [
                    { fieldname: "id", fieldtype: "Data", label: "ID", read_only: 1, in_list_view: 1 },
                    { fieldname: "id_referenceNumber", fieldtype: "Data", label: "ID Reference Number", read_only: 1, in_list_view: 1 },
                    { fieldname: "enr_referenceNumber", fieldtype: "Data", label: "ENR Reference Number", read_only: 1, in_list_view: 1 },
                    { fieldname: "skillCode", fieldtype: "Data", label: "Skill Code", read_only: 1, in_list_view: 1 },
                    { fieldname: "trainingPartner_name", fieldtype: "Data", label: "Training Partner Name", read_only: 1, in_list_view: 1 },
                    { fieldname: "trainingPartner_code", fieldtype: "Data", label: "Training Partner Code", read_only: 1, in_list_view: 1 },
                    { fieldname: "trainingPartner_uen", fieldtype: "Data", label: "Training Partner Uen", read_only: 1, in_list_view: 1 },
                    // { fieldname: "enrolment_referenceNumber", fieldtype: "Data", label: "Enrolment ReferenceNumber", read_only: 1, in_list_view: 1 },
                    { fieldname: "result", fieldtype: "Data", label: "Result", read_only: 1, in_list_view: 1 },
                    { fieldname: "score", fieldtype: "Data", label: "Score", read_only: 1, in_list_view: 1 },
                    { fieldname: "grade", fieldtype: "Data", label: "Grade", read_only: 1, in_list_view: 1 },
                    { fieldname: "assessment_date", fieldtype: "Data", label: "Assessment Date", read_only: 1, in_list_view: 1 },
                    { fieldname: "conferring_institute_uen", fieldtype: "Data", label: "Conferring Institute UEN", read_only: 1, in_list_view: 1 },
                    { fieldname: "conferring_institute_code", fieldtype: "Data", label: "Conferring Institute Code", read_only: 1, in_list_view: 1 },
                    { fieldname: "conferring_institute_name", fieldtype: "Data", label: "Conferring Institute Name", read_only: 1, in_list_view: 1 },

                    { fieldname: "trainee_id", fieldtype: "Data", label: "Trainee ID", read_only: 1, in_list_view: 1 },
                    { fieldname: "trainee_id_type", fieldtype: "Data", label: "Trainee ID Type", read_only: 1, in_list_view: 1 },
                    { fieldname: "trainee_full_name", fieldtype: "Data", label: "Trainee Full Name", read_only: 1, in_list_view: 1 },

                    { fieldname: "course_run_id", fieldtype: "Data", label: "Course Run ID", read_only: 1, in_list_view: 1 },
                    { fieldname: "course_run_start_date", fieldtype: "Data", label: "Course Run Start Date", read_only: 1, in_list_view: 1 },
                    { fieldname: "course_run_end_date", fieldtype: "Data", label: "Course Run End Date", read_only: 1, in_list_view: 1 },
                    { fieldname: "course_title", fieldtype: "Data", label: "Course Title", read_only: 1, in_list_view: 1 },
                    { fieldname: "course_reference_number", fieldtype: "Data", label: "Course Reference Number", read_only: 1, in_list_view: 1 },
                    
                ]
            }
        ],
        primary_action_label: 'Search',  // Define the "Search" button action
        primary_action(values) {
            let requestData = {
                // Prepare the request data based on user inputs
                meta: {
                    lastUpdateDateFrom: values.lastUpdateDateFrom,
                    lastUpdateDateTo: values.lastUpdateDateTo
                },
                sortBy: {
                    field: values.sortField,
                    order: values.sortOrder
                },
                parameters: {
                    page: values.page,
                    pageSize: values.pageSize
                },
                assessments: {
                    course: {
                        run: { id: values.courseRunId },
                        referenceNumber: values.courseReferenceNumber
                    },
                    trainee: { id: values.traineeId },
                    enrolment: { referenceNumber: values.enrolmentReferenceNumber },
                    skillCode: values.skillCode,
                    trainingPartner: {
                        uen: values.trainingPartnerUEN,
                        code: values.trainingPartnerCode
                    }
                }
            };

            // API call to fetch assessment data
            frappe.call({
                method: "assessment_sync.assessment_sync.doctype.assessment.assessment.get_assessments",
                args: { "request_data": requestData },
                freeze: true,
                freeze_message: "Fetching Data...",
                callback: function (r) {
                    // If data is returned, populate the table field
                    if (r.message && r.message.data && Array.isArray(r.message.data)) {
                        let table_data = r.message.data.map(item => ({
                            id: item.referenceNumber || "",

                            enr_referenceNumber: item.enrolment?.referenceNumber || "",
                            skillCode: item.skillCode || "",
                            trainingPartner_name: item.trainingPartner?.name || "",
                            trainingPartner_code: item.trainingPartner?.code || "",
                            trainingPartner_uen: item.trainingPartner?.uen || "",
                            conferring_institute_name: item.conferringInstitute?.name || "",
                            conferring_institute_code: item.conferringInstitute?.code || "",
                            conferring_institute_uen: item.conferringInstitute?.uen || "",

                            trainee_id: item.trainee?.id || "",
                            trainee_id_type: item.trainee?.idType?.type || "",  
                            trainee_full_name: item.trainee?.fullName || "",

                            course_title: item.course?.title || "",
                            course_reference_number: item.course?.referenceNumber || "",
                            course_run_id: item.course?.run?.id|| "",
                            course_run_start_date: item.course?.run?.startDate|| "",
                            course_run_end_date: item.course?.run?.endDate|| "",
                            grade: item.grade || "",
                            result: item.result || "",
                            score: item.score || "",
                            score: item.score || "",
                            id_referenceNumber: item.referenceNumber || "",
                            assessment_date: item.assessmentDate || "",

                            selected: 0  // Adding checkbox field to select rows
                        }));

                        let table_field = dialog.fields_dict["assessment_results"].grid;
                        table_field.df.data = table_data;
                        table_field.refresh();
                    } else {
                        frappe.msgprint("No data found.");
                    }
                }
            });
        }
    });

    // Add custom buttons to the dialog for importing selected/all data
    let modal_footer = dialog.$wrapper.find('.modal-footer');
    let selected_import_button = $('<button class="btn btn-primary">Selected Data Import</button>');
    let all_import_button = $('<button class="btn btn-secondary ml-2">All Data Import</button>');

    // Append the import buttons to the modal footer
    modal_footer.append(selected_import_button);
    modal_footer.append(all_import_button);

    // Action for selected data import button
    selected_import_button.on('click', function () {
        let table_field = dialog.fields_dict["assessment_results"].grid;
        let selected_rows = table_field.get_selected_children();

        // Ensure at least one row is selected for import
        if (selected_rows.length === 0) {
            frappe.msgprint("Please select at least one row to import.");
            return;
        }

        let selected_data = selected_rows.map(row => ({
            id: row.id,
            id_referenceNumber: row.id_referenceNumber,
            enr_referenceNumber: row.enr_referenceNumber,
            skillCode: row.skillCode,
            trainingPartner_name: row.trainingPartner_name,
            trainingPartner_code: row.trainingPartner_code,
            trainingPartner_uen: row.trainingPartner_uen,
            trainee_id: row.trainee_id,
            trainee_id_type: row.trainee_id_type,
            trainee_full_name: row.trainee_full_name,
            conferring_institute_name: row.conferring_institute_name,
            conferring_institute_code: row.conferring_institute_code,
            conferring_institute_uen: row.conferring_institute_uen,
            score:row.score,

            course_title: row.course_title,
            course_reference_number: row.course_reference_number,
            course_run_id:row.course_run_id,
            course_run_start_date: row.course_run_start_date,
            course_run_end_date: row.course_run_end_date,

            result:row.result,
            assessment_date:row.assessment_date,
            grade: row.grade,
            // enrolment_referenceNumber:row.enrolment_referenceNumber
            

        }));

        creating_assessments(selected_data);  // Call the function to create assessments
    });

    // Action for all data import button
    all_import_button.on('click', function () {
        let table_field = dialog.fields_dict["assessment_results"].grid.data;

        // Ensure there is data available to import
        if (table_field.length === 0) {
            frappe.msgprint("No data available to import.");
            return;
        }

        let all_data = table_field.map(row => ({
            id: row.id,
            id_referenceNumber: row.id_referenceNumber,
            enr_referenceNumber: row.enr_referenceNumber,
            skillCode: row.skillCode,
            trainingPartner_name: row.trainingPartner_name,
            trainingPartner_code: row.trainingPartner_code,
            trainingPartner_uen: row.trainingPartner_uen,
            conferring_institute_name: row.conferring_institute_name,
            conferring_institute_code: row.conferring_institute_code,
            conferring_institute_uen: row.conferring_institute_uen,

            course_title: row.course_title,
            course_reference_number: row.course_reference_number,
            course_run_id:row.course_run_id,
            course_run_start_date: row.course_run_start_date,
            course_run_end_date: row.course_run_end_date,


            score:row.score,
            trainee_id: row.trainee_id,
            trainee_id_type: row.trainee_id_type,
            trainee_full_name: row.trainee_full_name,
            result:row.result,
            grade: row.grade,
            assessment_date:row.assessment_date,

        }));
        creating_assessments(all_data);  // Call the function to create assessments
    });

    dialog.show();  // Display the dialog to the user
}

// Function to create assessments based on selected or all data
function creating_assessments(selected_data) {
    frappe.call({
        method: "assessment_sync.assessment_sync.doctype.assessment.assessment.create_assessments",
        args: { "request_data": selected_data },
        freeze: true,
        freeze_message: "Creating Assessments...",
        callback: function (r) {
            frappe.msgprint({
                message: "Assessments created successfully",
                primary_action: {
                  label: __('OK'),
                  action: function () {
                    window.location.href = '/app/assessment';  // Redirect to the assessment list after success
                  }
                }
              });
        }
    });
    dialog.hide();  // Hide the dialog after the action is complete
}
