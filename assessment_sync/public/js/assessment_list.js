frappe.listview_settings["Assessment"] = {
    onload: function (listview) {
      listview.page.add_inner_button(__("Search and Sync"), function () {
        //calling dialog function
        assessment_sync_dialog();
      });
    },
  };
  
  function assessment_sync_dialog() {

    const table_fields = [
        {
          fieldname: "File",
          fieldtype: "Attach",
          in_list_view: 1,
          label: "Files",
        },
    ];

    let dialog = new frappe.ui.Dialog({
        title: 'API Request',
        fields: [
            {
                fieldname: 'pagination_section', fieldtype: 'Section Break', label: 'Pagination'
            },
            { fieldname: 'page', fieldtype: 'Int', label: 'Page', default: 1, reqd: 1 },
            {
                fieldname: 'pagination_column', fieldtype: 'Column Break'
            },
            { fieldname: 'pageSize', fieldtype: 'Int', label: 'Page Size', default: 20, reqd: 1 },
            
            
            {
                fieldname: 'metadata_section', fieldtype: 'Section Break', label: 'Metadata (Optional)', collapsible: 1, collapsed: 1
            },
            { fieldname: 'lastUpdateDateFrom', fieldtype: 'Date', label: 'Last Update Date From', default: frappe.datetime.get_today() },
            {
                fieldname: 'col_break_4', fieldtype: 'Column Break'
            },
            { fieldname: 'lastUpdateDateTo', fieldtype: 'Date', label: 'Last Update Date To', default: frappe.datetime.get_today() },
            
            {
                fieldname: 'sort_section', fieldtype: 'Section Break', label: 'Sorting (Optional)', collapsible: 1, collapsed: 1
            },
            { fieldname: 'sortField', fieldtype: 'Data', label: 'Sort Field', default: 'updatedOn' },
            {
                fieldname: 'col_break_3', fieldtype: 'Column Break'
            },
            { fieldname: 'sortOrder', fieldtype: 'Select', label: 'Sort Order', options: ['asc', 'desc'], default: 'asc' },
            
            {
                fieldname: 'assessment_section', fieldtype: 'Section Break', label: 'Assessment Details (Optional)', collapsible: 1, collapsed: 1
            },
            { fieldname: 'courseRunId', fieldtype: 'Data', label: 'Course Run ID' },
            { fieldname: 'courseReferenceNumber', fieldtype: 'Data', label: 'Course Reference Number' },
            {
                fieldname: 'col_break_1', fieldtype: 'Column Break'
            },
            { fieldname: 'traineeId', fieldtype: 'Data', label: 'Trainee ID' },
            { fieldname: 'enrolmentReferenceNumber', fieldtype: 'Data', label: 'Enrolment Reference Number' },
            {
                fieldname: 'col_break_2', fieldtype: 'Column Break'
            },
            { fieldname: 'skillCode', fieldtype: 'Data', label: 'Skill Code' },
            { fieldname: 'trainingPartnerCode', fieldtype: 'Data', label: 'Training Partner Code' },
            {
                fieldname: 'assessment_section_mand', fieldtype: 'Section Break', label: 'Assessment Details (Mandatory)'
            },
            { fieldname: 'trainingPartnerUEN', fieldtype: 'Data', label: 'Training Partner UEN', reqd: 1 },
        ],
        primary_action_label: 'Submit',
        primary_action(values) {
            let requestData = {
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
            frappe.call({
                method:"assessment_sync.assessment_sync.doctype.assessment.assessment.get_assessments",
                args:{"request_data":requestData},
                freeze:true,
                freeze_message:"Fetching Data...",
                callback:function(r){
                    console.log(r)
                }
            })
        }
    }).show();
    
    
}

